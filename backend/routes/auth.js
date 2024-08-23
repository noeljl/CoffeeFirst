import express from 'express'
const router = express.Router()

// Instantiate Services
import AuthService from '../services/AuthService.js'
const AuthServiceInstance = new AuthService()

import UserService from '../services/UserService.js'
const UserServiceInstance = new UserService()

const Auth = (app, passport) => {
  app.use('/api/auth', router)

  // Registration Endpoint
  router.post('/register', async (req, res, next) => {
    try {
      const data = req.body
      console.log('/routes/auth.js register Data: ' + data)

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
        console.log(
          'Daten aus login in routes/auth ' + username + ' ' + password
        )

        const response = await AuthServiceInstance.login({
          username,
          password,
        })

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
  // untested
  router.get('/facebook', passport.authenticate('facebook'))

  // Facebook Login Callback Endpoint
  // untested
  router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    async (req, res) => {
      res.redirect('/')
    }
  )

  // Check Login Status Endpoint
  // untested. Bracht noch passport
  router.get('/logged_in', async (req, res, next) => {
    try {
      const { id } = req.user

      const user = await UserServiceInstance.getById({ id })

      res.status(200).send({
        loggedIn: true,
        user,
      })
    } catch (err) {
      next(err)
    }
  })
}

export default Auth
