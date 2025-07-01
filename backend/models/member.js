import mongoose from 'mongoose'
import { PaymentStatus } from './enums.js'

// Define Member schema
const MemberSchema = new mongoose.Schema(
  {
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
    passwordHash: { type: String, required: true },
    profilePicture: {
      type: String,
      default: 'https://example.com/default-profile.png',
      trim: true,
    },
    subscribe: { type: Boolean, default: false },
    stripeCustomerId: { type: String, unique: true, sparse: true, trim: true },
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
      unique: true,
    },
    memberCard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MemberCard',
      required: true,
      unique: true,
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
      const member = new Member(data)
      return await member.save()
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'A member with this email, Stripe ID, membership, or member card already exists.'
        )
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

  async update(id, updateData) {
    try {
      const member = await Member.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      }).exec()
      if (!member) throw new Error(`Member with ID ${id} not found.`)
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

  async delete(id) {
    try {
      const member = await Member.findByIdAndDelete(id).exec()
      if (!member)
        throw new Error(`Member with ID ${id} not found for deletion.`)
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
      return await Member.findById(id)
        .populate('membership')
        .populate('memberCard')
        .populate('wishlistCoffeeShops')
        .populate('favoriteCoffeeShops')
        .populate('visitedCoffeeShops')
        .populate('reviewedCoffeeShops')
        .exec()
    } catch (err) {
      throw new Error(`Error finding member by ID: ${err.message}`)
    }
  }

  async findOneByGoogleId(id) {
    try {
      return await Member.findOne({ 'google.id': id }).exec()
    } catch (err) {
      throw new Error(`Error finding member by Google ID: ${err.message}`)
    }
  }

  async findOneByFacebookId(id) {
    try {
      return await Member.findOne({ 'facebook.id': id }).exec()
    } catch (err) {
      throw new Error(`Error finding member by Facebook ID: ${err.message}`)
    }
  }

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
      const member = await Member.findByIdAndUpdate(
        memberId,
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
      const member = await Member.findByIdAndUpdate(
        memberId,
        { $pull: { [listType]: coffeeShopId } },
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
