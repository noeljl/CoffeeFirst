import passport from 'passport' //npm install passport
import { Strategy as FacebookStrategy } from 'passport-facebook' //npm install passport-facebook
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth' //npm install ...
import { FACEBOOK, GOOGLE } from '../config.js'
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt'
import MembersModel from '../models/members.js'

import AuthService from '../services/AuthService.js'
const AuthServiceInstance = new AuthService()
const MembersModelInstance = new MembersModel()
const LocalStrategy = passportLocal.Strategy

const passportLoader = (app) => {
  // Initialisiert passport und Session
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((entity, done) => {
    // Unterscheide zwischen Benutzer und Teilnehmer
    if (entity.type === 'user') {
      done(null, { id: entity.id, type: 'user' })
    } else if (entity.type === 'attendee') {
      done(null, { id: entity.id, type: 'attendee' })
    }
  })

  passport.deserializeUser(async (serialized, done) => {
    try {
      let entity
      if (serialized.type === 'user') {
        // Deserialisiere Benutzer
        entity = await AuthServiceInstance.findUserById(serialized.id)
      } else if (serialized.type === 'attendee') {
        // Deserialisiere Teilnehmer (attendee)
        entity = await AuthServiceInstance.findAttendeeById(serialized.id)
      }
      done(null, entity)
    } catch (err) {
      done(err)
    }
  })

  passport.use(
    'local-user',
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const member = await MembersModelInstance.findOneByMail(email)
          if (!member) {
            return done(null, false, { message: 'Unbekannte E-Mail' })
          }
          const match = await bcrypt.compare(password, member.passwordHash)
          if (!match) {
            return done(null, false, { message: 'Falsches Passwort' })
          }
          member.type = 'user'
          return done(null, member)
        } catch (err) {
          return done(err)
        }
      }
    )
  )
  //  Für login üer Facebook oder Google, ohne Registrierung
  // Google Login Strategie
  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: process.env.GOOGLE_CONSUMER_KEY, // Google clientID
  //       clientSecret: process.env.GOOGLE_CONSUMER_SECRET, // Google clientSecret
  //       callbackURL: process.env.GOOGLE_CALLBACK_URL, // Google callback URL
  //     },
  //     async (accessToken, refreshToken, profile, done) => {
  //       try {
  //         const user = await AuthServiceInstance.googleLogin(profile)
  //         return done(null, user)
  //       } catch (err) {
  //         return done(err)
  //       }
  //     }
  //   )
  // )

  // // Facebook Login Strategie
  // passport.use(
  //   new FacebookStrategy(
  //     {
  //       clientID: FACEBOOK.CONSUMER_KEY,
  //       clientSecret: FACEBOOK.CONSUMER_SECRET,
  //       callbackURL: FACEBOOK.CALLBACK_URL,
  //       profileFields: ['id', 'emails', 'name'], // Optional: Um sicherzustellen, dass die benötigten Felder abgerufen werden
  //     },
  //     async (accessToken, refreshToken, profile, done) => {
  //       try {
  //         // Hier sollten Sie die Logik zur Verarbeitung des Facebook-Profils implementieren
  //         const user = await AuthServiceInstance.facebookLogin(profile)
  //         return done(null, user)
  //       } catch (err) {
  //         return done(err)
  //       }
  //     }
  //   )
  // )

  return passport
}

export default passportLoader
