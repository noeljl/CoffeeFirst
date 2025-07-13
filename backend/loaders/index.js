import expressLoader from './express.js'
import passportLoader from './passport.js'
import routeLoader from '../routes/index.js'

export default async function loaders(app) {
  const expressApp = await expressLoader(app)

  // 2. Passport-Middleware
  const passport = await passportLoader(expressApp)

  // 2.1 Dein Test-Logger jetzt direkt HIER einhängen:
  expressApp.use((req, res, next) => {
    console.log('=== DAS IST EIN TEST ===')
    console.log('Session ID:', req.sessionID)
    console.log('Session:', req.session)
    console.log('User:', req.user)
    console.log(
      'Is Authenticated:',
      req.isAuthenticated ? req.isAuthenticated() : 'passport not initialized'
    )
    next()
  })

  // 3. Routen
  await routeLoader(expressApp, passport)

  // 4. Error Handler
  app.use((err, req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`)
    console.error(err.stack)
    res.status(err.status || 500).json({ error: err.message })
  })
}
