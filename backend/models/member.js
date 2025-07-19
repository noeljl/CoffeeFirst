import mongoose from 'mongoose'
import { PaymentStatus } from './enums.js'
import { v4 as uuidv4 } from 'uuid'
const MemberSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    isShopOwner: { type: Boolean, default: false },
    passwordHash: { type: String, required: true },
    profilePicture: {
      type: String,
      default: '/example_picture.png',
      trim: true,
    },
    subscribe: { type: Boolean, default: false },
    stripeCustomerId: { type: String, unique: true, sparse: true, trim: true },
    stripeSubscriptionId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    subscriptionPeriodEnd: { type: Date },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
      required: true,
    },
    membership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Membership',
      required: true,
    },
    memberCard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MemberCard',
      required: true,
    },
    wishlistCoffeeShops: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'CoffeeShop' },
    ],
    favoriteCoffeeShops: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'CoffeeShop' },
    ],
    visitedCoffeeShops: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'CoffeeShop' },
    ],
    reviewedCoffeeShops: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'CoffeeShop' },
    ],
    google: { id: String },
    facebook: { id: String },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

// Virtual for full name
MemberSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})

// Create the Mongoose model
const Member = mongoose.model('Member', MemberSchema)

// MembersModel class wrapping Mongoose operations
export class MembersModel {
  async create(data) {
    try {
      data.id = uuidv4()
      const member = new Member(data)
      return await member.save()
    } catch (err) {
      if (err.code === 11000) {
        console.error('Duplicate key:', err.keyPattern, err.keyValue)
        throw err // oder: throw createError(409, err.message);
      }
      if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((e) => e.message)
        throw new Error(
          `Validation error creating member: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error creating member: ${err.message}`)
    }
  }

  async updateMemberByID(id, updateData) {
    try {
      if (Object.keys(updateData).length === 0) {
        console.log('updateData is an empty object, no fields to update.')
        // You might want to throw an error, return null, or return the existing member
        // depending on your application's logic.
        // For now, let's just return the existing member if nothing needs updating.
        const existingMember = await Member.findOne({ id })
        if (!existingMember) throw new Error(`Member with ID ${id} not found.`)
        return existingMember
      }
      const member = await Member.findOneAndUpdate({ id }, updateData, {
        new: true,
        runValidators: true,
      })
      if (!member) throw new Error(`Member with ID ${id} not found.`)
      return member
    } catch (err) {
      throw new Error(`Error updating member: ${err.message}`)
    }
  }

  // --- Corrected updateByMail method ---
  async updateByMail(mail, updateData) {
    try {
      // Use findOneAndUpdate to find by email and update
      const member = await Member.findOneAndUpdate(
        { email: mail },
        updateData,
        { new: true, runValidators: true }
      )

      if (!member) throw new Error(`Member with email ${mail} not found.`) // Changed ID to email for clarity
      return member
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'Duplicate value exists for a unique field (e.g., email, Stripe ID).'
        )
      }
      if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((e) => e.message)
        throw new Error(
          `Validation error updating member: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error updating member: ${err.message}`)
    }
  }
  // --- End of corrected updateByMail method ---

  async delete(id) {
    try {
      const member = await Member.findOneAndDelete({ id })
      if (!member) throw new Error(`Member with ID ${id} not found.`)
      return member
    } catch (err) {
      throw new Error(`Error deleting member: ${err.message}`)
    }
  }

  async findOneByEmail(email) {
    try {
      return await Member.findOne({ email }).exec()
    } catch (err) {
      throw new Error(`Error finding member by email: ${err.message}`)
    }
  }

  async findOneById(id) {
    try {
      const member = await Member.findOne({ id })
        .populate('memberCard')
        .populate('membership')
        .exec()

      if (!member) throw new Error(`Member with id ${id} not found.`)
      return member
    } catch (err) {
      throw new Error(`Error finding member by id: ${err.message}`)
    }
  }

  async findOneByIdWithPopulatedLists(id) {
    try {
      const member = await Member.findOne({ id })
        .populate('wishlistCoffeeShops')
        .populate('favoriteCoffeeShops')
        .populate('visitedCoffeeShops')
        .populate('reviewedCoffeeShops')
        .exec()
      if (!member) throw new Error(`Member with id ${id} not found.`)
      return member
    } catch (err) {
      throw new Error(
        `Error finding member by id with populated lists: ${err.message}`
      )
    }
  }

  // async findOneByGoogleId(id) {
  //   try {
  //     return await Member.findOne({ 'google.id': id }).exec()
  //   } catch (err) {
  //     throw new Error(`Error finding member by Google ID: ${err.message}`)
  //   }
  // }

  // async findOneByFacebookId(id) {
  //   try {
  //     return await Member.findOne({ 'facebook.id': id }).exec()
  //   } catch (err) {
  //     throw new Error(`Error finding member by Facebook ID: ${err.message}`)
  //   }
  // }

  async addCoffeeShopToList(memberId, coffeeShopId, listType) {
    const validLists = [
      'wishlistCoffeeShops',
      'favoriteCoffeeShops',
      'visitedCoffeeShops',
      'reviewedCoffeeShops',
    ]
    if (!validLists.includes(listType)) {
      throw new Error(
        `Invalid list type: ${listType}. Must be one of ${validLists.join(
          ', '
        )}.`
      )
    }
    try {
      const member = await Member.findOneAndUpdate(
        { id: memberId },
        { $addToSet: { [listType]: coffeeShopId } },
        { new: true }
      ).exec()
      if (!member) throw new Error(`Member with ID ${memberId} not found.`)
      return member
    } catch (err) {
      throw new Error(`Error adding to ${listType}: ${err.message}`)
    }
  }

  async removeCoffeeShopFromList(memberId, coffeeShopId, listType) {
    const validLists = [
      'wishlistCoffeeShops',
      'favoriteCoffeeShops',
      'visitedCoffeeShops',
      'reviewedCoffeeShops',
    ]
    if (!validLists.includes(listType)) {
      throw new Error(
        `Invalid list type: ${listType}. Must be one of ${validLists.join(
          ', '
        )}.`
      )
    }
    try {
      const member = await Member.findOneAndUpdate(
        { id: memberId },
        { $pull: { [listType]: coffeeShopId } }, // $pull statt $addToSet
        { new: true }
      ).exec()
      if (!member) throw new Error(`Member with ID ${memberId} not found.`)
      return member
    } catch (err) {
      throw new Error(`Error removing from ${listType}: ${err.message}`)
    }
  }
}

// Export the class to allow instantiation
export default MembersModel

export { Member };
