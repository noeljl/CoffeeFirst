import createError from 'http-errors'
import AttendeeModel from '../models/attendee.js'

const AttendeeModelInstance = new AttendeeModel()

export default class AttendeeService {
  async register(data) {
    try {
      console.log('services/AttendeeService Empfangen ' + JSON.stringify(data))
      // Check if user already exists
      const attendee = await AttendeeModelInstance.findOneByFullName(data)

      console.log('services/AttendeeService Data ' + JSON.stringify(attendee))

      // If user already exists, reject
      if (attendee) {
        throw createError(409, 'Attendee already exists')
      }

      // User doesn't exist, create new user record
      return await AttendeeModelInstance.register(data)
    } catch (err) {
      throw createError(500, err)
    }
  }
}
