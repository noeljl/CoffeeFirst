// Orientierngsfile
import { query } from '../db/index.js'
import pgPromise from 'pg-promise'
const pgp = pgPromise({ capSQL: true }) // npm install pg-promise

class AttendeeModel {
  /**
   * Creates a new user record
   * @param  {Object}      data [User data]
   * @return {Object|null}      [Created user record]
   */
  async register(data) {
    try {
      // Generate SQL statement - using helper for dynamic parameter injection
      const statement =
        pgp.helpers.insert(data, null, 'attendees') + 'RETURNING *'

      // Execute SQL statment
      const result = await query(statement)

      if (result.rows?.length) {
        return result.rows[0]
      }

      return result
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOneByFullName(data) {
  try {
    console.log('models/findOneByFullName ' + JSON.stringify(data));
    const { firstName, middleName, lastName } = data;

    // Korrigiertes SQL-Statement
    const statement = `SELECT *
                       FROM "attendees"
                       WHERE "firstName" = $1
                       AND "middleName" = $2
                       AND "lastName" = $3`;

    const values = [firstName, middleName, lastName];

    // Führe die SQL-Abfrage aus
    const result = await query(statement, values);

    // Überprüfe, ob ein Ergebnis vorliegt
    if (result.rows?.length) {
      return result.rows[0];
    }

    return null; // oder eine andere Rückgabe im Fehlerfall
  } catch (err) {
    throw new Error(err);
  }
}
}

export default AttendeeModel
