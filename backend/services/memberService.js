// MemberService.js
import createError from 'http-errors'
import { MembersModel } from '../models/member.js' // Assuming MembersModel is in a file named membersModel.js

class MemberService {
  constructor() {
    this.membersModel = new MembersModel()
  }

  async findMemberByID(id) {
    try {
      const member = await this.membersModel.findOneById(id)
      return member
    } catch (error) {
      console.error(`Error in findMemberByID: ${error.message}`)
      throw createError(500, `Failed to find member: ${error.message}`)
    }
  }

  async getMemberByMail(mail) {
    try {
      console.log('die mail ist ' + mail)
      const member = await this.membersModel.findOneByEmail(mail)
      if (!member) {
        throw createError(404, 'Member not found')
      }
      return member
    } catch (error) {
      console.error(`Error in getMemberById: ${error.message}`)
      if (error.statusCode) throw error // Re-throw http-errors
      throw createError(500, `Failed to retrieve member: ${error.message}`)
    }
  }

  async update({ id, ...data }) {
    try {
      return await this.membersModel.update(id, data)
    } catch (error) {
      console.error(`Error in updateMemberProfile: ${error.message}`)
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      if (
        error.message.includes('Validation error') ||
        error.message.includes('Duplicate value')
      ) {
        throw createError(400, error.message)
      }
      throw createError(
        500,
        `Failed to update member profile: ${error.message}`
      )
    }
  }

  async updateMemberByID(id, data) {
    try {
      return await this.membersModel.update(id, data)
    } catch (error) {
      console.error(`Error in updateMemberByID: ${error.message}`)
    }
  }

  async deleteMember(memberId) {
    try {
      const member = await this.membersModel.delete(memberId)
      return { message: `Member with ID ${member.id} successfully deleted.` }
    } catch (error) {
      console.error(`Error in deleteMember: ${error.message}`)
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      throw createError(500, `Failed to delete member: ${error.message}`)
    }
  }

  async addCoffeeShop(memberId, coffeeShopId, listType) {
    try {
      const member = await this.membersModel.addCoffeeShopToList(
        memberId,
        coffeeShopId,
        listType
      )
      return member
    } catch (error) {
      console.error(`Error in addCoffeeShop to ${listType}: ${error.message}`)
      if (error.message.includes('Invalid list type')) {
        throw createError(400, error.message)
      }
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      throw createError(
        500,
        `Failed to add coffee shop to ${listType}: ${error.message}`
      )
    }
  }

  async removeCoffeeShop(memberId, coffeeShopId, listType) {
    try {
      const member = await this.membersModel.removeCoffeeShopFromList(
        memberId,
        coffeeShopId,
        listType
      )
      return member
    } catch (error) {
      console.error(
        `Error in removeCoffeeShop from ${listType}: ${error.message}`
      )
      if (error.message.includes('Invalid list type')) {
        throw createError(400, error.message)
      }
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      throw createError(
        500,
        `Failed to remove coffee shop from ${listType}: ${error.message}`
      )
    }
  }

  // You can add more member-specific methods here if needed,
  // e.g., handling password changes (which might involve the AuthService),
  // managing payment status, etc.
}

export default MemberService
