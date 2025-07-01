// npm install dotenv. Installieren auf /backend ebene
// Retieves data from the .env file, so you can access it easily and centrally
// import from config.js: import { GOOGLE } from './config.js'. Way more comfortable than to write process.env.VARIABLE with .env all the time
import dotenv from 'dotenv'

dotenv.config()
export const MONGO_URI = process.env.MONGO_URI
export const PORT = process.env.SERVER_PORT || 3001
export const SESSION_SECRET = process.env.SESSION_SECRET
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

export const NODE_ENV = 'development'

console.log('MONGO_URI:', MONGO_URI)

