// memberRoutes.js
import express from 'express'
import createError from 'http-errors' // Importiere createError
import MemberService from '../services/memberService.js' // Passe den Pfad bei Bedarf an
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const memberRouter = express.Router()
const memberService = new MemberService()

// 1. Upload-Pfad definieren und sicherstellen, dass er existiert
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'profileImages')
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

// 2. Multer-Storage anlegen
const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (_, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
})

const upload = multer({ storage: storage })

/**
 * @route GET /api/members/:id
 * @desc Get a member by ID
 * @param {string} id - Member ID
 * @access Public (oder anpassen basierend auf deiner Auth-Implementierung)
 */
memberRouter.get('/:id', async (req, res, next) => {
  try {
    const member = await memberService.findMemberByID(req.params.id)
    res.status(200).json(member)
  } catch (error) {
    next(error)
  }
})

memberRouter.put('/:id/password', async (req, res, next) => {
  if (!req.isAuthenticated()) return next(createError(401, 'Unauthorized'))

  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword)
    return next(
      createError(400, 'currentPassword und newPassword erforderlich')
    )

  try {
    const updatedMember = await memberService.changePassword(
      req.params.id,
      currentPassword,
      newPassword
    )
    res.json({ message: 'Password updated', updatedMember })
  } catch (err) {
    next(err)
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


memberRouter.put(
  '/:id',
  upload.single('profilePic'),
  async (req, res, next) => {
    try {
      const { id } = req.params

      // File-Pfad ermitteln (nutzt dein UPLOAD_DIR!)
      const profilePicture = req.file
        ? `/profileImages/${req.file.filename}` // öffentlich abrufbar
        : undefined

      // Alle anderen Textfelder aus dem Request ebenfalls übernehmen
      const updateData = { ...req.body }
      if (profilePicture) updateData.profilePicture = profilePicture

      const updatedMember = await memberService.updateMemberByID(id, updateData)

      // Immer ein JSON zurückgeben
      res.json(updatedMember) // { id, profilePicture, ... }
    } catch (err) {
      next(err)
    }
  }
)

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
    const { id, listType } = req.params
    // Find the member and populate the requested list
    const member = await memberService.findMemberByIDWithPopulatedList(
      id,
      listType
    )
    if (!member) {
      return res.status(404).json({ error: 'Member not found' })
    }
    // Return the populated list (array of cafe objects)
    res.status(200).json(member[listType] || [])
  } catch (error) {
    next(error)
  }
})

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
