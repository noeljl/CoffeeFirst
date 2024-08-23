import expressLoader from './express.js'
import passportLoader from './passport.js'
import routeLoader from '../routes/index.js'

// Exportiere die Funktion als Standardexport
export default async function loaders(app) {
  // Lädt Express-Middleware. Mehr dazu im ExpressLoader selbst.
  const expressApp = await expressLoader(app)

  // Lädt Passport-Middleware
  const passport = await passportLoader(expressApp)

  // Lädt Routen-Handler. Ruft in routes die index.js auf, die die Routen initialisiert.
  // Ohne das laufen die Routen nicht
  await routeLoader(app, passport)

  // Error Handler
  app.use((err, req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`)
    console.error(err.stack)
    res.status(err.status || 500).json({ error: err.message })
  })

  app.options('*', (req, res) => {
    console.log('Handling OPTIONS request for ', req.headers.origin)
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    )
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type')
    res.sendStatus(204) // Erfolgreicher Preflight-Request
  })
}
