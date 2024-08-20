import passport from 'passport' //npm install passport
import { Strategy as FacebookStrategy } from 'passport-facebook' //npm install passport-facebook
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth' //npm install ...
import LocalStrategy from 'passport-local' //npm install ...
import { FACEBOOK, GOOGLE } from '../config.js'

import AuthService from '../services/AuthService.js'
const AuthServiceInstance = new AuthService()

const passportLoader = (app) => {
  // Initialisiert passport und Session
  app.use(passport.initialize())
  app.use(passport.session())

  //  Dies ist eine Passport-Funktion, die verwendet wird, um festzulegen, wie Benutzerdaten (in diesem Fall der user.id) in der Sitzung gespeichert werden sollen.
  // Diese Funktion wird aufgerufen, nachdem ein Benutzer erfolgreich authentifiziert wurde.
  //  Das user-Objekt ist das, was du von deiner Authentifizierungsstrategie (z.B. lokale Strategie, OAuth, etc.) zurückbekommst. Es enthält in der Regel Benutzerdaten, die aus deiner Datenbank stammen, wie z.B. die Benutzer-ID, den Namen, die E-Mail-Adresse, etc.
  // done(null, user.id): Der done-Callback speichert die user.id in der Sitzung. null ist das erste Argument und steht für den Fehlerfall (da hier kein Fehler auftritt, wird null übergeben). Die user.id ist das, was in der Sitzung gespeichert wird und zur Identifizierung des Benutzers verwendet wird. Dies bedeutet, dass nur die Benutzer-ID in der Sitzung gespeichert wird, nicht das gesamte Benutzerobjekt.

  // Ein Benutzer meldet sich an. Passport authentifiziert den Benutzer erfolgreich.
  // Passport ruft die serializeUser-Funktion auf, um zu bestimmen, welche Daten über den Benutzer in der Sitzung gespeichert werden sollen.
  // Die user.id wird in der Sitzung gespeichert.
  // Bei zukünftigen Anfragen wird die gespeicherte user.id verwendet, um den Benutzer in der Datenbank nachzuschlagen und das vollständige Benutzerobjekt wiederherzustellen.
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // Set method to deserialize data stored in cookie and attach to req.user
  // deserializeUser: Diese Methode wird bei jeder Anfrage aufgerufen, nachdem Passport die in der Sitzung gespeicherte ID (die durch serializeUser hinterlegt wurde) extrahiert hat.
  // Ziel ist es, basierend auf dieser ID die vollständigen Benutzerdaten wiederherzustellen und an die Anfrage (req) anzuhängen, damit sie während der Anfrage verfügbar sind.
  passport.deserializeUser((id, done) => {
    done(null, { id })
  })

  // Konfigurieren der Stratgie für den Lokalen Login
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await AuthServiceInstance.login({
          username,
          password,
        })
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    })
  )

  //  Für login üer Facebook oder Google, ohne Registrierung
  // Google Login Strategie
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE.CONSUMER_KEY,
        clientSecret: GOOGLE.CONSUMER_SECRET,
        callbackURL: GOOGLE.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await AuthServiceInstance.googleLogin(profile)
          return done(null, user)
        } catch (err) {
          return done(err)
        }
      }
    )
  )

  // Facebook Login Strategie
  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK.CONSUMER_KEY,
        clientSecret: FACEBOOK.CONSUMER_SECRET,
        callbackURL: FACEBOOK.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await AuthServiceInstance.facebookLogin(profile)
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
