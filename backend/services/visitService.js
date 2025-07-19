import createError from 'http-errors'
import visitModel from '../models/visit.js'

class VisitService {
  constructor() {
    this.visitModel = visitModel
  }

  async createVisit(memberId, coffeeShopId, visitData = {}) {
    try {
      if (!memberId || !coffeeShopId) {
        throw createError(400, 'Member ID and Coffee Shop ID are required')
      }

      const visit = await this.visitModel.createVisit({
        member: memberId,
        coffeeShop: coffeeShopId,
        visitDate: new Date(),
        ...visitData,
      })

      return visit
    } catch (error) {
      if (error.status) throw error
      throw createError(500, `Failed to create visit: ${error.message}`)
    }
  }

  async getMemberVisits(memberId, limit = 50) {
    try {
      if (!memberId) {
        throw createError(400, 'Member ID is required')
      }

      const visits = await this.visitModel.getVisitsByMember(memberId, limit)
      return visits
    } catch (error) {
      if (error.status) throw error
      throw createError(500, `Failed to get member visits: ${error.message}`)
    }
  }

  async getCoffeeShopVisits(coffeeShopId, limit = 50) {
    try {
      if (!coffeeShopId) {
        throw createError(400, 'Coffee Shop ID is required')
      }

      const visits = await this.visitModel.getVisitsByCoffeeShop(
        coffeeShopId,
        limit
      )
      return visits
    } catch (error) {
      if (error.status) throw error
      throw createError(
        500,
        `Failed to get coffee shop visits: ${error.message}`
      )
    }
  }

  async getLastVisit(memberId, coffeeShopId) {
    try {
      if (!memberId || !coffeeShopId) {
        throw createError(400, 'Member ID and Coffee Shop ID are required')
      }

      const visit = await this.visitModel.getLastVisitByMemberAndCoffeeShop(
        memberId,
        coffeeShopId
      )
      return visit
    } catch (error) {
      if (error.status) throw error
      throw createError(500, `Failed to get last visit: ${error.message}`)
    }
  }

  async getVisitStats(memberId) {
    try {
      if (!memberId) {
        throw createError(400, 'Member ID is required')
      }

      const stats = await this.visitModel.getVisitStatsByMember(memberId)
      return stats
    } catch (error) {
      if (error.status) throw error
      throw createError(500, `Failed to get visit stats: ${error.message}`)
    }
  }

  async getRecentVisits(memberId, days = 30) {
    try {
      if (!memberId) {
        throw createError(400, 'Member ID is required')
      }

      const visits = await this.visitModel.getRecentVisitsByMember(
        memberId,
        days
      )
      return visits
    } catch (error) {
      if (error.status) throw error
      throw createError(500, `Failed to get recent visits: ${error.message}`)
    }
  }

  async getVisitHistory(memberId, coffeeShopId) {
    try {
      if (!memberId || !coffeeShopId) {
        throw createError(400, 'Member ID and Coffee Shop ID are required')
      }

      const visits = await this.visitModel.getVisitsByMember(memberId)
      const coffeeShopVisits = visits.filter(
        (visit) => visit.coffeeShop._id.toString() === coffeeShopId
      )

      return coffeeShopVisits
    } catch (error) {
      if (error.status) throw error
      throw createError(500, `Failed to get visit history: ${error.message}`)
    }
  }
}

export default VisitService
