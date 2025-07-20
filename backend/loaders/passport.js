import passport from 'passport'
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt'

import MembersModel from '../models/member.js'
import MemberService from '../services/memberService.js'

// Create instances of the LocalStrategy, MembersModel, and MemberService
const LocalStrategy = passportLocal.Strategy
const MembersModelInstance = new MembersModel()
const MemberServiceInstance = new MemberService()

// Main function to configure and initialize passport
const passportLoader = (app) => {
  // Initialize passport middleware for authentication
  app.use(passport.initialize())
  // Enable persistent login sessions (passport.session() middleware)
  // This will allow passport to serialize and deserialize user information into the session
  app.use(passport.session())

  // Serialize: determines which data of the user object should be stored in the session
  // Here, we only store the user's id and type
  passport.serializeUser((member, done) => {
    done(null, { id: member.id, type: 'member' })
  })

  // Deserialize: retrieves full user details from the session-stored id
  // This is called on every request that contains a session
  passport.deserializeUser(async (serialized, done) => {
    try {
      console.log('DeserializeUser called with:', serialized)
      // Find the member in the database by ID
      const member = await MemberServiceInstance.findMemberByID(serialized.id)
      console.log(
        'DeserializeUser found member:',
        member ? member.email : 'null'
      )
      if (!member) {
        // If member not found, clear the session
        console.log(
          `Member with id ${serialized.id} not found, clearing session`
        )
        return done(null, false)
      }
      // If member found, attach member object to req.user
      done(null, member)
    } catch (err) {
      console.error('Error in deserializeUser:', err.message)
      // If there's an error, also clear the session
      return done(null, false)
    }
  })

  // Local strategy for authenticating users using email and password
  // This is used when a user tries to log in
  passport.use(
    'local-member',
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          console.log('email ist ' + email)
          // Find the member by email
          const member = await MembersModelInstance.findOneByEmail(email)
          if (!member) {
            // If no member is found, authentication fails
            return done(null, false, { message: 'Unknown email address' })
          }
          // Compare the provided password with the stored password hash
          const match = await bcrypt.compare(password, member.passwordHash)
          if (!match) {
            // If password does not match, authentication fails
            return done(null, false, { message: 'Incorrect password' })
          }
          // If authentication is successful, add type and return member
          member.type = 'member'
          return done(null, member)
        } catch (err) {
          // Handle any errors during authentication
          return done(err)
        }
      }
    )
  )

  // Return the configured passport instance
  return passport
}

export default passportLoader
