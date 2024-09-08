import express from 'express'
import AttendeeEventService from '../services/AttendeeEventService.js'

const router = express.Router()
const AttendeeEventServiceInstance = new AttendeeEventService()

export default (app) => {
  // Base path is /api/events
  app.use('/api/attendeeEvents', router)

  // Fetch attendees for a specific event
  router.get('/:eventID/attendees', async (req, res, next) => {
    try {
      const { eventID } = req.params
      console.log(
        `/routes/attendeeEvent.js fetchAttendeesForEvent called for eventID: ${eventID}`
      )

      const response =
        await AttendeeEventServiceInstance.fetchAttendeesForEvent(eventID)
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  // Update times attended for an attendee at a specific event
  router.put('/:eventID/attendees/:attendeeId', async (req, res, next) => {
    try {
      const { eventID, attendeeId } = req.params
      const { incrementBy } = req.body

      console.log('Hier times 4')
      console.log(eventID)
      console.log(attendeeId)
      console.log(incrementBy)

      console.log(
        `/routes/attendeeEvent.js updateAttendeesForEvent called with data: ${JSON.stringify(
          {
            eventID,
            attendeeId,
            incrementBy,
          }
        )}`
      )

      const response =
        await AttendeeEventServiceInstance.updateAttendeesForEvent(
          eventID,
          attendeeId,
          incrementBy
        )
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  // New route to fetch total attendance across all events
  router.get('/total-attendance', async (req, res, next) => {
    try {
      console.log(
        `/routes/attendeeEvent.js fetchTotalAttendanceForEvent called`
      )

      const response =
        await AttendeeEventServiceInstance.fetchTotalAttendanceForAllEvents()
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })
}
