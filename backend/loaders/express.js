import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import { SESSION_SECRET, MONGO_URI } from '../config.js'

// Main function to configure and initialize the Express app
const expressLoader = (app) => {
  // Enable CORS (Cross-Origin Resource Sharing) for local development
  // Allows frontend running on different ports to communicate with backend
  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:3002',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Authorization', 'Content-Type'],
      credentials: true, // Allow cookies and credentials to be sent
      exposedHeaders: ['set-cookie'], // Expose set-cookie header to frontend
    })
  )

  // Serve static files from the 'public' directory
  app.use(express.static('public'))
  // Serve profile images from a specific subdirectory
  app.use('/profileImages', express.static('public/profileImages'))

  // Parse incoming JSON requests
  app.use(bodyParser.json())
  // Parse URL-encoded data (from forms, etc.)
  app.use(bodyParser.urlencoded({ extended: true }))

  // Determine if the app is running in production mode
  const isProduction = process.env.NODE_ENV === 'production'

  // Session handling configuration
  // Stores session data in MongoDB using connect-mongo
  app.set('trust proxy', 1) // Trust first proxy (needed for secure cookies behind proxies)
  app.use(
    session({
      secret: SESSION_SECRET, // Secret for signing the session ID cookie
      store: MongoStore.create({
        mongoUrl: MONGO_URI, // MongoDB connection string
        collectionName: 'sessions', // Collection to store sessions
      }),
      resave: false, // Don't save session if unmodified
      saveUninitialized: false, // Don't create session until something stored
      cookie: {
        secure: false, // Set to true in production for HTTPS
        httpOnly: false, // Allow JavaScript access to cookies (set to true for more security)
        sameSite: 'lax', // CSRF protection. CSFR is a type of attack where a malicious website sends a request to a website that the user is already authenticated with. Lax is the default and allows for GET requests to be made.
        maxAge: 24 * 60 * 60 * 1000, // Session expiration: 1 day
      },
    })
  )

  // Return the configured app instance
  return app
}

export default expressLoader
