// MemberService.js
import createError from 'http-errors'
import { MembersModel } from '../models/member.js' // Assuming MembersModel is in a file named membersModel.js
import bcrypt from 'bcrypt'

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
    console.log(
      'updateMemberProfile called with id ' + id + ' and data ' + data
    )
    try {
      return await this.membersModel.updateMemberByID(id, data)
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
      return await this.membersModel.updateMemberByID(id, data)
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

  async changePassword(memberId, currentPlain, newPlain) {
    const member = await this.membersModel.findOneById(memberId)
    if (!member) throw createError(404, 'Member not found')

    // a) altes Passwort prüfen
    const ok = await bcrypt.compare(currentPlain, member.passwordHash)
    if (!ok) throw createError(403, 'Aktuelles Passwort ist falsch')

    // b) neues Passwort hashen (gleiche Kosten wie beim Register)
    const newHash = await bcrypt.hash(newPlain, 10) // vgl. AuthService.register :contentReference[oaicite:1]{index=1}
    member.passwordHash = newHash
    await member.save()
    return { id: member.id }
  }

  async getList(memberId, listType) {
    try {
      const member = await this.membersModel.findOneById(memberId)
      if (listType === 'wishlist') {
        return member.wishlistCoffeeShops // <== already populated café documents
      } else if (listType === 'favorites') {
        return member.favoriteCoffeeShops // <== already populated café documents
      } else {
        throw createError(400, 'Invalid list type')
      }
    } catch (error) {
      console.error(`Error in getWishlist: ${error.message}`)
      throw createError(500, `Failed to fetch wishlist: ${error.message}`)
    }
  }

  // You can add more member-specific methods here if needed,
  // e.g., handling password changes (which might involve the AuthService),
  // managing payment status, etc.
}

export default MemberService
