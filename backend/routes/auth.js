import express from 'express'
import AuthService from '../services/AuthService.js'
import passport from 'passport' // since you use passport.authenticate

const router = express.Router()
const AuthServiceInstance = new AuthService()

router.post('/register', async (req, res, next) => {
  try {
    const response = await AuthServiceInstance.register(req.body)
    res.status(200).json(response)
  } catch (err) {
    next(err)
  }
})

router.post(
  '/login',
  passport.authenticate('local-user'),
  async (req, res, next) => {
    try {
      const response = await AuthServiceInstance.loginMember(req.body)
      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }
)

router.get('/logged_in', async (req, res, next) => {
  try {
    const user = await AuthServiceInstance.getById(req.user.id)
    res.status(200).json({ loggedIn: true, user })
  } catch (err) {
    next(err)
  }
})

export default router
