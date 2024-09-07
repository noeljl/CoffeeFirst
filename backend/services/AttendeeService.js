import createError from 'http-errors'
import AttendeeModel from '../models/attendee.js'

const AttendeeModelInstance = new AttendeeModel()

export default class AttendeeService {
  async register(data) {
    try {
      console.log('services/AttendeeService Empfangen ' + JSON.stringify(data))

      // Check if attendee already exists
      const attendee = await AttendeeModelInstance.findOneByFullName(data)
      console.log('services/AttendeeService Data ' + JSON.stringify(attendee))

      // If attendee already exists, reject
      if (attendee) {
        throw createError(409, 'Attendee already exists')
      }

      // Attendee doesn't exist, create new attendee record
      return await AttendeeModelInstance.register(data)
    } catch (err) {
      throw createError(500, err)
    }
  }

  async update(firstName, middleName, lastName, data) {
    try {
      console.log(
        `services/AttendeeService Update für ${firstName} ${middleName} ${lastName}`
      )

      // Find the attendee by full name
      const attendee = await AttendeeModelInstance.findOneByFullName({
        firstName,
        middleName,
        lastName,
      })

      // If the attendee doesn't exist, throw an error
      if (!attendee) {
        throw createError(404, 'Attendee not found')
      }

      // Update the attendee data
      return await AttendeeModelInstance.update(attendee.attendee_id, data)
    } catch (err) {
      throw createError(500, err)
    }
  }

  async delete(firstName, middleName, lastName) {
    try {
      console.log(
        `services/AttendeeService Löschen für ${firstName} ${middleName} ${lastName}`
      )

      // Find the attendee by full name
      const attendee = await AttendeeModelInstance.findOneByFullName({
        firstName,
        middleName,
        lastName,
      })

      // If the attendee doesn't exist, throw an error
      if (!attendee) {
        throw createError(404, 'Attendee not found')
      }

      // Delete the attendee
      return await AttendeeModelInstance.delete(attendee.id)
    } catch (err) {
      throw createError(500, err)
    }
  }

  async fetchAttendees() {
    try {
      console.log('services/AttendeeService fetchAttendees aufgerufen')
      console.log('hier auch')

      // Fetch all attendees from the database
      const result = await AttendeeModelInstance.findAll()
      return result
    } catch (err) {
      throw createError(500, err)
    }
  }

  async updateTimesAttended(attendeeId, incrementBy) {
    try {
      console.log(
        `services/AttendeeService updateTimesAttended für ID ${attendeeId}, Increment By: ${incrementBy}`
      )

      // Finde den Teilnehmer anhand der ID
      const attendee = await AttendeeModelInstance.findOneById(attendeeId)

      // Wenn der Teilnehmer nicht existiert, Fehler auslösen
      if (!attendee) {
        throw createError(404, 'Attendee not found')
      }

      // Aktualisiere die Anwesenheitszeiten
      const updatedTimesAttended = attendee.timesAttended + incrementBy

      // Speichere die aktualisierte Anwesenheitszeit
      return await AttendeeModelInstance.update(attendeeId, {
        timesAttended: updatedTimesAttended,
      })
    } catch (err) {
      throw createError(500, err)
    }
  }
}
