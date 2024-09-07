import express from 'express'
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

  // Update Endpoint
  router.put('/:firstName/:middleName/:lastName', async (req, res, next) => {
    try {
      const { firstName, middleName, lastName } = req.params
      const data = req.body

      console.log(
        `/routes/attendees.js update Data: ${JSON.stringify({
          firstName,
          middleName,
          lastName,
          ...data,
        })}`
      )

      const response = await AttendeeServiceInstance.update(
        firstName,
        middleName,
        lastName,
        data
      )
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  // Delete Endpoint
  router.delete('/:firstName/:middleName/:lastName', async (req, res, next) => {
    try {
      const { firstName, middleName, lastName } = req.params

      console.log(
        `/routes/attendees.js delete Data: ${JSON.stringify({
          firstName,
          middleName,
          lastName,
        })}`
      )

      const response = await AttendeeServiceInstance.delete(
        firstName,
        middleName,
        lastName
      )
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  // Fetch all attendees
  router.get('/', async (req, res, next) => {
    try {
      console.log('/routes/attendees.js fetchAttendees called')

      const response = await AttendeeServiceInstance.fetchAttendees()
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

}
