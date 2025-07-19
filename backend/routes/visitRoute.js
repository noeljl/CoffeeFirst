import express from 'express'
import createError from 'http-errors'
import VisitService from '../services/visitService.js'
import requireAuth from '../middleware/requireAuth.js'

const visitRouter = express.Router()
const visitService = new VisitService()

/**
 * @route POST /api/visits
 * @desc Create a new visit record
 * @body {string} memberId - Member ID
 * @body {string} coffeeShopId - Coffee Shop ID
 * @body {object} visitData - Optional additional visit data
 * @access Private
 */
visitRouter.post('/', requireAuth, async (req, res, next) => {
  try {
    const { memberId, coffeeShopId, ...visitData } = req.body

    if (!memberId || !coffeeShopId) {
      throw createError(400, 'Member ID and Coffee Shop ID are required')
    }

    const visit = await visitService.createVisit(memberId, coffeeShopId, visitData)
    res.status(201).json(visit)
  } catch (error) {
    next(error)
  }
})

/**
 * @route GET /api/visits/member/:memberId
 * @desc Get all visits for a specific member
 * @param {string} memberId - Member ID
 * @query {number} limit - Maximum number of visits to return (default: 50)
 * @access Private
 */
visitRouter.get('/member/:memberId', requireAuth, async (req, res, next) => {
  try {
    const { memberId } = req.params
    const { limit } = req.query

    const visits = await visitService.getMemberVisits(memberId, parseInt(limit) || 50)
    res.status(200).json(visits)
  } catch (error) {
    next(error)
  }
})

/**
 * @route GET /api/visits/coffeeshop/:coffeeShopId
 * @desc Get all visits for a specific coffee shop
 * @param {string} coffeeShopId - Coffee Shop ID
 * @query {number} limit - Maximum number of visits to return (default: 50)
 * @access Private
 */
visitRouter.get('/coffeeshop/:coffeeShopId', requireAuth, async (req, res, next) => {
  try {
    const { coffeeShopId } = req.params
    const { limit } = req.query

    const visits = await visitService.getCoffeeShopVisits(coffeeShopId, parseInt(limit) || 50)
    res.status(200).json(visits)
  } catch (error) {
    next(error)
  }
})

/**
 * @route GET /api/visits/last/:memberId/:coffeeShopId
 * @desc Get the last visit for a member at a specific coffee shop
 * @param {string} memberId - Member ID
 * @param {string} coffeeShopId - Coffee Shop ID
 * @access Private
 */
visitRouter.get('/last/:memberId/:coffeeShopId', requireAuth, async (req, res, next) => {
  try {
    const { memberId, coffeeShopId } = req.params

    const visit = await visitService.getLastVisit(memberId, coffeeShopId)
    if (!visit) {
      return res.status(404).json({ message: 'No visit found' })
    }
    res.status(200).json(visit)
  } catch (error) {
    next(error)
  }
})

/**
 * @route GET /api/visits/stats/:memberId
 * @desc Get visit statistics for a member
 * @param {string} memberId - Member ID
 * @access Private
 */
visitRouter.get('/stats/:memberId', requireAuth, async (req, res, next) => {
  try {
    const { memberId } = req.params

    const stats = await visitService.getVisitStats(memberId)
    res.status(200).json(stats)
  } catch (error) {
    next(error)
  }
})

/**
 * @route GET /api/visits/recent/:memberId
 * @desc Get recent visits for a member
 * @param {string} memberId - Member ID
 * @query {number} days - Number of days to look back (default: 30)
 * @access Private
 */
visitRouter.get('/recent/:memberId', requireAuth, async (req, res, next) => {
  try {
    const { memberId } = req.params
    const { days } = req.query

    const visits = await visitService.getRecentVisits(memberId, parseInt(days) || 30)
    res.status(200).json(visits)
  } catch (error) {
    next(error)
  }
})

/**
 * @route GET /api/visits/history/:memberId/:coffeeShopId
 * @desc Get visit history for a member at a specific coffee shop
 * @param {string} memberId - Member ID
 * @param {string} coffeeShopId - Coffee Shop ID
 * @access Private
 */
visitRouter.get('/history/:memberId/:coffeeShopId', requireAuth, async (req, res, next) => {
  try {
    const { memberId, coffeeShopId } = req.params

    const visits = await visitService.getVisitHistory(memberId, coffeeShopId)
    res.status(200).json(visits)
  } catch (error) {
    next(error)
  }
})

export default visitRouter 