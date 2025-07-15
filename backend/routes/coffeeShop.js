// coffeeShopRoutes.js
import express from 'express'
import CoffeeShopService from '../services/coffeeShopService.js'

const coffeeShopRouter = express.Router()
const coffeeShopService = new CoffeeShopService()
import createError from 'http-errors'
import { getFilteredCoffeeShops } from '../services/coffeeShopService.js'

// Middleware to handle async errors (optional, but good practice)
// If you have a global error handler for express, you can remove individual try/catch blocks
// and just let async functions throw errors, which will be caught by the global handler.
// For now, I'll include try/catch for explicit handling within each route.


/**
 * @route POST /api/coffeeshops
 * @desc Create a new coffee shop
 * @access Public (or adjust based on your auth implementation)
 */
coffeeShopRouter.post('/', async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      throw createError(401, 'Unauthorized')
    }
    const newCoffeeShop = await coffeeShopService.createCoffeeShop(req.body)
    res.status(201).json(newCoffeeShop)
  } catch (error) {
    next(error) // Pass error to the next error handling middleware
  }
})

/**
 * @route GET /api/coffeeshops
 * @desc Get all coffee shops
 * @access Public
 */
// calls the service layer
coffeeShopRouter.get('/', async (req, res, next) => {
  try {
    let coffeeShops = await coffeeShopService.getAllCoffeeShops()
    res.status(200).json(coffeeShops)
  } catch (error) {
    next(error)
  }
})
coffeeShopRouter.get('/filter', async (req, res, next) => {
  try {
    const filteredCoffeeShops = await getFilteredCoffeeShops(req.query)
    res.status(200).json(filteredCoffeeShops)
  } catch (error) {
    next(error)
  }
})
/**
 * @route GET /api/coffeeshops/by-name/:name
 * @desc Get a coffee shop by name
 * @param {string} name - Coffee shop name
 * @access Public
 */
coffeeShopRouter.get('/by-name/:name', async (req, res, next) => {
  try {
    const coffeeShop = await coffeeShopService.getCoffeeShopByName(
      req.params.name
    )
    res.status(200).json(coffeeShop)
  } catch (error) {
    next(error)
  }
})

/**
 * @route GET /api/coffeeshops/by-slug/:slug
 * @desc Get a coffee shop by slug
 * @param {string} slug - Coffee shop slug
 * @access Public
 */
coffeeShopRouter.get('/by-slug/:slug', async (req, res, next) => {
  try {
    const coffeeShop = await coffeeShopService.getCoffeeShopBySlug(
      req.params.slug
    )
    res.status(200).json(coffeeShop)
  } catch (error) {
    next(error)
  }
})

/**
 * @route GET /api/coffeeshops/districts
 * @desc Get all coffee shops grouped by district
 * @access Public
 */
coffeeShopRouter.get('/districts', async (req, res, next) => {
  try {
    const districts =
      await coffeeShopService.getAllCoffeeShopsGroupedByDistrict()
    res.json(districts)
  } catch (error) {
    next(error)
  }
})

/**
 * @route GET /api/coffeeshops/:id
 * @desc Get a coffee shop by ID
 * @param {string} id - Coffee shop ID
 * @access Public
 */
coffeeShopRouter.get('/:id', async (req, res, next) => {
  try {
    const coffeeShop = await coffeeShopService.getCoffeeShopById(req.params.id)
    res.status(200).json(coffeeShop)
  } catch (error) {
    next(error)
  }
})

/**
 * @route PUT /api/coffeeshops/:id
 * @desc Update a coffee shop by ID
 * @param {string} id - Coffee shop ID
 * @access Public (or adjust based on your auth implementation)
 */
coffeeShopRouter.put('/:id', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const updatedCoffeeShop = await coffeeShopService.updateCoffeeShop(
      req.params.id,
      req.body
    )
    res.status(200).json(updatedCoffeeShop)
  } catch (error) {
    next(error)
  }
})

/**
 * @route DELETE /api/coffeeshops/:id
 * @desc Delete a coffee shop by ID
 * @param {string} id - Coffee shop ID
 * @access Public (or adjust based on your auth implementation)
 */
coffeeShopRouter.delete('/:id', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const result = await coffeeShopService.deleteCoffeeShop(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

/**
 * @route POST /api/coffeeshops/:id/variants
 * @desc Add a coffee variant to a coffee shop
 * @param {string} id - Coffee shop ID
 * @access Public (or adjust based on your auth implementation)
 * @body {string} coffeeVariantId - The ID of the coffee variant to add
 */
coffeeShopRouter.post('/:id/variants', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const { coffeeVariantId } = req.body
    if (!coffeeVariantId) {
      throw createError(400, 'coffeeVariantId is required in the request body.')
    }
    const updatedCoffeeShop = await coffeeShopService.addCoffeeVariantToShop(
      req.params.id,
      coffeeVariantId
    )
    res.status(200).json(updatedCoffeeShop)
  } catch (error) {
    next(error)
  }
})

/**
 * @route DELETE /api/coffeeshops/:id/variants/:variantId
 * @desc Remove a coffee variant from a coffee shop
 * @param {string} id - Coffee shop ID
 * @param {string} variantId - Coffee variant ID to remove
 * @access Public (or adjust based on your auth implementation)
 */
coffeeShopRouter.delete('/:id/variants/:variantId', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const updatedCoffeeShop =
      await coffeeShopService.removeCoffeeVariantFromShop(
        req.params.id,
        req.params.variantId
      )
    res.status(200).json(updatedCoffeeShop)
  } catch (error) {
    next(error)
  }
})

// Note: updateCoffeeShopRating is typically called internally by review-related operations
// rather than being exposed as a direct API endpoint. If you still want to expose it,
// you might do so as a PUT request without a body, or with specific trigger logic.
/*
router.put('/:id/rating', async (req, res, next) => {
  try {
    const updatedShop = await coffeeShopService.updateCoffeeShopRating(req.params.id)
    res.status(200).json(updatedShop)
  } catch (error) {
    next(error)
  }
})
*/

/**
 * @route GET /api/coffeeshop/search?query=...&district=...
 * @desc Search for coffee shops by name or district
 * @param {string} query - Search query
 * @param {string} district - District for filtering
 * @access Public
 */
coffeeShopRouter.get('/search', async (req, res, next) => {
  try {
    const { query, district } = req.query;
    const results = await coffeeShopService.searchCafes({ query, district });
    res.json(results);
  } catch (error) {
    next(error);
  }
});

export default coffeeShopRouter
