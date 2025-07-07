// reviewRoute.js
import express from 'express'
import ReviewService from '../services/reviewService.js' // Import the ReviewService
import createError from 'http-errors' // Import http-errors for consistent error handling

// Create an instance of the ReviewService
const reviewService = new ReviewService()

// Create an Express router
const reviewRouter = express.Router()

/**
 * Creates a new review.
 */
reviewRouter.post('/', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const review = await reviewService.createReview(req.body)
    res.status(201).json(review)
  } catch (error) {
    // Pass the error to the next middleware (error handler)
    next(error)
  }
})

/**
 * Retrieves a review by its ID.
 */
reviewRouter.get('/:id', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const review = await reviewService.getReviewById(req.params.id)
    res.status(200).json(review)
  } catch (error) {
    next(error)
  }
})

/**
 * Retrieves all reviews for a specific coffee shop.
 */
reviewRouter.get('/coffee-shop/:coffeeShopId', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const reviews = await reviewService.getReviewsByCoffeeShopId(
      req.params.coffeeShopId
    )
    res.status(200).json(reviews)
  } catch (error) {
    next(error)
  }
})

/**
 * Retrieves all reviews by a specific member.
 */
reviewRouter.get('/member/:memberId', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const reviews = await reviewService.getReviewsByMemberId(
      req.params.memberId
    )
    res.status(200).json(reviews)
  } catch (error) {
    next(error)
  }
})

/**
 * Updates an existing review.
 */
reviewRouter.put('/:id', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const review = await reviewService.updateReview(req.params.id, req.body)
    res.status(200).json(review)
  } catch (error) {
    next(error)
  }
})

/**
 * Deletes a review by its ID.
 */
reviewRouter.delete('/:id', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const result = await reviewService.deleteReview(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

export default reviewRouter
