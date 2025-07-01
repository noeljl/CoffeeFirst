import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config() // will load ./app/.env

const mongoURI = process.env.MONGO_URI || 'mongodb://mongodb:27017/admin'

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

db.on('error', (err) => {
  console.error('MongoDB connection error:', err)
})

db.once('open', () => {
  console.log('MongoDB connected successfully')
})

export default mongoose
