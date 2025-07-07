import express from 'express'
import createError from 'http-errors'
import FilterService from '../services/filterService.js'

const filterRouter = express.Router()
const filterService = new FilterService()

/**
 * @route GET /api/filter
 * @desc Get filtered coffee shops based on query parameters
 * @query wifi=true&petFriendly=true&wheelchairAccessible=true
 * @access Public
 */
filterRouter.get('/', async (req, res, next) => {
  try {
    const filters = req.query // { wifi: 'true', petFriendly: 'true', ... }
    const coffeeShops = await filterService.getFilteredCafes(filters)
    res.status(200).json(coffeeShops)
  } catch (error) {
    console.error('Error in filter route:', error)
    next(createError(500, 'Failed to retrieve filtered coffee shops'))
  }
})

export default filterRouter
