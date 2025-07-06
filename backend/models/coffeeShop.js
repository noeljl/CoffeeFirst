import mongoose from 'mongoose'
// Import enums from their respective files or a centralized 'enums.js' if created.
import { CoffeeType, Offer, SustainabilityFeature } from './enums.js'

// --- Schema for CoffeeShop ---

const CoffeeShopSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true, // Slugs are unique for each coffee shop
      trim: true,
      minlength: [3, 'Slug must be at least 3 characters long.'],
      maxlength: [100, 'Slug cannot exceed 100 characters.'],
    },
    name: {
      type: String,
      required: true,
      unique: true, // Coffee shop names are unique
      trim: true,
      minlength: [3, 'Coffee shop name must be at least 3 characters long.'],
      maxlength: [100, 'Coffee shop name cannot exceed 100 characters.'],
    },
    brand: {
      type: String,
      trim: true,
      maxlength: [100, 'Brand name cannot exceed 100 characters.'],
    },
    district: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'District name cannot exceed 100 characters.'],
    },
    address: {
      streetNo: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Street and number must be at least 3 characters long.'],
        maxlength: [100, 'Street and number cannot exceed 100 characters.'],
      },
      PLZ: {
        type: String,
        required: true,
        trim: true,
        minlength: [4, 'PLZ must be at least 4 characters long.'],
        maxlength: [10, 'PLZ cannot exceed 10 characters.'],
      },
      Place: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Place must be at least 2 characters long.'],
        maxlength: [100, 'Place cannot exceed 100 characters.'],
      },
    },
    coords: {
      lat: { type: Number },
      lng: { type: Number },
    },
    images: {
      type: [String],
      default: [],
    },
    aboutCafe: {
      type: String,
      maxlength: [1000, 'About cafe cannot exceed 1000 characters.'],
    },
    aboutCoffee: {
      type: String,
      maxlength: [1000, 'About coffee cannot exceed 1000 characters.'],
    },
    // Amenities offered by the coffee shop (e.g., FreeWater, PetFriendly)
    amenities: {
      type: [String], // Array of strings, matching the 'Offer' enum values
      enum: Object.values(Offer), // Restrict values to the Offer enum
      default: [],
    },
    // Sustainability features (e.g., SmallBatchRoasting)
    sustainabilityFeatures: {
      type: [String], // Array of strings, matching the 'SustainabilityFeature' enum values
      enum: Object.values(SustainabilityFeature), // Restrict values to the SustainabilityFeature enum
      default: [],
    },
    // Types of coffee served (e.g., FlatWhite, Latte Macchiato)
    coffeeTypes: {
      type: [String], // Array of strings, matching CoffeeType enum values
      enum: Object.values(CoffeeType),
      default: [],
      // Optional: Add validation to ensure at least one coffee type is listed if required.
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
)

const CoffeeShop = mongoose.model('CoffeeShop', CoffeeShopSchema)

