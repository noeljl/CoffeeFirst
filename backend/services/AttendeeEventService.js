import AttendeeEventModel from '../models/attendeeEvent.js'

class AttendeeEventService {
  constructor() {
    this.attendeeEventModel = new AttendeeEventModel()
  }

  async fetchAttendeesForEvent(eventID) {
    try {
      const attendees = await this.attendeeEventModel.fetchAttendeesForEvent(
        eventID
      )
      return attendees
    } catch (err) {
      throw new Error(
        `Error fetching attendees for event ${eventID}: ${err.message}`
      )
    }
  }

  async updateAttendeesForEvent(eventID, attendeeId, incrementBy) {
    try {
      const attendeeEvent = await this.attendeeEventModel.updateTimesAttended(
        eventID,
        attendeeId,
        incrementBy
      )

      if (!attendeeEvent) {
        throw new Error('Attendee or Event not found')
      }

      return attendeeEvent
    } catch (err) {
      throw new Error(
        `Error updating attendee ${attendeeId} for event ${eventID}: ${err.message}`
      )
    }
  }

  async registerAttendeeForEvent(data) {
    try {
      const attendeeEvent =
        await this.attendeeEventModel.registerAttendeeForEvent(data)
      return attendeeEvent
    } catch (err) {
      throw new Error(`Error registering attendee for event: ${err.message}`)
    }
  }

  async removeAttendeeFromEvent(eventID, attendeeId) {
    try {
      const attendeeEvent =
        await this.attendeeEventModel.removeAttendeeFromEvent(
          eventID,
          attendeeId
        )

      if (!attendeeEvent) {
        throw new Error('Attendee or Event not found')
      }

      return attendeeEvent
    } catch (err) {
      throw new Error(
        `Error removing attendee ${attendeeId} from event ${eventID}: ${err.message}`
      )
    }
  }

  // New method to fetch total attendance for all attendees across all events
  async fetchTotalAttendanceForAllEvents() {
    try {
      const totalAttendance =
        await this.attendeeEventModel.fetchTotalAttendanceForEvent()
      return totalAttendance
    } catch (err) {
      throw new Error(
        `Error fetching total attendance across all events: ${err.message}`
      )
    }
  }
}

export default AttendeeEventService
