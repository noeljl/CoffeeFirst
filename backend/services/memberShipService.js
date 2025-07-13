// MembershipService.js
import createError from 'http-errors'
import MembershipModel from '../models/membership.js'
import MembersModel from '../models/member.js'
import Stripe from 'stripe'
import { STRIPE_SECRET_KEY } from '../config.js'
const stripe = new Stripe(STRIPE_SECRET_KEY)

class MembershipService {
  constructor() {
    this.membershipModel = MembershipModel // MembershipModel is already an instance
    this.memberModel = new MembersModel() // Create an instance of MembersModel
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
   * Retrieves a membership by the associated member's UUID or ObjectId.
   * @param {string} memberId - The UUID or ObjectId of the member.
   * @returns {Promise<Document>} The membership document.
   * @throws {HttpError} If the membership is not found for the member or a server error occurs.
   */
  async getMembershipByMemberId(memberId) {
    try {
      // 1) Try to find member by UUID first, then by ObjectId
      let member = null
      try {
        member = await this.memberModel.findOneById(memberId)
      } catch (error) {
        // If UUID search fails, try ObjectId search
        console.log('UUID search failed, trying ObjectId search for:', memberId)
        const mongoose = await import('mongoose')
        if (mongoose.Types.ObjectId.isValid(memberId)) {
          // Import the Member model directly from mongoose
          const { default: mongoose } = await import('mongoose')
          const Member = mongoose.model('Member')
          member = await Member.findOne({ _id: memberId })
            .populate('memberCard')
            .exec()
        }
      }

      if (!member) throw createError(404, 'Member not found')

      // 2) Check if member has a membership reference
      if (!member.membership) {
        throw createError(404, 'Member has no membership assigned')
      }

      // 3) Try to find membership by the member's ObjectId first
      console.log('memberId', memberId)
      console.log('member._id', member._id)
      let membership = await this.membershipModel.findByMemberId(
        member._id.toString()
      )

      // 4) If not found by ObjectId, try to find by the membership ID from member document
      if (!membership) {
        console.log('Trying to find membership by ID:', member.membership)
        membership = await this.membershipModel.findById(member.membership)
      }

      if (!membership) {
        throw createError(404, 'Membership not found for this member')
      }

      return membership
    } catch (error) {
      console.error(`Error in getMembershipByMemberId: ${error.message}`)
      if (error.statusCode) throw error // Re-throw http-errors
      throw createError(500, `Failed to retrieve membership: ${error.message}`)
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

  async cancelMembership(membershipId, subscriptionId) {
    try {
      // 1. Update MongoDB
      const membership = await this.membershipModel.update(membershipId, {
        renewalAfterExpiration: false,
      })

      // 2. Update Stripe subscription
      if (subscriptionId) {
        await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true,
        })
      }

      return membership
    } catch (error) {
      console.error(`Error in cancelMembership: ${error.message}`)
      throw createError(500, `Failed to cancel membership: ${error.message}`)
    }
  }

  async resumeMembership(membershipId, subscriptionId) {
    try {
      // 1. Update MongoDB
      const membership = await this.membershipModel.update(membershipId, {
        renewalAfterExpiration: true,
      })

      // 2. Update Stripe subscription
      if (subscriptionId) {
        await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: false,
        })
      }

      return membership
    } catch (error) {
      console.error(`Error in resumeMembership: ${error.message}`)
      throw createError(500, `Failed to resume membership: ${error.message}`)
    }
  }
}

export default MembershipService
