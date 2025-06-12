import createError from 'http-errors'
import MembersModel from '../models/members.js'
import bcrypt from 'bcrypt'

const MembersModelInstance = new MembersModel()

class AuthService {
  async register({ email, password, ...other }) {
    // 1. Passwort hashen
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // 2. Neuen Member anlegen – hier müssen username & passwordHash mit rein
    const newMember = await MembersModelInstance.create({
      email, // falls Du E-Mail separat speicherst
      passwordHash, // der gehashte Passwort-String
      ...other, // z.B. firstName, lastName, agreedToNewsLetter, etc.
    })

    return newMember
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
