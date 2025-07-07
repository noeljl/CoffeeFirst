// memberCardRoutes.js
import express from 'express'
import createError from 'http-errors' // Importiere createError, falls du es in den Routen verwendest
import MemberCardService from '../services/memberCardService.js' // Passe den Pfad bei Bedarf an

const memberCardRouter = express.Router()
const memberCardService = new MemberCardService()

/**
 * @route GET /api/membercards/:id
 * @desc Get a member card by ID
 * @param {string} id - Member card ID
 * @access Public (oder anpassen basierend auf deiner Auth-Implementierung)
 */
memberCardRouter.get('/:id', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const memberCard = await memberCardService.getMemberCardById(req.params.id)
    res.status(200).json(memberCard)
  } catch (error) {
    next(error) // Fehler an das zentrale Fehler-Handling weiterleiten
  }
})

/**
 * @route GET /api/membercards/by-code/:cardCode
 * @desc Get a member card by its card code
 * @param {string} cardCode - The unique card code
 * @access Public (oder anpassen basierend auf deiner Auth-Implementierung)
 */
memberCardRouter.get('/by-code/:cardCode', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const memberCard = await memberCardService.getMemberCardByCode(
      req.params.cardCode
    )
    res.status(200).json(memberCard)
  } catch (error) {
    next(error)
  }
})

/**
 * @route PUT /api/membercards/:id
 * @desc Update a member card by ID
 * @param {string} id - Member card ID
 * @access Public (oder anpassen basierend auf deiner Auth-Implementierung)
 */
memberCardRouter.put('/:id', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const updatedMemberCard = await memberCardService.updateMemberCard(
      req.params.id,
      req.body
    )
    res.status(200).json(updatedMemberCard)
  } catch (error) {
    next(error)
  }
})

/**
 * @route DELETE /api/membercards/:id
 * @desc Delete a member card by ID
 * @param {string} id - Member card ID
 * @access Public (oder anpassen basierend auf deiner Auth-Implementierung)
 */
memberCardRouter.delete('/:id', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const result = await memberCardService.deleteMemberCard(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

export default memberCardRouter
