import createError from 'http-errors'
import EventModel from '../models/event.js'

const EventModelInstance = new EventModel()

export default class EventService {
  async register(data) {
    try {
      console.log('services/EventService Empfangen ' + JSON.stringify(data))

      // Check if event already exists
      const event = await EventModelInstance.findOneByNameAndDate(data)
      console.log('services/EventService Data ' + JSON.stringify(event))

      // If event already exists, reject
      if (event) {
        throw createError(409, 'Event already exists')
      }

      // Event doesn't exist, create new event record
      return await EventModelInstance.register(data)
    } catch (err) {
      throw createError(500, err)
    }
  }

  async update(eventID, data) {
    try {
      console.log(`services/EventService Update für Event ID ${eventID}`)

      // Find the event by ID
      const event = await EventModelInstance.findOneById(eventID)

      // If the event doesn't exist, throw an error
      if (!event) {
        throw createError(404, 'Event not found')
      }

      // Update the event data
      return await EventModelInstance.update(eventID, data)
    } catch (err) {
      throw createError(500, err)
    }
  }

  async delete(eventID) {
    try {
      console.log(`services/EventService Löschen für Event ID ${eventID}`)

      // Find the event by ID
      const event = await EventModelInstance.findOneById(eventID)

      // If the event doesn't exist, throw an error
      if (!event) {
        throw createError(404, 'Event not found')
      }

      // Delete the event
      return await EventModelInstance.delete(eventID)
    } catch (err) {
      throw createError(500, err)
    }
  }

  async fetchEvents() {
    try {
      console.log('services/EventService fetchEvents aufgerufen')

      // Fetch all events from the database
      return await EventModelInstance.findAll()
    } catch (err) {
      throw createError(500, err)
    }
  }

  // Neue Methode zum Aktualisieren der Event-Kategorie
  async updateCategory(eventID, newCategoryId) {
    try {
      console.log(
        `services/EventService updateCategory für Event ID ${eventID}, Neue Kategorie: ${newCategoryId}`
      )

      // Find the event by ID
      const event = await EventModelInstance.findOneById(eventID)

      // If the event doesn't exist, throw an error
      if (!event) {
        throw createError(404, 'Event not found')
      }

      // Update the event category
      return await EventModelInstance.update(eventID, {
        categoryId: newCategoryId,
      })
    } catch (err) {
      throw createError(500, err)
    }
  }

  async fetchEvent(eventID, token) {
    try {
      console.log(
        `services/EventService fetchEvent für Event ID ${eventID} mit Token ${token}`
      )

      // Suche das Event anhand der eventID in der Datenbank
      const event = await EventModelInstance.findOneByIdAndToken(eventID, token)

      console.log('In /services/EventService/' + JSON.stringify(event))

      // Wenn das Event nicht existiert, Fehler werfen
      if (!event) {
        throw createError(404, 'Event not found')
      }

      // Wenn ein Token vorhanden ist, führe ggf. zusätzliche Validierung durch
      if (token) {
        // Beispiel: Prüfe, ob das Token mit dem Event übereinstimmt
        if (event.event_token !== token) {
          throw createError(403, 'Invalid token for this event')
        }
      }

      // Event erfolgreich gefunden, zurückgeben
      return event
    } catch (err) {
      throw createError(500, err)
    }
  }
}
