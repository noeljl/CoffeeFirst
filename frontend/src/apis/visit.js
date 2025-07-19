import API from './client.js'

// Create a new visit
export const createVisit = async (memberId, coffeeShopId, visitData = {}) => {
  try {
    const response = await API.post('/visits', {
      memberId,
      coffeeShopId,
      ...visitData,
    })
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Get all visits for a member
export const getMemberVisits = async (memberId, limit = 50) => {
  try {
    const response = await API.get(`/visits/member/${memberId}?limit=${limit}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Get all visits for a coffee shop
export const getCoffeeShopVisits = async (coffeeShopId, limit = 50) => {
  try {
    const response = await API.get(
      `/visits/coffeeshop/${coffeeShopId}?limit=${limit}`
    )
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Get the last visit for a member at a specific coffee shop
export const getLastVisit = async (memberId, coffeeShopId) => {
  try {
    const response = await API.get(`/visits/last/${memberId}/${coffeeShopId}`)
    return response.data
  } catch (err) {
    if (err.response?.status === 404) {
      return null // No visit found
    }
    throw err.response?.data || err.message
  }
}

// Get visit statistics for a member
export const getVisitStats = async (memberId) => {
  try {
    const response = await API.get(`/visits/stats/${memberId}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Get recent visits for a member
export const getRecentVisits = async (memberId, days = 30) => {
  try {
    const response = await API.get(`/visits/recent/${memberId}?days=${days}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Get visit history for a member at a specific coffee shop
export const getVisitHistory = async (memberId, coffeeShopId) => {
  try {
    const response = await API.get(
      `/visits/history/${memberId}/${coffeeShopId}`
    )
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}
