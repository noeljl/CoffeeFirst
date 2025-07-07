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
      data.id = uuidv4()
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

  async updateMemberByID(id, updateData) {
    try {
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
      const member = await Member.findOneAndUpdate({ id }, updateData, {
        new: true,
        runValidators: true,
      })

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

  async findOneById(uuid) {
    try {
      const member = await Member.findOne({ id: uuid })
        .populate('membership')
        .populate('memberCard')
        .populate('wishlistCoffeeShops')
        .populate('favoriteCoffeeShops')
        .populate('visitedCoffeeShops')
        .populate('reviewedCoffeeShops')
        .exec()
      if (!member) throw new Error(`Member with id ${uuid} not found.`)
      return member
    } catch (err) {
      throw new Error(`Error finding member by UUID: ${err.message}`)
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
        { $addToSet: { [listType]: coffeeShopId } },
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
