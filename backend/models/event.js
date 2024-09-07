import { query } from '../db/index.js'
import pgPromise from 'pg-promise'
import crypto from 'crypto'

import QRCodeModel from './qrCode.js'

const QRCodeModelInstance = new QRCodeModel()

const pgp = pgPromise({ capSQL: true }) // npm install pg-promise

class EventModel {
  async register(data) {
    try {
      const formattedEventDate = data.event_date
        .split('T')[0]
        .split('-')
        .reverse()
        .join('.')

      data.event_name = `${data.event_name} am ${formattedEventDate}`
      data.event_date = formattedEventDate

      const eventToken = crypto.randomBytes(16).toString('hex')
      data.event_token = eventToken

      const statement =
        pgp.helpers.insert(data, null, 'events') + ' RETURNING *'

      const result = await query(statement)

      if (result.rows?.length) {
        const event = result.rows[0]
        await QRCodeModelInstance.generateQRCode(
          event.event_id,
          event.event_token
        )

        const attendeesResult = await query(
          `SELECT attendee_id FROM "attendees"`
        )

        if (attendeesResult.rows?.length) {
          const attendees = attendeesResult.rows

          const currentDate = new Date()
            .toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })
            .split('.')
            .join('.')

          const attendeeEventsData = attendees.map((attendee) => ({
            attendee_id: attendee.attendee_id,
            event_id: event.event_id,
            registration_date: currentDate,
            times_attended: 0,
          }))

          const attendeeEventsStatement = pgp.helpers.insert(
            attendeeEventsData,
            ['attendee_id', 'event_id', 'registration_date', 'times_attended'],
            'attendeeevent'
          )

          await query(attendeeEventsStatement)
        }

        return event
      }

      return null
    } catch (err) {
      throw new Error('Fehler bei der Registrierung des Events: ' + err)
    }
  }

  async findOneByNameAndDate(data) {
    try {
      const { eventName, eventDate } = data

      const statement = `SELECT * FROM "events" WHERE "event_name" = $1 AND "event_date" = $2`
      const values = [eventName, eventDate]

      const result = await query(statement, values)

      if (result.rows?.length) {
        return result.rows[0]
      }

      return null
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOneById(id) {
    try {
      const statement = `SELECT * FROM "events" WHERE "event_id" = $1`
      const values = [id]

      const result = await query(statement, values)

      if (result.rows?.length) {
        return result.rows[0]
      }

      return null
    } catch (err) {
      throw new Error(err)
    }
  }

  // Neue Methode: Find event by ID and token
  async findOneByIdAndToken(eventID, token) {
    try {
     const eventIDparsed = parseInt(eventID, 10) // Convert eventID to integer
     console.log(eventIDparsed)

      // SQL-Abfrage, um das Event anhand der eventID abzurufen
      const statement = `SELECT * FROM "events" WHERE "event_id" = $1 AND "event_token" = $2`
      const values = [eventIDparsed, token]

      const result = await query(statement, values)

      if (result.rows?.length) {
        return result.rows[0]
      }

      return null
    } catch (err) {
      throw new Error('Fehler beim Abrufen des Events: ' + err)
    }
  }

  async update(id, data) {
    try {
      const condition = pgp.as.format(' WHERE attendee_id = $1 RETURNING *', [
        id,
      ])
      const statement = pgp.helpers.update(data, null, 'events') + condition

      const result = await query(statement)

      if (result.rows?.length) {
        return result.rows[0]
      }

      return null
    } catch (err) {
      throw new Error(err)
    }
  }

  async delete(id) {
    try {
      const statement = `DELETE FROM "events" WHERE event_id = $1 RETURNING *`
      const values = [id]

      const result = await query(statement, values)

      if (result.rows?.length) {
        return result.rows[0]
      }

      return null
    } catch (err) {
      throw new Error(err)
    }
  }

  async findAll() {
    try {
      const statement = `SELECT * FROM "events" ORDER BY "event_date", "event_name"`

      const result = await query(statement)

      if (result.rows?.length) {
        return result.rows
      }

      return []
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default EventModel
