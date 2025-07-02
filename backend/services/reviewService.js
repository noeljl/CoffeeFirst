// ReviewService.js
import createError from 'http-errors'
import ReviewModel from '../models/review.js' // Assuming ReviewModel is in a file named reviewModel.js

class ReviewService {
  constructor() {
    this.reviewModel = ReviewModel // ReviewModel is already an instance
  }

  /**
   * Creates a new review.
   * @param {Object} data - The data for the new review (member, coffeeShop, rating, comment, subject).
   * @returns {Promise<Document>} The created review document.
   * @throws {HttpError} If the member has already reviewed the coffee shop, validation fails, or a server error occurs.
   */
  async createReview(data) {
    try {
      const review = await this.reviewModel.create(data)
      return review
    } catch (error) {
      console.error(`Error in createReview: ${error.message}`)
      if (error.message.includes('already reviewed this coffee shop')) {
        throw createError(409, error.message) // Conflict
      }
      if (error.message.includes('Validation error')) {
        throw createError(400, error.message) // Bad Request
      }
      throw createError(500, `Failed to create review: ${error.message}`)
    }
  }

  /**
   * Retrieves a review by its ID.
   * @param {string} reviewId - The ID of the review.
   * @returns {Promise<Document>} The review document.
   * @throws {HttpError} If the review is not found or a server error occurs.
   */
  async getReviewById(reviewId) {
    try {
      const review = await this.reviewModel.findById(reviewId)
      if (!review) {
        throw createError(404, 'Review not found')
      }
      return review
    } catch (error) {
      console.error(`Error in getReviewById: ${error.message}`)
      if (error.statusCode) throw error // Re-throw http-errors
      throw createError(500, `Failed to retrieve review: ${error.message}`)
    }
  }

  /**
   * Retrieves all reviews for a specific coffee shop.
   * @param {string} coffeeShopId - The ID of the coffee shop.
   * @returns {Promise<Array<Document>>} An array of review documents.
   * @throws {HttpError} If a server error occurs.
   */
  async getReviewsByCoffeeShopId(coffeeShopId) {
    try {
      const reviews = await this.reviewModel.findByCoffeeShopId(coffeeShopId)
      return reviews
    } catch (error) {
      console.error(`Error in getReviewsByCoffeeShopId: ${error.message}`)
      throw createError(
        500,
        `Failed to retrieve reviews for coffee shop: ${error.message}`
      )
    }
  }

  /**
   * Retrieves all reviews by a specific member.
   * @param {string} memberId - The ID of the member.
   * @returns {Promise<Array<Document>>} An array of review documents.
   * @throws {HttpError} If a server error occurs.
   */
  async getReviewsByMemberId(memberId) {
    try {
      const reviews = await this.reviewModel.findByMemberId(memberId)
      return reviews
    } catch (error) {
      console.error(`Error in getReviewsByMemberId: ${error.message}`)
      throw createError(
        500,
        `Failed to retrieve reviews by member: ${error.message}`
      )
    }
  }

  /**
   * Updates an existing review.
   * @param {string} reviewId - The ID of the review to update.
   * @param {Object} updateData - The data to update (e.g., rating, comment, subject).
   * @returns {Promise<Document>} The updated review document.
   * @throws {HttpError} If the review is not found, validation fails, or a server error occurs.
   */
  async updateReview(reviewId, updateData) {
    try {
      const review = await this.reviewModel.update(reviewId, updateData)
      return review
    } catch (error) {
      console.error(`Error in updateReview: ${error.message}`)
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      if (
        error.message.includes('Validation error') ||
        error.message.includes('already reviewed')
      ) {
        throw createError(400, error.message)
      }
      throw createError(500, `Failed to update review: ${error.message}`)
    }
  }

  /**
   * Deletes a review by its ID.
   * @param {string} reviewId - The ID of the review to delete.
   * @returns {Promise<Object>} A success message.
   * @throws {HttpError} If the review is not found or a server error occurs.
   */
  async deleteReview(reviewId) {
    try {
      const review = await this.reviewModel.delete(reviewId)
      return { message: `Review with ID ${review.id} successfully deleted.` }
    } catch (error) {
      console.error(`Error in deleteReview: ${error.message}`)
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      throw createError(500, `Failed to delete review: ${error.message}`)
    }
  }
}

export default ReviewService
