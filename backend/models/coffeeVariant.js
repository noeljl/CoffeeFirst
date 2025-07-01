import mongoose from 'mongoose'
// Import CoffeeType enum from the membershipType file, or a centralized enums file if available.
import { CoffeeType } from './enums.js'
// Import Ingredient model for population reference.
// No need to import CoffeeShopModel directly for the schema reference, but it will be needed for the model class definition.

const CoffeeVariantSchema = new mongoose.Schema(
  {
    // NEW: Reference to the CoffeeShop that offers this variant, as per UML (1..* from CoffeeShop to CoffeeVariant).
    coffeeShop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CoffeeShop',
      required: true,
      index: true, // Index for faster lookups
    },
    // The type of coffee this variant represents (e.g., FlatWhite, Latte Macchiato)
    coffeeType: {
      type: String,
      enum: Object.values(CoffeeType), // Restrict to defined CoffeeType enum
      required: true,
      trim: true,
    },
    // NEW: Changed 'local' type from String to Number, as per UML's 'local: Number'.
    // Local identifier for this variant (e.g., "Regular", "Large" might map to 1, 2, etc., or specific sizing)
    local: {
      type: Number, // Changed from String to Number
      required: true,
      min: [0, 'Local identifier cannot be negative.'], // Assuming non-negative identifiers
      // Optional: Add max validation if there's an upper bound for local types
    },
    // Quantity or specific requirement related to a MembershipType.
    // The UML states "numberRequired: MembershipType", which is ambiguous.
    // Interpreted as a numerical value required for/by a certain MembershipType (e.g., number of beans).
    numberRequired: {
      type: Number,
      required: true,
      min: [0, 'Number required cannot be negative.'],
      // Validation to ensure it makes sense in context of MembershipType.
      // E.g., if it's the number of free coffees for a specific membership level,
      // it might relate to the coffeeQuotaLeft in Membership.
    },
    // The ingredients that make up this coffee variant
    contents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true, // Each ingredient reference must be present
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
)

// Compound unique index to ensure a specific coffee variant (based on coffeeShop, type, and local identifier)
// can only exist once. This prevents duplicate entries like "FlatWhite - Small" for the same coffee shop.
CoffeeVariantSchema.index(
  { coffeeShop: 1, coffeeType: 1, local: 1 },
  { unique: true }
)

// NEW: Custom validation for 'contents' array to enforce UML's '2..*' cardinality.
CoffeeVariantSchema.path('contents').validate(function (value) {
  return value && value.length >= 2
}, 'A coffee variant must contain at least 2 ingredients as per the UML.')

const CoffeeVariant = mongoose.model('CoffeeVariant', CoffeeVariantSchema)

class CoffeeVariantModel {
  /**
   * Creates a new coffee variant.
   * @param {Object} data - The data for the new coffee variant.
   * @returns {Promise<Document>} The created coffee variant document.
   * @throws {Error} If there's a database error, validation error, or a duplicate variant exists.
   */
  async create(data) {
    try {
      const coffeeVariant = new CoffeeVariant(data)
      return await coffeeVariant.save()
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'A coffee variant with this combination of coffee shop, type, and local identifier already exists.'
        )
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error creating coffee variant: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error creating coffee variant: ${err.message}`)
    }
  }

  /**
   * Finds a coffee variant by its ID.
   * Populates the 'contents' (ingredients) and 'coffeeShop' fields.
   * @param {string} id - The ID of the coffee variant to find.
   * @returns {Promise<Document|null>} The coffee variant document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async findById(id) {
    try {
      const coffeeVariant = await CoffeeVariant.findById(id)
        .populate('contents') // Populate ingredients
        .populate('coffeeShop', 'name address') // Populate relevant coffee shop details
        .exec()
      return coffeeVariant // Returns null if not found
    } catch (err) {
      throw new Error(`Error finding coffee variant by ID: ${err.message}`)
    }
  }

  /**
   * Finds coffee variants by their coffee type.
   * Populates the 'contents' (ingredients) and 'coffeeShop' fields.
   * @param {string} coffeeType - The type of coffee (e.g., 'FlatWhite').
   * @returns {Promise<Array<Document>>} An array of coffee variant documents.
   * @throws {Error} If there's a database error.
   */
  async findByCoffeeType(coffeeType) {
    try {
      return await CoffeeVariant.find({ coffeeType })
        .populate('contents')
        .populate('coffeeShop', 'name address')
        .exec()
    } catch (err) {
      throw new Error(`Error finding coffee variants by type: ${err.message}`)
    }
  }

  /**
   * Finds coffee variants offered by a specific coffee shop.
   * Populates the 'contents' (ingredients) field.
   * @param {string} coffeeShopId - The ID of the coffee shop.
   * @returns {Promise<Array<Document>>} An array of coffee variant documents.
   * @throws {Error} If there's a database error.
   */
  async findByCoffeeShopId(coffeeShopId) {
    try {
      return await CoffeeVariant.find({ coffeeShop: coffeeShopId })
        .populate('contents')
        .exec()
    } catch (err) {
      throw new Error(
        `Error finding coffee variants by coffee shop ID: ${err.message}`
      )
    }
  }

  /**
   * Updates an existing coffee variant.
   * @param {string} id - The ID of the coffee variant to update.
   * @param {Object} updateData - The data to update.
   * @returns {Promise<Document|null>} The updated coffee variant document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async update(id, updateData) {
    try {
      const coffeeVariant = await CoffeeVariant.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true, // Return the updated document
          runValidators: true, // Run schema validators on update
        }
      ).exec()
      if (!coffeeVariant) {
        throw new Error(`Coffee variant with ID ${id} not found.`)
      }
      return coffeeVariant
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'Update failed: A coffee variant with this combination of coffee shop, type, and local identifier already exists.'
        )
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error updating coffee variant: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error updating coffee variant: ${err.message}`)
    }
  }

  /**
   * Deletes a coffee variant by its ID.
   * @param {string} id - The ID of the coffee variant to delete.
   * @returns {Promise<Document|null>} The deleted coffee variant document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async delete(id) {
    try {
      const coffeeVariant = await CoffeeVariant.findByIdAndDelete(id).exec()
      if (!coffeeVariant) {
        throw new Error(`Coffee variant with ID ${id} not found for deletion.`)
      }
      return coffeeVariant
    } catch (err) {
      throw new Error(`Error deleting coffee variant: ${err.message}`)
    }
  }
}

export default new CoffeeVariantModel()
