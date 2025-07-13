// membershipRoutes.js
import express from 'express'
import createError from 'http-errors' // Make sure to import http-errors
import MembershipService from '../services/memberShipService.js' // Adjust the path as necessary

const membershipRouter = express.Router()
const membershipService = new MembershipService()

/**
 * @route GET /api/memberships/:id
 * @desc Get a membership by its ID
 * @param {string} id - Membership ID
 * @access Public (adjust based on your authentication/authorization needs)
 */
membershipRouter.get('/:id', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const membership = await membershipService.getMembershipById(req.params.id)
    res.status(200).json(membership)
  } catch (error) {
    next(error) // Pass errors to the next Express error handling middleware
  }
})

/**
 * @route GET /api/memberships/by-member/:memberId
 * @desc Get a membership by the associated member's ID
 * @param {string} memberId - The ID of the member
 * @access Public (adjust based on your authentication/authorization needs)
 */
membershipRouter.get('/by-member/:memberId', async (req, res, next) => {
  try {
    const membership = await membershipService.getMembershipByMemberId(
      req.params.memberId
    )
    res.status(200).json(membership)
  } catch (error) {
    next(error)
  }
})

/**
 * @route PUT /api/memberships/:id
 * @desc Update a membership by its ID
 * @param {string} id - Membership ID
 * @body {Object} updateData - Data to update the membership (e.g., endDate, renewalDate)
 * @access Public (adjust based on your authentication/authorization needs)
 */
membershipRouter.put('/:id', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const updatedMembership = await membershipService.updateMembership(
      req.params.id,
      req.body
    )
    res.status(200).json(updatedMembership)
  } catch (error) {
    next(error)
  }
})

/**
 * @route DELETE /api/memberships/:id
 * @desc Delete a membership by its ID
 * @param {string} id - Membership ID
 * @access Public (adjust based on your authentication/authorization needs)
 */
membershipRouter.delete('/:id', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const result = await membershipService.deleteMembership(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

/**
 * @route PUT /api/memberships/:id/decrement-coffee-quota
 * @desc Decrement the coffee quota for a membership
 * @param {string} id - Membership ID
 * @body {number} [amount=1] - The amount to decrement the quota by (default is 1)
 * @access Public (adjust based on your authentication/authorization needs)
 */
membershipRouter.put('/:id/decrement-coffee-quota', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const { amount } = req.body // Expect amount in the request body, default to 1 if not provided
    const updatedMembership = await membershipService.decrementCoffeeQuota(
      req.params.id,
      amount
    )
    res.status(200).json(updatedMembership)
  } catch (error) {
    next(error)
  }
})

/**
 * @route PUT /api/memberships/:id/increment-coffee-quota
 * @desc Increment the coffee quota for a membership
 * @param {string} id - Membership ID
 * @body {number} [amount=1] - The amount to increment the quota by (default is 1)
 * @access Public (adjust based on your authentication/authorization needs)
 */
membershipRouter.put('/:id/increment-coffee-quota', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const { amount } = req.body // Expect amount in the request body, default to 1 if not provided
    const updatedMembership = await membershipService.incrementCoffeeQuota(
      req.params.id,
      amount
    )
    res.status(200).json(updatedMembership)
  } catch (error) {
    next(error)
  }
})

export default membershipRouter
