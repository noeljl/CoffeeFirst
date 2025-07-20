import express from 'express'
import AuthService from '../services/AuthService.js'
import passport from 'passport' // since you use passport.authenticate
import { body, validationResult } from 'express-validator'

const router = express.Router()
const AuthServiceInstance = new AuthService()

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/[A-Za-z]/)
      .withMessage('Password must contain at least one letter')
      .matches(/\d/)
      .withMessage('Password must contain at least one number'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const newMember = await AuthServiceInstance.register(req.body)
      req.login(newMember, (err) => {
        if (err) return next(err)
        // Return the same response format as /login
        return res.status(200).json({ member: newMember, isAuthenticated: true })
      })
    } catch (err) {
      next(err)
    }
  }
)

router.get('/check-session', (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated?.() ?? false,
    member: req.user ?? null,
  })
})

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    res.json({ isAuthenticated: false })
  })
})

// To be completed
router.post('/login', (req, res, next) =>
  passport.authenticate('local-member', (err, member, info) => {
    if (err) return next(err)
    if (!member) return res.status(401).json({ error: info?.message })
    req.login(member, (e) => {
      if (e) return next(e)
      return res.json({ member, isAuthenticated: true })
    })
  })(req, res, next)
)

router.get('/check-email', async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ exists: false, error: 'No email provided' });
    const exists = !!(await AuthServiceInstance.membersModel.findOneByEmail(email));
    res.json({ exists });
  } catch (err) {
    next(err);
  }
});

export default router
