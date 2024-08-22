// npm install dotenv. Installieren auf /backend ebene
import dotenv from 'dotenv'

dotenv.config({
  path: './Users/laurensohl/Documents/rotaractuserproject/backend/.env',
})

// Imporitert die Daten aus der .env Datei
export const DB = {
  PGHOST: process.env.PGHOST,
  PGUSER: process.env.PGUSER,
  PGDATABASE: process.env.PGDATABASE,
  PGPASSWORD: process.env.PGPASSWORD,
  PGPORT: process.env.PGPORT,
}

export const FACEBOOK = {
  CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL,
  CONSUMER_KEY: process.env.FACEBOOK_CONSUMER_KEY,
  CONSUMER_SECRET: process.env.FACEBOOK_CONSUMER_SECRET,
}

export const GOOGLE = {
  CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  CONSUMER_KEY: process.env.GOOGLE_CONSUMER_KEY,
  CONSUMER_SECRET: process.env.GOOGLE_CONSUMER_SECRET,
}

export const PORT = process.env.SERVER_PORT
export const SESSION_SECRET = process.env.SESSION_SECRET
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

// Testen, ob aus env Daten verfügbar. In
console.log('Database host:', process.env.PGHOST)
