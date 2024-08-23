import express from 'express'
const router = express.Router()

// Instantiate Services
import AuthService from '../services/AuthService.js'
const AuthServiceInstance = new AuthService()

import UserService from '../services/UserService.js'
const UserServiceInstance = new UserService()

// Middleware, um sicherzustellen, dass der Benutzer authentifiziert ist
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/login') // Leitet zum Login um, wenn nicht authentifiziert
  }
}

const Auth = (app, passport) => {
  app.use('/api/auth', router)

  // Registration Endpoint
  router.post('/register', async (req, res, next) => {
    try {
      const data = req.body
      const response = await AuthServiceInstance.register(data)
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  // Login Endpoint
  router.post(
    '/login',
    passport.authenticate('local'),
    async (req, res, next) => {
      try {
        const { username, password } = req.body
        const response = await AuthServiceInstance.login({ username, password })
        res.status(200).send(response)
      } catch (err) {
        next(err)
      }
    }
  )

  // Google Login Endpoint
  router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

  // Google Login Callback Endpoint
  router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
      res.redirect('/')
    }
  )

  // Facebook Login Endpoint
  router.get('/facebook', passport.authenticate('facebook'))

  // Facebook Login Callback Endpoint
  router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    async (req, res) => {
      res.redirect('/')
    }
  )

  // Geschützte Route: Beispiel für eine Route, die Authentifizierung erfordert
  router.get('/protected-route', ensureAuthenticated, (req, res) => {
    res.send('Diese Seite ist geschützt und erfordert eine Anmeldung.')
  })

  // Check Login Status Endpoint
  router.get('/logged_in', async (req, res, next) => {
    try {
      const { id } = req.user
      const user = await UserServiceInstance.getById({ id })
      res.status(200).send({ loggedIn: true, user })
    } catch (err) {
      next(err)
    }
  })
}

export default Auth
