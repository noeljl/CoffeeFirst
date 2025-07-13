import API from './client.js'

// Get a membership by its ID
export const getMembershipById = async (id) => {
  try {
    const response = await API.get(`memberships/${id}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Get a membership by the associated member's ID
export const getMembershipByMemberId = async (memberId) => {
  try {
    const response = await API.get(`membership/by-member/${memberId}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Update a membership by its ID
export const updateMembership = async (id, data) => {
  try {
    const response = await API.put(`memberships/${id}`, data)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Delete a membership by its ID
export const deleteMembership = async (id) => {
  try {
    const response = await API.delete(`memberships/${id}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Decrement the coffee quota for a membership
export const decrementCoffeeQuota = async (id, amount = 1) => {
  try {
    const response = await API.put(`memberships/${id}/decrement-coffee-quota`, {
      amount,
    })
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Increment the coffee quota for a membership
export const incrementCoffeeQuota = async (id, amount = 1) => {
  try {
    const response = await API.put(`memberships/${id}/increment-coffee-quota`, {
      amount,
    })
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}
