import mongoose from 'mongoose'

export const MembershipTier = Object.freeze({
  SILVER: 'Silver',
  GOLD: 'Gold',
  BLACK: 'Black',
})

export const MembershipPrice = Object.freeze({
  LEVEL_1: 29,
  LEVEL_2: 59,
  LEVEL_3: 99,
})

export const CoffeeType = Object.freeze({
  FLAT_WHITE: 'FlatWhite',
  LATTE_MACCHIATO: 'Latte Macchiato',
  ESPRESSO: 'Espresso', // Example: Added another coffee type for demonstration
  AMERICANO: 'Americano',
})

const MembershipTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Added trim for cleaner data
      minlength: [
        3,
        'Membership type name must be at least 3 characters long.',
      ], // Added minlength
      maxlength: [50, 'Membership type name cannot exceed 50 characters.'], // Added maxlength
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
      min: [0, 'Membership price cannot be negative.'], // Ensure price is non-negative
    },
    coffeeTypes: {
      type: [String], // Array of strings
      enum: Object.values(CoffeeType), // Restrict values to the CoffeeType enum
      required: true, // A membership type must specify at least one coffee type
      default: [], // Default to an empty array
      validate: {
        validator: function (v) {
          return v && v.length > 0
        },
        message: 'A membership type must include at least one coffee type.',
      },
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
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

  async findByName(name) {
    try {
      const membershipType = await MembershipType.findOne({ name }).exec()
      return membershipType
    } catch (err) {
      throw new Error(`Error finding membership type by name: ${err.message}`)
    }
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
