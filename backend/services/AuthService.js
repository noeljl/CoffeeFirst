import createError from 'http-errors'
import UserModel from '../models/user.js'
const UserModelInstance = new UserModel()

// Anpassen
class AuthService {
  async register(data) {
    const { mail } = data

    try {
      // Check if user already exists
      const user = await UserModelInstance.findOneByMail(mail)

      // If user already exists, reject
      if (user) {
        throw createError(409, 'Mail already in use')
      }

      // User doesn't exist, create new user record
      return await UserModelInstance.create(data)
    } catch (err) {
      throw createError(500, err)
    }
  }

  async login(data) {
    const { username, password } = data
    console.log("Daten login services/AuthServices " + username + " " + password)

    try {
      // Check if user exists
      const user = await UserModelInstance.findOneByUsername(username)
      console.log(user)

      // If no user found, reject
      if (!user) {
        throw createError(401, 'Incorrect username or password')
      }

      // Check for matching passwords
      if (user.password !== password) {
        throw createError(401, 'Incorrect username or password')
      }

      return user
    } catch (err) {
      throw createError(500, err)
    }
  }

  // untested
  async googleLogin(profile) {
    const { id, displayName } = profile

    try {
      // Check if user exists
      const user = await UserModelInstance.findOneByGoogleId(id)

      // If no user found, create new user
      if (!user) {
        return await UserModelInstance.create({ google: { id, displayName } })
      }

      // User already exists, return profile
      return user
    } catch (err) {
      throw createError(500, err)
    }
  }

  // untested
  async facebookLogin(profile) {
    const { id, displayName } = profile

    try {
      // Check if user exists
      const user = await UserModelInstance.findOneByFacebookId(id)

      // If no user found, create new user
      if (!user) {
        return await UserModelInstance.create({ facebook: { id, displayName } })
      }

      // User already exists, return profile
      return user
    } catch (err) {
      throw createError(500, err)
    }
  }
}

export default AuthService
