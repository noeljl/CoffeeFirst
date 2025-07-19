import mongoose from 'mongoose'

const VisitSchema = new mongoose.Schema(
  {
    member: {
      type: String, // UUID of the member
      required: true,
      index: true,
    },
    coffeeShop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CoffeeShop',
      required: true,
      index: true,
    },
    visitDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    // Optional: Track which coffee was ordered
    coffeeType: {
      type: String,
      trim: true,
    },
    // Optional: Track if it was a free coffee (from membership quota)
    wasFreeCoffee: {
      type: Boolean,
      default: false,
    },
    // Optional: Track the membership quota before and after visit
    quotaBefore: {
      type: Number,
      min: 0,
    },
    quotaAfter: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
)

// Compound index to ensure we can efficiently query visits by member and coffee shop
VisitSchema.index({ member: 1, coffeeShop: 1, visitDate: -1 })

// Index for querying visits by date range
VisitSchema.index({ visitDate: -1 })

// Index for querying visits by coffee shop
VisitSchema.index({ coffeeShop: 1, visitDate: -1 })

const Visit = mongoose.model('Visit', VisitSchema)

class VisitModel {
  async createVisit(visitData) {
    try {
      const visit = await Visit.create(visitData)
      return visit
    } catch (err) {
      throw new Error(`Error creating visit: ${err.message}`)
    }
  }

  async getVisitsByMember(memberId, limit = 50) {
    try {
      const visits = await Visit.find({ member: memberId })
        .populate('coffeeShop')
        .sort({ visitDate: -1 })
        .limit(limit)
        .exec()
      return visits
    } catch (err) {
      throw new Error(`Error getting visits by member: ${err.message}`)
    }
  }

  async getVisitsByCoffeeShop(coffeeShopId, limit = 50) {
    try {
      const visits = await Visit.find({ coffeeShop: coffeeShopId })
        .sort({ visitDate: -1 })
        .limit(limit)
        .exec()
      return visits
    } catch (err) {
      throw new Error(`Error getting visits by coffee shop: ${err.message}`)
    }
  }

  async getLastVisitByMemberAndCoffeeShop(memberId, coffeeShopId) {
    try {
      const visit = await Visit.findOne({
        member: memberId,
        coffeeShop: coffeeShopId,
      })
        .sort({ visitDate: -1 })
        .exec()
      return visit
    } catch (err) {
      throw new Error(`Error getting last visit: ${err.message}`)
    }
  }

  async getVisitStatsByMember(memberId) {
    try {
      const stats = await Visit.aggregate([
        { $match: { member: memberId } },
        {
          $group: {
            _id: '$coffeeShop',
            visitCount: { $sum: 1 },
            lastVisit: { $max: '$visitDate' },
            firstVisit: { $min: '$visitDate' },
          },
        },
        {
          $lookup: {
            from: 'coffeeshops',
            localField: '_id',
            foreignField: '_id',
            as: 'coffeeShop',
          },
        },
        { $unwind: '$coffeeShop' },
        { $sort: { lastVisit: -1 } },
      ])
      return stats
    } catch (err) {
      throw new Error(`Error getting visit stats: ${err.message}`)
    }
  }

  async getRecentVisitsByMember(memberId, days = 30) {
    try {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - days)

      const visits = await Visit.find({
        member: memberId,
        visitDate: { $gte: cutoffDate },
      })
        .populate('coffeeShop')
        .sort({ visitDate: -1 })
        .exec()
      return visits
    } catch (err) {
      throw new Error(`Error getting recent visits: ${err.message}`)
    }
  }
}

export default new VisitModel()
