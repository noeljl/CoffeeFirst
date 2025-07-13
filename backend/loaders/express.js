import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import { SESSION_SECRET, MONGO_URI } from '../config.js'

const expressLoader = (app) => {
  // CORS for local development.
  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:3002',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Authorization', 'Content-Type'],
      credentials: true,
      exposedHeaders: ['set-cookie'],
    })
  )

  // Static file serving
  app.use(express.static('public'))
  app.use('/profileImages', express.static('public/profileImages'))

  // Body parsing
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  const isProduction = process.env.NODE_ENV === 'production'

  // Session handling
  app.set('trust proxy', 1) // if behind a proxy (Heroku, Nginx, etc)
  app.use(
    session({
      secret: SESSION_SECRET,
      store: MongoStore.create({
        mongoUrl: MONGO_URI,
        collectionName: 'sessions',
      }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // Set to false for development (HTTP)
        httpOnly: false, // Allow JavaScript access
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  )

  return app
}

export default expressLoader
