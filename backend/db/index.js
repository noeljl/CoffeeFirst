import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config() // will load ./app/.env

// process.env.MONGO_URI access the .env file
// If MONGO_URI is not set, it will default to 'mongodb://mongodb:27017/admin'
const mongoURI = process.env.MONGO_URI

await mongoose.connect(mongoURI, {
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