class CoffeeShopModel {
  /**
   * Creates a new coffee shop.
   * @param {Object} data - The data for the new coffee shop.
   * @returns {Promise<Document>} The created coffee shop document.
   * @throws {Error} If there's a database error, validation error, or a coffee shop with the name already exists.
   */
  async create(data) {
    try {
      const coffeeShop = new CoffeeShop(data)
      return await coffeeShop.save()
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'A coffee shop with this name already exists. Coffee shop names must be unique.'
        )
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error creating coffee shop: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error creating coffee shop: ${err.message}`)
    }
  }

  /**
   * Finds a coffee shop by its ID.
   * @param {string} id - The ID of the coffee shop to find.
   * @returns {Promise<Document|null>} The coffee shop document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async findById(id) {
    try {
      // Populate offeredCoffeeVariants for convenience, though it might be a large array.
      // Consider a separate method if only variants are needed.
      const coffeeShop = await CoffeeShop.findById(id)
        .populate('offeredCoffeeVariants')
        .exec()
      return coffeeShop // Returns null if not found
    } catch (err) {
      throw new Error(`Error finding coffee shop by ID: ${err.message}`)
    }
  }

  /**
   * Finds a coffee shop by its name.
   * @param {string} name - The name of the coffee shop to find.
   * @returns {Promise<Document|null>} The coffee shop document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async findByName(name) {
    try {
      const coffeeShop = await CoffeeShop.findOne({ name }).exec()
      return coffeeShop
    } catch (err) {
      throw new Error(`Error finding coffee shop by name: ${err.message}`)
    }
  }

  /**
   * Finds a coffee shop by its slug.
   * @param {string} slug - The slug of the coffee shop to find.
   * @returns {Promise<Document|null>} The coffee shop document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async findBySlug(slug) {
    try {
      const coffeeShop = await CoffeeShop.findOne({ slug }).exec()
      return coffeeShop
    } catch (err) {
      throw new Error(`Error finding coffee shop by slug: ${err.message}`)
    }
  }

  /**
   * Finds all coffee shops.
   * @returns {Promise<Array<Document>>} An array of coffee shop documents.
   * @throws {Error} If there's a database error.
   */
  async findAll() {
    try {
      return await CoffeeShop.find().exec()
    } catch (err) {
      throw new Error(`Error finding all coffee shops: ${err.message}`)
    }
  }

  /**
   * Updates an existing coffee shop.
   * @param {string} id - The ID of the coffee shop to update.
   * @param {Object} updateData - The data to update.
   * @returns {Promise<Document|null>} The updated coffee shop document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async update(id, updateData) {
    try {
      const coffeeShop = await CoffeeShop.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
      }).exec()
      if (!coffeeShop) {
        throw new Error(`Coffee shop with ID ${id} not found.`)
      }
      return coffeeShop
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'Update failed: A coffee shop with this name already exists.'
        )
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error updating coffee shop: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error updating coffee shop: ${err.message}`)
    }
  }

  /**
   * Deletes a coffee shop by its ID.
   * @param {string} id - The ID of the coffee shop to delete.
   * @returns {Promise<Document|null>} The deleted coffee shop document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async delete(id) {
    try {
      const coffeeShop = await CoffeeShop.findByIdAndDelete(id).exec()
      if (!coffeeShop) {
        throw new Error(`Coffee shop with ID ${id} not found for deletion.`)
      }
      return coffeeShop
    } catch (err) {
      throw new Error(`Error deleting coffee shop: ${err.message}`)
    }
  }

  /**
   * Recalculates and updates the average rating and number of reviews for a coffee shop.
   * This method should be called after a review is created, updated, or deleted for this coffee shop.
   * @param {string} coffeeShopId - The ID of the coffee shop to update.
   * @returns {Promise<Document|null>} The updated coffee shop document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async updateRating(coffeeShopId) {
    try {
      // Dynamically import ReviewModel to avoid circular dependencies
      const ReviewModel = (await import('./review.js')).default
      const reviews = await ReviewModel.findByCoffeeShopId(coffeeShopId)

      let totalRating = 0
      reviews.forEach((review) => {
        totalRating += review.rating
      })

      const numberOfReviews = reviews.length
      const averageRating =
        numberOfReviews > 0 ? totalRating / numberOfReviews : 0

      const updatedShop = await CoffeeShop.findByIdAndUpdate(
        coffeeShopId,
        {
          $set: {
            averageRating: averageRating,
            numberOfReviews: numberOfReviews,
          },
        },
        { new: true, runValidators: true } // Return updated doc, run validators
      ).exec()

      if (!updatedShop) {
        throw new Error(
          `Coffee shop with ID ${coffeeShopId} not found during rating update.`
        )
      }
      return updatedShop
    } catch (err) {
      throw new Error(`Error updating coffee shop rating: ${err.message}`)
    }
  }

  /**
   * Adds a coffee variant to the list of offered variants for this coffee shop.
   * @param {string} coffeeShopId - The ID of the coffee shop.
   * @param {string} coffeeVariantId - The ID of the coffee variant to add.
   * @returns {Promise<Document|null>} The updated coffee shop document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async addOfferedCoffeeVariant(coffeeShopId, coffeeVariantId) {
    try {
      const coffeeShop = await CoffeeShop.findByIdAndUpdate(
        coffeeShopId,
        { $addToSet: { offeredCoffeeVariants: coffeeVariantId } }, // $addToSet prevents duplicates
        { new: true }
      ).exec()
      if (!coffeeShop) {
        throw new Error(`Coffee shop with ID ${coffeeShopId} not found.`)
      }
      return coffeeShop
    } catch (err) {
      throw new Error(
        `Error adding coffee variant to coffee shop: ${err.message}`
      )
    }
  }

  /**
   * Removes a coffee variant from the list of offered variants for this coffee shop.
   * @param {string} coffeeShopId - The ID of the coffee shop.
   * @param {string} coffeeVariantId - The ID of the coffee variant to remove.
   * @returns {Promise<Document|null>} The updated coffee shop document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async removeOfferedCoffeeVariant(coffeeShopId, coffeeVariantId) {
    try {
      const coffeeShop = await CoffeeShop.findByIdAndUpdate(
        coffeeShopId,
        { $pull: { offeredCoffeeVariants: coffeeVariantId } }, // $pull removes all instances
        { new: true }
      ).exec()
      if (!coffeeShop) {
        throw new Error(`Coffee shop with ID ${coffeeShopId} not found.`)
      }
      return coffeeShop
    } catch (err) {
      throw new Error(
        `Error removing coffee variant from coffee shop: ${err.message}`
      )
    }
  }

  /**
   * Finds coffee shops by district.
   * @param {Object} filter - The filter object (e.g., { district: 'someDistrict' }).
   * @returns {Promise<Array<Document>>} An array of coffee shop documents.
   * @throws {Error} If there's a database error.
   */
  async find(filter) {
    try {
      return await CoffeeShop.find(filter).exec()
    } catch (err) {
      throw new Error(`Error finding coffee shops: ${err.message}`)
    }
  }

  /**
   * Gets distinct values for a field.
   * @param {string} field - The field name to get distinct values for.
   * @returns {Promise<Array>} An array of distinct values.
   * @throws {Error} If there's a database error.
   */
  async distinct(field) {
    try {
      return await CoffeeShop.distinct(field).exec()
    } catch (err) {
      throw new Error(`Error getting distinct values for ${field}: ${err.message}`)
    }
  }

  /**
   * Finds all coffee shops grouped by district using aggregation.
   * @returns {Promise<Array>} An array of district groups with coffee shops.
   * @throws {Error} If there's a database error.
   */
  async findAllGroupedByDistrict() {
    try {
      return await CoffeeShop.aggregate([
        {
          $group: {
            _id: '$district',
            coffeeShops: { $push: '$$ROOT' },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]).exec()
    } catch (err) {
      throw new Error(`Error grouping coffee shops by district: ${err.message}`)
    }
  }
}

export default new CoffeeShopModel()
export { CoffeeShop }
