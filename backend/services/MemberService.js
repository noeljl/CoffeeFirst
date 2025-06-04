import createError from 'http-errors'
import MembersModel from '../models/members.js' // Beachte: Pfad ggf. anpassen

const MembersModelInstance = new MembersModel()

export default class MemberService {
  async getByUsername({ username }) {
    try {
      const member = await MembersModelInstance.findOneByUsername(username)

      if (!member) {
        throw createError(404, 'Member not found')
      }

      return member
    } catch (err) {
      throw createError(500, err)
    }
  }

  async update(data) {
    try {
      const updatedMember = await MembersModelInstance.update(data)

      if (!updatedMember) {
        throw createError(404, 'Member not found for update')
      }

      return updatedMember
    } catch (err) {
      throw createError(500, err)
    }
  }
}
