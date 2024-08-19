const express = require('express')
const app = express()

const loaders = require('./loaders')

const { PORT } = require('./config')

async function startServer() {
  // Ruft index.js in loaders auf. Diese wiederum aktiviert die loaders und middleware für den Server
  loaders(app)

  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
  })
}

startServer()
