import express from 'express'
import EventService from '../services/EventService.js'

const router = express.Router()
const EventServiceInstance = new EventService()

export default (app) => {
  app.use('/api/events', router)

  // Registration Endpoint
  router.post('/register', async (req, res, next) => {
    try {
      const data = req.body
      console.log('/routes/events.js register Data: ' + JSON.stringify(data))

      const response = await EventServiceInstance.register(data)
      console.log(JSON.stringify(response))
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  // Update Endpoint
  router.put('/:eventID', async (req, res, next) => {
    try {
      const { eventID } = req.params
      const data = req.body

      console.log(
        `/routes/events.js update Data: ${JSON.stringify({
          eventID,
          ...data,
        })}`
      )

      const response = await EventServiceInstance.update(eventID, data)
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  // Delete Endpoint
  router.delete('/:eventID', async (req, res, next) => {
    try {
      const { eventID } = req.params

      console.log(
        `/routes/events.js delete Data: ${JSON.stringify({ eventID })}`
      )

      const response = await EventServiceInstance.delete(eventID)
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  // Fetch all events
  router.get('/', async (req, res, next) => {
    try {
      console.log('/routes/events.js fetchEvents called')

      const response = await EventServiceInstance.fetchEvents()
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  // Update event category
  router.patch('/:eventID/category', async (req, res, next) => {
    try {
      const { eventID } = req.params
      const { newCategoryId } = req.body

      console.log(eventID)

      console.log(
        `/routes/events.js updateEventCategory Data: ${JSON.stringify({
          eventID,
          newCategoryId,
        })}`
      )

      const response = await EventServiceInstance.updateCategory(
        eventID,
        newCategoryId
      )
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  // Fetch specific event by eventID and token
  router.get('/:eventID', async (req, res, next) => {
    try {
      const { eventID } = req.params
      const { token } = req.query // Token kommt als Query-Parameter

      console.log(
        `/routes/events.js fetchEvent called for eventID: ${eventID} with token: ${token}`
      )

      // Rufe Event basierend auf eventID und token ab
      const response = await EventServiceInstance.fetchEvent(eventID, token)
      console.log('In routes/fetchEvent' + JSON.stringify(response))
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })
}
