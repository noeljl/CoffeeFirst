import mongoose from 'mongoose'
import { ReviewTopic } from './enums.js'


// --- Enums ---

// NEW: ReviewTopic Enum as per UML diagram

const ReviewSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
      index: true, // Add index for faster lookups by member
    },
    coffeeShop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CoffeeShop',
      required: true,
      index: true, // Add index for faster lookups by coffee shop
    },
    rating: {
      type: Number,
      required: true,
      min: [1, 'Rating must be at least 1.'],
      max: [5, 'Rating cannot be more than 5.'],
    },
    comment: {
      type: String,
      trim: true,
      default: '',
      maxlength: [1000, 'Comment cannot exceed 1000 characters.'], // Added max length
    },
    // NEW: Subject uses ReviewTopic Enum as per UML
    subject: {
      type: String,
      enum: Object.values(ReviewTopic), // Restrict values to ReviewTopic enum
      trim: true,
      default: ReviewTopic.OVERALL, // Set a default subject if desired
      required: true, // Assuming a review subject is always required
    },
    // Additional review fields
    taste: { type: Number, min: 1, max: 5 },
    presentation: { type: Number, min: 1, max: 5 },
    temperature: { type: Boolean }, // true = Yes, false = No
    vibe: { type: String, enum: ['cozy', 'vibrant'] },
    aesthetics: { type: Boolean }, // true = Yes, false = No
    serviceFriendliness: { type: Number, min: 1, max: 5 },
    pricing: { type: String, enum: ['€', '€€', '€€€'] },
    ecoFriendly: { type: Boolean }, // true = Yes, false = No
    veganFriendly: { type: Boolean }, // true = Yes, false = No
    instagram: { type: Boolean }, // true = Yes, false = No
    greatForStudying: { type: Boolean }, // true = Yes, false = No
    dateSpot: { type: Boolean }, // true = Yes, false = No
    petFriendly: { type: Boolean }, // true = Yes, false = No
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically. 'createdAt' will serve as the 'date' from UML.
  }
)

// Compound unique index to ensure a member can review a coffee shop only once
ReviewSchema.index({ member: 1, coffeeShop: 1 }, { unique: true })

// Optional: Post-save hook to update CoffeeShop's averageRating and numberOfReviews
// This assumes CoffeeShopModel has an updateRating method that recalculates these values.
ReviewSchema.post('save', async function (doc, next) {
  try {
    // Dynamically import CoffeeShopModel to avoid circular dependencies
    const CoffeeShopModel = (await import('./coffeeShop.js')).default
    await CoffeeShopModel.updateRating(doc.coffeeShop) // Call a method to recalculate rating
    next()
  } catch (error) {
    console.error('Error updating coffee shop rating after review save:', error)
    next(error) // Pass the error to the next middleware
  }
})

// Optional: Post-delete hook to update CoffeeShop's averageRating and numberOfReviews
ReviewSchema.post(
  'deleteOne',
  { document: true, query: false },
  async function (doc, next) {
    try {
      const CoffeeShopModel = (await import('./coffeeShop.js')).default
      await CoffeeShopModel.updateRating(doc.coffeeShop) // Recalculate after deletion
      next()
    } catch (error) {
      console.error(
        'Error updating coffee shop rating after review delete:',
        error
      )
      next(error)
    }
  }
)

const Review = mongoose.model('Review', ReviewSchema)

class ReviewModel {
  /**
   * Creates a new review.
   * @param {Object} data - The data for the new review.
   * @returns {Promise<Document>} The created review document.
   * @throws {Error} If there's a database error, validation error, or this member has already reviewed this coffee shop.
   */
  async create(data) {
    try {
      const review = new Review(data)
      return await review.save()
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'This member has already reviewed this coffee shop. Each member can only submit one review per coffee shop.'
        )
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error creating review: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error creating review: ${err.message}`)
    }
  }

  /**
   * Finds a review by its ID.
   * Populates 'member' (firstName, lastName, email) and 'coffeeShop' (name, address).
   * @param {string} id - The ID of the review to find.
   * @returns {Promise<Document|null>} The review document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async findById(id) {
    try {
      const review = await Review.findById(id)
        .populate('member', 'firstName lastName email')
        .populate('coffeeShop', 'name address')
        .exec()
      return review // Returns null if not found
    } catch (err) {
      throw new Error(`Error finding review by ID: ${err.message}`)
    }
  }

  /**
   * Finds all reviews for a specific coffee shop.
   * Populates 'member' (firstName, lastName, email).
   * @param {string} coffeeShopId - The ID of the coffee shop.
   * @returns {Promise<Array<Document>>} An array of review documents.
   * @throws {Error} If there's a database error.
   */
  async findByCoffeeShopId(coffeeShopId) {
    try {
      return await Review.find({ coffeeShop: coffeeShopId })
        .populate('member', 'firstName lastName email')
        .exec()
    } catch (err) {
      throw new Error(`Error finding reviews by coffee shop ID: ${err.message}`)
    }
  }

  /**
   * Finds all reviews by a specific member.
   * Populates 'coffeeShop' (name, address).
   * @param {string} memberId - The ID of the member.
   * @returns {Promise<Array<Document>>} An array of review documents.
   * @throws {Error} If there's a database error.
   */
  async findByMemberId(memberId) {
    try {
      return await Review.find({ member: memberId })
        .populate('coffeeShop', 'name address')
        .exec()
    } catch (err) {
      throw new Error(`Error finding reviews by member ID: ${err.message}`)
    }
  }

  /**
   * Updates an existing review.
   * @param {string} id - The ID of the review to update.
   * @param {Object} updateData - The data to update.
   * @returns {Promise<Document|null>} The updated review document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async update(id, updateData) {
    try {
      const review = await Review.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
      }).exec()
      if (!review) {
        throw new Error(`Review with ID ${id} not found.`)
      }
      return review
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'Update failed: This member has already reviewed this coffee shop (potential attempt to change member/coffeeShop on a unique review).'
        )
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error updating review: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error updating review: ${err.message}`)
    }
  }

  /**
   * Deletes a review by its ID.
   * @param {string} id - The ID of the review to delete.
   * @returns {Promise<Document|null>} The deleted review document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async delete(id) {
    try {
      const review = await Review.findByIdAndDelete(id).exec()
      if (!review) {
        throw new Error(`Review with ID ${id} not found for deletion.`)
      }
      return review
    } catch (err) {
      throw new Error(`Error deleting review: ${err.message}`)
    }
  }
}

export default new ReviewModel()
