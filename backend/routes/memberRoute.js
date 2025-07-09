// memberRoutes.js
import express from 'express'
import createError from 'http-errors' // Importiere createError
import MemberService from '../services/memberService.js' // Passe den Pfad bei Bedarf an

const memberRouter = express.Router()
const memberService = new MemberService()

/**
 * @route GET /api/members/:id
 * @desc Get a member by ID
 * @param {string} id - Member ID
 * @access Public (oder anpassen basierend auf deiner Auth-Implementierung)
 */
memberRouter.get('/:id', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const member = await memberService.findMemberByID(req.params.id)
    res.status(200).json(member)
  } catch (error) {
    next(error)
  }
})

memberRouter.get('/mail/:mail', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    console.log('memberRouter called')
    const member = await memberService.getMemberByMail(req.params.mail)
    res.status(200).json(member)
  } catch (error) {
    next(error)
  }
})

memberRouter.put('/:id', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const member = await memberService.updateMemberByID(req.params.id, req.body)
    res.status(200).json(member)
  } catch (error) {
    next(error)
  }
})

/**
 * @route DELETE /api/members/:id
 * @desc Delete a member by ID
 * @param {string} id - Member ID
 * @access Public (oder anpassen basierend auf deiner Auth-Implementierung)
 */
memberRouter.delete('/:id', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const result = await memberService.deleteMember(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

/**
 * @route POST /api/members/:id/coffeeshops/:listType
 * @desc Add a coffee shop to a member's specific list (wishlist, favorites, visited, reviewed)
 * @param {string} id - Member ID
 * @param {string} listType - Type of list (e.g., 'wishlistCoffeeShops', 'favoriteCoffeeShops')
 * @body {string} coffeeShopId - ID of the coffee shop to add
 * @access Public (oder anpassen)
 */
memberRouter.post('/:id/coffeeshops/:listType', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError(401, 'Unauthorized')
  }
  try {
    const { coffeeShopId } = req.body
    const { listType } = req.params

    if (!coffeeShopId) {
      throw createError(400, 'coffeeShopId is required in the request body.')
    }

    const updatedMember = await memberService.addCoffeeShop(
      req.params.id,
      coffeeShopId,
      listType
    )
    res.status(200).json(updatedMember)
  } catch (error) {
    next(error)
  }
})

/**
 * @route DELETE /api/members/:id/coffeeshops/:listType/:coffeeShopId
 * @desc Remove a coffee shop from a member's specific list (wishlist, favorites, visited, reviewed)
 * @param {string} id - Member ID
 * @param {string} listType - Type of list
 * @param {string} coffeeShopId - ID of the coffee shop to remove
 * @access Public (oder anpassen)
 */
memberRouter.delete(
  '/:id/coffeeshops/:listType/:coffeeShopId',
  async (req, res, next) => {
    if (!req.isAuthenticated()) {
      throw createError(401, 'Unauthorized')
    }
    try {
      const { listType, coffeeShopId } = req.params
      const updatedMember = await memberService.removeCoffeeShop(
        req.params.id,
        coffeeShopId,
        listType
      )
      res.status(200).json(updatedMember)
    } catch (error) {
      next(error)
    }
  }
)

/**
 * @route GET /api/members/:id/coffeeshops/:listType
 * @desc Get all café objects from a member's specific list (wishlist, favorites)
 * @param {string} id - Member ID
 * @param {string} listType - Type of list ('wishlistCoffeeShops', 'favoriteCoffeeShops')
 * @access Public (or adjust for your auth)
 */
memberRouter.get('/:id/coffeeshops/:listType', async (req, res, next) => {
  try {
    const { id, listType } = req.params;
    // Find the member and populate the requested list
    const member = await memberService.findMemberByIDWithPopulatedList(id, listType);
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }
    // Return the populated list (array of cafe objects)
    res.status(200).json(member[listType] || []);
  } catch (error) {
    next(error);
  }
});

// Add auth middleware if necessary
memberRouter.get('/:id/:listType', async (req, res, next) => {
  try {
    const list = await memberService.getList(req.params.id, req.params.listType)
    res.json(list)
  } catch (err) {
    next(err)
  }
})

export default memberRouter
