import mongoose from 'mongoose'
import { CoffeeType, MembershipTier, MembershipPrice } from './enums.js'

const MembershipTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    membershipTier: {
      type: String,
      enum: Object.values(MembershipTier),
      required: true,
      trim: true,
    },
    membershipPrice: {
      type: Number,
      enum: Object.values(MembershipPrice),
      required: true,
      min: 0,
    },
    coffeeTypes: {
      type: [String],
      enum: Object.values(CoffeeType),
      required: true,
      default: [],
      validate: {
        validator: (v) => v && v.length > 0,
        message: 'A membership type must include at least one coffee type.',
      },
    },
    features: {
      type: [String],
      required: true,
      default: [],
      validate: {
        validator: (v) => v && v.length > 0,
        message: 'A membership type must include at least one feature.',
      },
    },
    durationDays: { type: Number, default: 30, min: 1 },
    coffeeQuota: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
)

const MembershipType = mongoose.model('MembershipType', MembershipTypeSchema)

class MembershipTypeModel {
  async create(data) {
    try {
      const membershipType = new MembershipType(data)
      return await membershipType.save()
    } catch (err) {
      if (err.code === 11000) {
        throw new Error('A membership type with this name already exists.')
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error creating membership type: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error creating membership type: ${err.message}`)
    }
  }

  async findAll() {
    try {
      return await MembershipType.find().exec()
    } catch (err) {
      throw new Error(`Error finding all membership types: ${err.message}`)
    }
  }

  async findById(id) {
    try {
      const membershipType = await MembershipType.findById(id).exec()
      return membershipType // Returns null if not found, which is standard
    } catch (err) {
      throw new Error(`Error finding membership type by ID: ${err.message}`)
    }
  }

  async findByName(name, session = null) {
    const q = MembershipType.findOne({ name })
    if (session) q.session(session)
    return q.exec()
  }

  async update(id, updateData) {
    try {
      const membershipType = await MembershipType.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true, // Return the updated document
          runValidators: true, // Run schema validators on update
        }
      ).exec()
      if (!membershipType) {
        throw new Error(`Membership type with ID ${id} not found.`)
      }
      return membershipType
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'Update failed: A membership type with this name already exists.'
        )
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error updating membership type: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error updating membership type: ${err.message}`)
    }
  }

  async delete(id) {
    try {
      const membershipType = await MembershipType.findByIdAndDelete(id).exec()
      if (!membershipType) {
        throw new Error(`Membership type with ID ${id} not found for deletion.`)
      }
      return membershipType
    } catch (err) {
      throw new Error(`Error deleting membership type: ${err.message}`)
    }
  }
}

export default new MembershipTypeModel()

export { MembershipType }
