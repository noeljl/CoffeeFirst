// MembershipService.js
import createError from 'http-errors'
import MembershipModel from '../models/membershipModel.js' // Assuming MembershipModel is in a file named membershipModel.js

class MembershipService {
  constructor() {
    this.membershipModel = MembershipModel // MembershipModel is already an instance
  }

  /**
   * Retrieves a membership by its ID.
   * @param {string} membershipId - The ID of the membership.
   * @returns {Promise<Document>} The membership document.
   * @throws {HttpError} If the membership is not found or a server error occurs.
   */
  async getMembershipById(membershipId) {
    try {
      const membership = await this.membershipModel.findById(membershipId)
      if (!membership) {
        throw createError(404, 'Membership not found')
      }
      return membership
    } catch (error) {
      console.error(`Error in getMembershipById: ${error.message}`)
      if (error.statusCode) throw error // Re-throw http-errors
      throw createError(500, `Failed to retrieve membership: ${error.message}`)
    }
  }

  /**
   * Retrieves a membership by the associated member's ID.
   * @param {string} memberId - The ID of the member.
   * @returns {Promise<Document>} The membership document.
   * @throws {HttpError} If the membership is not found for the member or a server error occurs.
   */
  async getMembershipByMemberId(memberId) {
    try {
      const membership = await this.membershipModel.findByMemberId(memberId)
      if (!membership) {
        throw createError(404, 'Membership not found for this member')
      }
      return membership
    } catch (error) {
      console.error(`Error in getMembershipByMemberId: ${error.message}`)
      if (error.statusCode) throw error // Re-throw http-errors
      throw createError(
        500,
        `Failed to retrieve membership by member ID: ${error.message}`
      )
    }
  }

  /**
   * Updates an existing membership.
   * @param {string} membershipId - The ID of the membership to update.
   * @param {Object} updateData - The data to update.
   * @returns {Promise<Document>} The updated membership document.
   * @throws {HttpError} If the membership is not found, validation fails, or a server error occurs.
   */
  async updateMembership(membershipId, updateData) {
    try {
      const membership = await this.membershipModel.update(
        membershipId,
        updateData
      )
      return membership
    } catch (error) {
      console.error(`Error in updateMembership: ${error.message}`)
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      if (
        error.message.includes('Validation error') ||
        error.message.includes('duplicate value')
      ) {
        throw createError(400, error.message)
      }
      throw createError(500, `Failed to update membership: ${error.message}`)
    }
  }

  /**
   * Deletes a membership by its ID.
   * @param {string} membershipId - The ID of the membership to delete.
   * @returns {Promise<Object>} A success message.
   * @throws {HttpError} If the membership is not found or a server error occurs.
   */
  async deleteMembership(membershipId) {
    try {
      const membership = await this.membershipModel.delete(membershipId)
      return {
        message: `Membership with ID ${membership.id} successfully deleted.`,
      }
    } catch (error) {
      console.error(`Error in deleteMembership: ${error.message}`)
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      throw createError(500, `Failed to delete membership: ${error.message}`)
    }
  }

  /**
   * Decrements the coffee quota for a given membership.
   * @param {string} membershipId - The ID of the membership.
   * @param {number} [amount=1] - The amount to decrement the quota by.
   * @returns {Promise<Document>} The updated membership document.
   * @throws {HttpError} If the membership is not found, amount is invalid, or quota is insufficient.
   */
  async decrementCoffeeQuota(membershipId, amount = 1) {
    try {
      const membership = await this.membershipModel.decrementCoffeeQuota(
        membershipId,
        amount
      )
      return membership
    } catch (error) {
      console.error(`Error in decrementCoffeeQuota: ${error.message}`)
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      if (
        error.message.includes('amount must be positive') ||
        error.message.includes('Not enough coffee quota')
      ) {
        throw createError(400, error.message)
      }
      throw createError(
        500,
        `Failed to decrement coffee quota: ${error.message}`
      )
    }
  }

  /**
   * Increments the coffee quota for a given membership.
   * @param {string} membershipId - The ID of the membership.
   * @param {number} [amount=1] - The amount to increment the quota by.
   * @returns {Promise<Document>} The updated membership document.
   * @throws {HttpError} If the membership is not found or amount is invalid.
   */
  async incrementCoffeeQuota(membershipId, amount = 1) {
    try {
      const membership = await this.membershipModel.incrementCoffeeQuota(
        membershipId,
        amount
      )
      return membership
    } catch (error) {
      console.error(`Error in incrementCoffeeQuota: ${error.message}`)
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      if (error.message.includes('amount must be positive')) {
        throw createError(400, error.message)
      }
      throw createError(
        500,
        `Failed to increment coffee quota: ${error.message}`
      )
    }
  }
}

export default MembershipService
