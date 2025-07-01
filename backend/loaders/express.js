import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session' // npm install express-session
import { SESSION_SECRET, NODE_ENV } from '../config.js'

const expressLoader = (app) => {
  // CORS-Konfiguration
  const corsOptions = {
    origin:
      NODE_ENV === 'production'
        ? [
            'https://rotaract-district-1866.de',
            'https://www.rotaract-district-1866.de',
          ]
        : 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true, // erlaubt Set-Cookie in Responses
  }
  app.use(cors(corsOptions))

  // Body-Parsing
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Hinter Proxy vertrauen (z.B. bei HTTPS-Termination)
  app.set('trust proxy', 1)

  // Session-Handling
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: NODE_ENV === 'production', // nur HTTPS in Prod
        httpOnly: true, // schützt gegen XSS
        sameSite: 'lax', // verhindert CSRF in vielen Fällen
        maxAge: 24 * 60 * 60 * 1000, // 24 h
      },
    })
  )

  return app
}

export default expressLoader
