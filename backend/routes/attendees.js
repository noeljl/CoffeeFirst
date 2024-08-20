import express from 'express'
import UserService from '../services/UserService.js'
import AttendeeService from '../services/AttendeeService.js'

const router = express.Router()
const AttendeeServiceInstance = new AttendeeService()

export default (app) => {
  app.use('/api/attendees', router)

  // Registration Endpoint
  router.post('/register', async (req, res, next) => {
    try {
      const data = req.body
      console.log('/routes/attendees.js register Data: ' + JSON.stringify(data))

      const response = await AttendeeServiceInstance.register(data)
      console.log(JSON.stringify(response))
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })
}
