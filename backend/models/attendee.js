// Orientierngsfile
import { query } from '../db/index.js'
import pgPromise from 'pg-promise'

const pgp = pgPromise({ capSQL: true }) // npm install pg-promise

class AttendeeModel {
  /**
   * Creates a new attendee record
   * @param  {Object}      data [Attendee data]
   * @return {Object|null}      [Created attendee record]
   */
  async register(data) {
    try {
      // Generate SQL statement - using helper for dynamic parameter injection
      const statement =
        pgp.helpers.insert(data, null, 'attendees') + ' RETURNING *'

      // Execute SQL statement
      const result = await query(statement)

      if (result.rows?.length) {
        return result.rows[0]
      }

      return result
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Finds an attendee by full name
   * @param  {Object}      data [Attendee data with firstName, middleName, lastName]
   * @return {Object|null}      [Found attendee record or null]
   */
  async findOneByFullName(data) {
    try {
      console.log('models/findOneByFullName ' + JSON.stringify(data))
      const { firstName, middleName, lastName } = data

      // SQL statement to find attendee by full name
      const statement = `SELECT *
                         FROM "attendees"
                         WHERE "firstName" = $1
                         AND "middleName" = $2
                         AND "lastName" = $3`

      const values = [firstName, middleName, lastName]

      // Execute SQL statement
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
      // SQL statement to find attendee by full name
      const statement = `SELECT *
                         FROM "attendees"
                         WHERE "id" = $1`

      const values = [id]

      // Execute SQL statement
      const result = await query(statement, values)

      if (result.rows?.length) {
        return result.rows[0]
      }

      return null
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Updates an attendee record by ID
   * @param  {Number} id   [Attendee ID]
   * @param  {Object} data [Updated attendee data]
   * @return {Object|null} [Updated attendee record or null]
   */
  async update(id, data) {
    try {
      // Generate the SET clause dynamically
      const condition = pgp.as.format(' WHERE id = $1 RETURNING *', [id])
      const statement = pgp.helpers.update(data, null, 'attendees') + condition

      // Execute SQL statement
      const result = await query(statement)

      if (result.rows?.length) {
        return result.rows[0]
      }

      return null
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Deletes an attendee record by ID
   * @param  {Number} id [Attendee ID]
   * @return {Object|null} [Deleted attendee record or null]
   */
  async delete(id) {
    try {
      // SQL statement to delete attendee by ID
      const statement = `DELETE FROM "attendees" WHERE id = $1 RETURNING *`
      const values = [id]

      // Execute SQL statement
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
      // SQL statement to fetch all attendees
      const statement = `SELECT * FROM "attendees" ORDER BY "lastName", "firstName"`

      // Execute SQL statement
      const result = await query(statement)

      if (result.rows?.length) {
        return result.rows
      }

      return []
    } catch (err) {
      throw new Error(err)
    }
  }

  async update(id, data) {
    try {
      const condition = pgp.as.format(' WHERE id = $1 RETURNING *', [id])
      const statement = pgp.helpers.update(data, null, 'attendees') + condition

      const result = await query(statement)

      if (result.rows?.length) {
        return result.rows[0]
      }

      return null
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default AttendeeModel
