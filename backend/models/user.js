// Orientierngsfile
import { query } from '../db/index.js'
import pgPromise from 'pg-promise'
const pgp = pgPromise({ capSQL: true }) // npm install pg-promise

class UserModel {
  /**
   * Creates a new user record
   * @param  {Object}      data [User data]
   * @return {Object|null}      [Created user record]
   */
  async create(data) {
    try {
      // Generate SQL statement - using helper for dynamic parameter injection
      const statement = pgp.helpers.insert(data, null, 'user') + 'RETURNING *'

      // Execute SQL statment
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
   * Updates a user record
   * @param  {Object}      data [User data]
   * @return {Object|null}      [Updated user record]
   */
  async update(data) {
    try {
      const { id, ...params } = data

      // Generate SQL statement - using helper for dynamic parameter injection
      const condition = pgp.as.format('WHERE id = ${id} RETURNING *', {
        id,
      })
      const statement = pgp.helpers.update(params, null, 'user') + condition

      // Execute SQL statment
      const result = await query(statement)

      if (result.rows?.length) {
        return result.rows[0]
      }

      return null
    } catch (err) {
      throw new Error(err)
    }
  }

  //Es braucht "" um user und mail, sonst funktioniert es nicht.
  async findOneByMail(mail) {
    try {
      // Es ben
      const statement = `SELECT *
                       FROM "user"
                       WHERE "mail" = $1`
      const values = [mail]

      // Führe die SQL-Abfrage aus
      const result = await query(statement, values)

      // Überprüfe, ob ein Ergebnis vorliegt
      if (result.rows?.length) {
        return result.rows[0]
      }

      return null
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOneByUsername(username) {
    try {
      // Es ben
      const statement = `SELECT *
                       FROM "user"
                       WHERE "username" = $1`
      const values = [username]

      // Führe die SQL-Abfrage aus
      const result = await query(statement, values)

      // Überprüfe, ob ein Ergebnis vorliegt
      if (result.rows?.length) {
        return result.rows[0]
      }

      return null
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Finds a user record by ID
   * @param  {String}      id [User ID]
   * @return {Object|null}    [User Record]
   */
  async findOneById(id) {
    try {
      // Generate SQL statement
      const statement = `SELECT *
                         FROM "user"
                         WHERE id = $1`
      const values = [id]

      // Execute SQL statment
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
   * Finds a user record by Google ID
   * @param  {String}      id [Google ID]
   * @return {Object|null}    [User Record]
   */
  async findOneByGoogleId(id) {
    try {
      // Generate SQL statement
      const statement = `SELECT *
                         FROM "user"
                         WHERE google ->> 'id' = $1`
      const values = [id]

      // Execute SQL statment
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
   * Finds a user record by Facebook ID
   * @param  {String}      id [Facebook ID]
   * @return {Object|null}    [User Record]
   */
  async findOneByFacebookId(id) {
    try {
      // Generate SQL statement
      const statement = `SELECT *
                         FROM "user"
                         WHERE facebook ->> 'id' = $1`
      const values = [id]

      // Execute SQL statment
      const result = await query(statement, values)

      if (result.rows?.length) {
        return result.rows[0]
      }

      return null
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteOneByUsername(username) {
    try {
      // Generiere die SQL-Abfrage zum Löschen des Benutzers
      const statement = `DELETE FROM "user"
                       WHERE "username" = $1
                       RETURNING *`
      const values = [username]

      // Führe die SQL-Abfrage aus
      const result = await query(statement, values)

      // Überprüfe, ob ein Benutzer gelöscht wurde
      if (result.rows?.length) {
        return result.rows[0] // Rückgabe des gelöschten Benutzers
      }

      return null // Kein Benutzer gefunden und gelöscht
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default UserModel
