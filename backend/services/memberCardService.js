// MemberCardService.js
import createError from 'http-errors'
import MemberCardModel from '../models/memberCard.js' // Assuming MemberCardModel is in a file named memberCardModel.js

class MemberCardService {
  constructor() {
    this.memberCardModel = MemberCardModel // MemberCardModel is already an instance, no need for new
  }

  /**
   * Retrieves a member card by its ID.
   * @param {string} cardId - The ID of the member card.
   * @returns {Promise<Document>} The member card document.
   * @throws {HttpError} If the card is not found or a server error occurs.
   */
  async getMemberCardById(cardId) {
    try {
      const memberCard = await this.memberCardModel.findById(cardId)
      if (!memberCard) {
        throw createError(404, 'Member card not found')
      }
      return memberCard
    } catch (error) {
      console.error(`Error in getMemberCardById: ${error.message}`)
      if (error.statusCode) throw error // Re-throw http-errors
      throw createError(500, `Failed to retrieve member card: ${error.message}`)
    }
  }

  /**
   * Retrieves a member card by its card code.
   * @param {string} cardCode - The code of the member card.
   * @returns {Promise<Document>} The member card document.
   * @throws {HttpError} If the card is not found or a server error occurs.
   */
  async getMemberCardByCode(cardCode) {
    try {
      const memberCard = await this.memberCardModel.findByCardCode(cardCode)
      if (!memberCard) {
        throw createError(404, 'Member card with this code not found')
      }
      return memberCard
    } catch (error) {
      console.error(`Error in getMemberCardByCode: ${error.message}`)
      if (error.statusCode) throw error // Re-throw http-errors
      throw createError(
        500,
        `Failed to retrieve member card by code: ${error.message}`
      )
    }
  }

  /**
   * Updates an existing member card.
   * @param {string} cardId - The ID of the member card to update.
   * @param {Object} updateData - The data to update.
   * @returns {Promise<Document>} The updated member card document.
   * @throws {HttpError} If the card is not found, validation fails, or a server error occurs.
   */
  async updateMemberCard(cardId, updateData) {
    try {
      const memberCard = await this.memberCardModel.update(cardId, updateData)
      return memberCard
    } catch (error) {
      console.error(`Error in updateMemberCard: ${error.message}`)
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      if (
        error.message.includes('Validation error') ||
        error.message.includes('duplicate value')
      ) {
        throw createError(400, error.message)
      }
      throw createError(500, `Failed to update member card: ${error.message}`)
    }
  }

  /**
   * Deletes a member card by its ID.
   * @param {string} cardId - The ID of the member card to delete.
   * @returns {Promise<Object>} A success message.
   * @throws {HttpError} If the card is not found or a server error occurs.
   */
  async deleteMemberCard(cardId) {
    try {
      const memberCard = await this.memberCardModel.delete(cardId)
      return {
        message: `Member card with ID ${memberCard.id} successfully deleted.`,
      }
    } catch (error) {
      console.error(`Error in deleteMemberCard: ${error.message}`)
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      throw createError(500, `Failed to delete member card: ${error.message}`)
    }
  }
}

export default MemberCardService
