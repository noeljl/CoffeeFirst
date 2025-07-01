import mongoose from 'mongoose'
import { Allergen } from './enums.js'


// --- Schema for Ingredient ---

const IngredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Assuming ingredient names are unique
      trim: true,
      minlength: [2, 'Ingredient name must be at least 2 characters long.'], // Added minlength
      maxlength: [100, 'Ingredient name cannot exceed 100 characters.'], // Added maxlength
    },
    // List of allergens present in this ingredient
    allergens: {
      type: [String], // Array of strings, matching the 'Allergen' enum values
      enum: Object.values(Allergen),
      default: [],
      // Optional: Add a custom validator if an ingredient must have at least one allergen listed,
      // or if it must not have certain combinations of allergens.
    },
    // Indicates if the ingredient is certified as fair trade
    fairTradeCertified: {
      type: Boolean,
      default: false,
    },
    // Carbon emission value for the ingredient (e.g., in grams of CO2e per unit)
    carbonEmission: {
      type: Number,
      min: [0, 'Carbon emission cannot be negative.'], // Ensure non-negative value
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
)

const Ingredient = mongoose.model('Ingredient', IngredientSchema)

class IngredientModel {
  /**
   * Creates a new ingredient.
   * @param {Object} data - The data for the new ingredient.
   * @returns {Promise<Document>} The created ingredient document.
   * @throws {Error} If there's a database error, validation error, or an ingredient with the name already exists.
   */
  async create(data) {
    try {
      const ingredient = new Ingredient(data)
      return await ingredient.save()
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'An ingredient with this name already exists. Ingredient names must be unique.'
        )
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error creating ingredient: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error creating ingredient: ${err.message}`)
    }
  }

  /**
   * Finds an ingredient by its ID.
   * @param {string} id - The ID of the ingredient to find.
   * @returns {Promise<Document|null>} The ingredient document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async findById(id) {
    try {
      const ingredient = await Ingredient.findById(id).exec()
      return ingredient // Returns null if not found
    } catch (err) {
      throw new Error(`Error finding ingredient by ID: ${err.message}`)
    }
  }

  /**
   * Finds an ingredient by its name.
   * @param {string} name - The name of the ingredient to find.
   * @returns {Promise<Document|null>} The ingredient document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async findByName(name) {
    try {
      const ingredient = await Ingredient.findOne({ name }).exec()
      return ingredient
    } catch (err) {
      throw new Error(`Error finding ingredient by name: ${err.message}`)
    }
  }

  /**
   * Finds all ingredients.
   * @returns {Promise<Array<Document>>} An array of ingredient documents.
   * @throws {Error} If there's a database error.
   */
  async findAll() {
    try {
      return await Ingredient.find().exec()
    } catch (err) {
      throw new Error(`Error finding all ingredients: ${err.message}`)
    }
  }

  /**
   * Updates an existing ingredient.
   * @param {string} id - The ID of the ingredient to update.
   * @param {Object} updateData - The data to update.
   * @returns {Promise<Document|null>} The updated ingredient document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async update(id, updateData) {
    try {
      const ingredient = await Ingredient.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
      }).exec()
      if (!ingredient) {
        throw new Error(`Ingredient with ID ${id} not found.`)
      }
      return ingredient
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'Update failed: An ingredient with this name already exists.'
        )
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error updating ingredient: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error updating ingredient: ${err.message}`)
    }
  }

  /**
   * Deletes an ingredient by its ID.
   * @param {string} id - The ID of the ingredient to delete.
   * @returns {Promise<Document|null>} The deleted ingredient document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async delete(id) {
    try {
      const ingredient = await Ingredient.findByIdAndDelete(id).exec()
      if (!ingredient) {
        throw new Error(`Ingredient with ID ${id} not found for deletion.`)
      }
      return ingredient
    } catch (err) {
      throw new Error(`Error deleting ingredient: ${err.message}`)
    }
  }
}

export const IngredientModelInstance = new IngredientModel()
