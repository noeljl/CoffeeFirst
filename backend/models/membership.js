import mongoose from 'mongoose'

// --- Schema for the main Membership ---

const MembershipSchema = new mongoose.Schema(
  {
    // Relation to the user who owns this membership
    member: {
      type: String, // Changed from ObjectId to String for UUID
      required: true,
      unique: true, // Ensures a 1-to-1 relationship with Member
    },
    // The type of membership chosen
    chosenMembership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MembershipType',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v <= Date.now()
        },
        message: (props) =>
          `${props.value} cannot be in the future for startDate!`,
      },
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return this.startDate ? v >= this.startDate : true
        },
        message: 'End date must be on or after the start date.',
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return v ? v >= this.endDate : true
        },
        message: 'Renewal date must be on or after the end date.',
      },
    },
    payDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    renewalAfterExpiration: {
      type: Boolean,
      default: true,
    },
    coffeeQuotaLeft: {
      type: Number,
      required: true,
      min: [0, 'Coffee quota cannot be negative.'],
      default: 0,
    },
  },
  { timestamps: true }
)

MembershipSchema.index({ member: 1 }, { unique: true })

const Membership = mongoose.model('Membership', MembershipSchema)

class MembershipModel {
  // Alte Signatur: async create(data) { … }
  // Neue Signatur:
  async create(data, session = null) {
    try {
      console.log('data membership model', data)
      const membership = new Membership(data)
      // session weiterreichen – oder {} wenn keine übergeben
      await membership.save(session ? { session } : undefined)
      return membership.populate('chosenMembership')
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'This member already has an active membership. Each member can only have one unique membership.'
        )
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error creating membership: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error creating membership: ${err.message}`)
    }
  }

  async findById(id) {
    try {
      const membership = await Membership.findById(id)
        .populate('chosenMembership')
        .populate('member', 'firstName lastName email') // Populate relevant member fields
        .exec()
      return membership
    } catch (err) {
      throw new Error(`Error finding membership by ID: ${err.message}`)
    }
  }

  async findByMemberId(memberId) {
    try {
      const membership = await Membership.findOne({ member: memberId })
        .populate('chosenMembership')
        .exec()
      return membership
    } catch (err) {
      throw new Error(`Error finding membership by member ID: ${err.message}`)
    }
  }

  async update(id, updateData) {
    try {
      const membership = await Membership.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
      })
        .populate('chosenMembership')
        .exec()
      if (!membership) {
        throw new Error(`Membership with ID ${id} not found.`)
      }
      return membership
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'Update failed: A duplicate value exists for a unique field (e.g., member ID).'
        )
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error updating membership: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error updating membership: ${err.message}`)
    }
  }

  async delete(id) {
    try {
      const membership = await Membership.findByIdAndDelete(id).exec()
      if (!membership) {
        throw new Error(`Membership with ID ${id} not found for deletion.`)
      }
      return membership
    } catch (err) {
      throw new Error(`Error deleting membership: ${err.message}`)
    }
  }

  async decrementCoffeeQuota(membershipId, amount = 1) {
    try {
      if (amount <= 0) {
        throw new Error('Decrement amount must be positive.')
      }
      const membership = await Membership.findById(membershipId).exec()
      if (!membership) {
        throw new Error(`Membership with ID ${membershipId} not found.`)
      }
      if (membership.coffeeQuotaLeft < amount) {
        throw new Error(
          `Not enough coffee quota left. Current: ${membership.coffeeQuotaLeft}, Requested decrement: ${amount}.`
        )
      }

      membership.coffeeQuotaLeft -= amount
      await membership.save({ validateBeforeSave: true }) // Ensure validation runs
      return membership
    } catch (err) {
      throw new Error(`Error decrementing coffee quota: ${err.message}`)
    }
  }

  async incrementCoffeeQuota(membershipId, amount = 1) {
    try {
      if (amount <= 0) {
        throw new Error('Increment amount must be positive.')
      }
      const membership = await Membership.findByIdAndUpdate(
        membershipId,
        { $inc: { coffeeQuotaLeft: amount } }, // Atomically increment
        { new: true, runValidators: true }
      ).exec()
      if (!membership) {
        throw new Error(`Membership with ID ${membershipId} not found.`)
      }
      return membership
    } catch (err) {
      throw new Error(`Error incrementing coffee quota: ${err.message}`)
    }
  }
}

export default new MembershipModel()
