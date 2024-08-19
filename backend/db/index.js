'use strict'

// npm install pg
import dotenv from 'dotenv'
import pkg from 'pg'
import { DB } from '../config.js' 

// Nutze absoluten Pfad zur .env.Sont findet er sie nciht
dotenv.config({
  path: '/Users/laurensohl/Documents/rotaractuserproject/backend/.env',
})

const { Pool } = pkg

console.log('Loaded PGUSER:', process.env.PGUSER)
// console.log(DB.PGUSER)

const pool = new Pool({
  user: DB.PGUSER,
  host: DB.PGHOST,
  database: DB.PGDATABASE,
  password: DB.PGPASSWORD,
  port: DB.PGPORT,
})

export const query = (text, params) => pool.query(text, params)
