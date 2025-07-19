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
    // Add the member ID from the authenticated user
    const reviewData = {
      ...req.body,
      member: req.user._id // Add the member ID from the authenticated user
    };
    const review = await reviewService.createReview(reviewData)
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

// Get review summary for a coffee shop
reviewRouter.get('/coffee-shop/:coffeeShopId/summary', async (req, res, next) => {
  try {
    const reviews = await reviewService.getReviewsByCoffeeShopId(req.params.coffeeShopId);

    if (!reviews.length) {
      return res.json({ count: 0 });
    }

    // Helper to calculate mean
    const mean = arr => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : null;
    // Helper to calculate mode with split detection for boolean fields
    const mode = arr => {
      if (!arr.length) return null;
      const freq = {};
      arr.forEach(val => { 
        if (val !== null && val !== undefined) {
          freq[val] = (freq[val] || 0) + 1; 
        }
      });
      
      // For boolean fields, check if we have conflicting values
      const uniqueValues = Object.keys(freq);
      if (uniqueValues.length > 1 && uniqueValues.every(val => val === 'true' || val === 'false')) {
        // Check if we have a true tie (equal number of true/false)
        const trueCount = freq['true'] || 0;
        const falseCount = freq['false'] || 0;
        if (trueCount === falseCount) {
          // Only show "Split" when there's a true tie
          return 'split';
        }
        // Otherwise return the majority result
        return trueCount > falseCount ? 'true' : 'false';
      }
      
      return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
    };

    // Gather all numeric ratings for overall mean
    const allNumericRatings = reviews
      .map(r => [r.taste, r.presentation, r.serviceFriendliness])
      .flat()
      .filter(Number.isFinite);

    // Gather all values for each field (exclude null/undefined for boolean fields)
    const tasteArr = reviews.map(r => r.taste).filter(Number.isFinite);
    const presentationArr = reviews.map(r => r.presentation).filter(Number.isFinite);
    const temperatureArr = reviews.map(r => r.temperature).filter(val => val === true || val === false);
    const vibeArr = reviews.map(r => r.vibe).filter(val => val !== null && val !== undefined);
    const aestheticsArr = reviews.map(r => r.aesthetics).filter(val => val === true || val === false);
    const serviceFriendlinessArr = reviews.map(r => r.serviceFriendliness).filter(Number.isFinite);
    const pricingArr = reviews.map(r => r.pricing).filter(val => val !== null && val !== undefined);
    const ecoFriendlyArr = reviews.map(r => r.ecoFriendly).filter(val => val === true || val === false);
    const veganFriendlyArr = reviews.map(r => r.veganFriendly).filter(val => val === true || val === false);
    const instagramArr = reviews.map(r => r.instagram).filter(val => val === true || val === false);
    const greatForStudyingArr = reviews.map(r => r.greatForStudying).filter(val => val === true || val === false);
    const dateSpotArr = reviews.map(r => r.dateSpot).filter(val => val === true || val === false);
    const petFriendlyArr = reviews.map(r => r.petFriendly).filter(val => val === true || val === false);

    const summary = {
      count: reviews.length,
      overallRating: mean(allNumericRatings), // Overall mean of all numeric ratings
      avgTaste: mean(tasteArr),
      avgPresentation: mean(presentationArr),
      temperature: mode(temperatureArr),
      vibe: mode(vibeArr),
      aesthetics: mode(aestheticsArr),
      avgServiceFriendliness: mean(serviceFriendlinessArr),
      pricing: mode(pricingArr),
      ecoFriendly: mode(ecoFriendlyArr),
      veganFriendly: mode(veganFriendlyArr),
      instagram: mode(instagramArr),
      greatForStudying: mode(greatForStudyingArr),
      dateSpot: mode(dateSpotArr),
      petFriendly: mode(petFriendlyArr),
    };

    console.log("Review summary being sent:", summary); // Debug log
    res.json(summary);
  } catch (error) {
    next(error);
  }
});

export default reviewRouter
