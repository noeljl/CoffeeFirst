import createError from 'http-errors'
import MembersModel from '../models/members.js'
import bcrypt from 'bcrypt'

const MembersModelInstance = new MembersModel()

class AuthService {
  async register(input) {
    // 1. Passwort extrahieren und hashen
    const { password, ...fields } = input
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // 2. Payload zusammenbauen: alle anderen Felder + passwordHash
    //    (das Feld `password` bleibt außen vor)
    const payload = {
      ...fields, // z.B. username, vorname, nachname, whatever
      email: fields.email, // falls email nicht in fields, kann man sie hier mappen
      passwordHash, // gehashter string
    }

    console.log('Register payload:', payload)
    // Ausgabe aller mitgegebenen Felder (ohne raw password)

    // 3. Datensatz anlegen
    const newMember = await MembersModelInstance.create(payload)

    // 4. Optional: alle gespeicherten Werte (inkl. defaults) zurückgeben
    //    .toJSON() gibt dir ein reines Objekt ohne Sequelize-Instanz-Methoden
    return newMember.toJSON()
  }

  async loginMember(data) {
    const { email, password } = data // Sollte email sein
    const member = await MembersModelInstance.findOneByMail(email)
    if (!member) {
      throw createError(401, 'Incorrect username or password')
    }

    // Hier geschieht der eigentliche Vergleich
    const isMatch = await bcrypt.compare(password, member.passwordHash) // Punkt 3: Korrekter Passwortvergleich
    if (!isMatch) {
      throw createError(401, 'Incorrect username or password')
    }

    return member // Punkt 4: Gibt Mitglied zurück, aber kein Token
  }

  async googleLogin(profile) {
    const { id, displayName } = profile

    try {
      const member = await MembersModelInstance.findOneByGoogleId(id)

      if (!member) {
        return await MembersModelInstance.create({
          google: { id, displayName },
        })
      }

      return member
    } catch (err) {
      throw createError(500, err)
    }
  }

  async facebookLogin(profile) {
    const { id, displayName } = profile

    try {
      const member = await MembersModelInstance.findOneByFacebookId(id)

      if (!member) {
        return await MembersModelInstance.create({
          facebook: { id, displayName },
        })
      }

      return member
    } catch (err) {
      throw createError(500, err)
    }
  }
}

export default AuthService
