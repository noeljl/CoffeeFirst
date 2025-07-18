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
