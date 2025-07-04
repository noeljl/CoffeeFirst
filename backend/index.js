import './db/index.js' // ← This Code actually starts the database!
import express from 'express'
import { PORT } from './config.js'

// Einmalig laden
import './models/membershipType.js'
import './models/membership.js'
import './models/memberCard.js'
import './models/coffeeShop.js'
import './models/coffeeVariant.js'
import './models/review.js'
import './models/member.js'

// Basiskonfiguration of the expressseerver, that accepts the API Calls for us.

async function startServer() {
  const app = express()

  // Loaders gets importet. Index.js is basically the "Main function" in each folder. So the file, which initializes "the folder"
  const loaders = await import('./loaders/index.js')

  //await loaders.default(app) calls the main initialization function from loaders/index.js to load all important modules (Express Middleware, DB, Auth, etc.).
  await loaders.default(app)


  //test
  app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from backend!' })
  })


  // Start server, Tells the server to listen on the desired port, from which it will be reached by the frontend
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
    console.log('Hello')
  })
}

startServer()

// GO to loaders.index.js!
