import passport from 'passport'
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt'

import MembersModel from '../models/member.js'
import AuthService from '../services/AuthService.js'

const LocalStrategy = passportLocal.Strategy
const MembersModelInstance = new MembersModel()
const AuthServiceInstance = new AuthService()

// STILL NEEDS IMPLEMENTATION. WILL DO WHEN I GET TO LOGGIN IN USERS
// 'Passport lets your app know who the user is, how to log them in, how to log them out, and optionally how to remember them across requests.'
// So this can basically check who the current user is. If you look into the auth.js in routes, you will see, that the login route has
// passport.authenticate('local-user') to authenticate the user opon calling the route

// At some point

const passportLoader = (app) => {
  // Initialize passport middleware
  app.use(passport.initialize())
  //Passport will:
  //Serialize the user using your passport.serializeUser() function
  //Store a session ID in a cookie (sent to the browser)
  //Associate that session ID with the user in memory or in a session store (e.g. Redis, Mongo)
  app.use(passport.session())

  // Serialize: store only minimal info in the session
  passport.serializeUser((user, done) => {
    done(null, { id: user.id, type: 'user' })
  })

  // Deserialize: fetch full user object from DB
  passport.deserializeUser(async (serialized, done) => {
    try {
      const user = await AuthServiceInstance.findUserById(serialized.id)
      done(null, user)
    } catch (err) {
      done(err)
    }
  })

  // Local strategy. "Look if this user actually exists"
  passport.use(
    'local-user',
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const user = await MembersModelInstance.findOneByEmail(email)
          if (!user) {
            return done(null, false, { message: 'Unknown email address' })
          }
          const match = await bcrypt.compare(password, user.passwordHash)
          if (!match) {
            return done(null, false, { message: 'Incorrect password' })
          }
          user.type = 'user'
          //Behind the scenes, user will be set to req.user
          // why is this useful?
          // Because you can restrict certain routes using that tactic. Lets say there is a Route that retrieves some data, that only a admin should be able to retrieve:
          // In some Routes.folder:
          // app.get('/getPrivateData', (req, res) => {
          //   if (!req.isAuthenticated()) { // is the one requesting sending the reques authenticated?
          //     return res.status(401).send('Please log in')
          //   }
          //   res.send(`Welcome, ${req.user.email}`)
          // })
          return done(null, user)
        } catch (err) {
          return done(err)
        }
      }
    )
  )

  return passport
}

export default passportLoader
