import createError from 'http-errors'
import UserModel from '../models/user.js'

const UserModelInstance = new UserModel()

export default class UserService {

  async getByUsername(data) {
    const { username } = data

    try {
      // Check if user already exists
      const user = await UserModelInstance.findOneByUsername(username)

      // If user doesn't exist, reject
      if (!user) {
        throw createError(404, 'User record not found')
      }

      return user
    } catch (err) {
      throw err
    }
  }

  async update(data) {
    try {
      // Check if user already exists
      const user = await UserModelInstance.update(data)

      return user
    } catch (err) {
      throw err
    }
  }
}
