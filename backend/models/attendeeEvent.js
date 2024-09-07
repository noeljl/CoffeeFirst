import { query } from '../db/index.js'
import pgPromise from 'pg-promise'

const pgp = pgPromise({ capSQL: true }) // npm install pg-promise

class AttendeeEventModel {
  async fetchAttendeesForEvent(eventID) {
    try {
      const statement = `SELECT ae.*, a."firstName", a."middleName", a."lastName", a."attendee_category"
                         FROM "attendeeevent" ae
                         JOIN "attendees" a ON ae."attendee_id" = a."attendee_id"
                         WHERE ae."event_id" = $1
                         ORDER BY a."lastName", a."firstName"`
      const values = [eventID]
      const result = await query(statement, values)

      return result.rows?.length ? result.rows : []
    } catch (err) {
      throw new Error(
        `Error fetching attendees for event ${eventID}: ${err.message}`
      )
    }
  }

  async updateTimesAttended(eventID, attendeeId, incrementBy) {
    try {
      const statement = `UPDATE "attendeeevent"
                         SET "times_attended" = "times_attended" + $1
                         WHERE "event_id" = $2 AND "attendee_id" = $3
                         RETURNING *`
      const values = [incrementBy, eventID, attendeeId]
      const result = await query(statement, values)

      return result.rows?.length ? result.rows[0] : null
    } catch (err) {
      throw new Error(
        `Error updating times attended for attendee ${attendeeId} at event ${eventID}: ${err.message}`
      )
    }
  }

  async registerAttendeeForEvent(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, 'attendeeevent') + ' RETURNING *'
      const result = await query(statement)

      return result.rows?.length ? result.rows[0] : null
    } catch (err) {
      throw new Error(`Error registering attendee for event: ${err.message}`)
    }
  }

  async removeAttendeeFromEvent(eventID, attendeeId) {
    try {
      const statement = `DELETE FROM "attendeeevent"
                         WHERE "event_id" = $1 AND "attendee_id" = $2
                         RETURNING *`
      const values = [eventID, attendeeId]
      const result = await query(statement, values)

      return result.rows?.length ? result.rows[0] : null
    } catch (err) {
      throw new Error(
        `Error removing attendee ${attendeeId} from event ${eventID}: ${err.message}`
      )
    }
  }

  async fetchTotalAttendanceForEvent() {
    try {
      const statement = `SELECT a."attendee_id", a."firstName", a."middleName", a."lastName", 
                              a."attendee_category",  -- Hier wird die Kategorie erfasst
                              SUM(ae."times_attended") as "total_times_attended"
                       FROM "attendeeevent" ae
                       JOIN "attendees" a ON ae."attendee_id" = a."attendee_id"
                       GROUP BY a."attendee_id", a."firstName", a."middleName", a."lastName", a."attendee_category"  -- "attendee_category" zur GROUP BY-Klausel hinzufügen
                       ORDER BY "total_times_attended" DESC`
      const result = await query(statement)

      return result.rows?.length ? result.rows : []
    } catch (err) {
      throw new Error(`Error fetching total attendance: ${err.message}`)
    }
  }
}

export default AttendeeEventModel
