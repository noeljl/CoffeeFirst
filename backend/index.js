import express from 'express'
import { PORT } from './config.js'

async function startServer() {
  const app = express()

  // Dynamischer Import von Loaders
  const loaders = await import('./loaders/index.js')

  // Ruft index.js in loaders auf. Diese wiederum aktiviert die loaders und Middleware für den Server
  await loaders.default(app)

  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
  })
}

startServer()
