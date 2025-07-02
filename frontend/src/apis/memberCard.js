import API from './client.js'

// Get a member card by ID
export const getMemberCardById = async (id) => {
  try {
    const response = await API.get(`memberCard/${id}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Get a member card by card code
export const getMemberCardByCode = async (cardCode) => {
  try {
    const response = await API.get(
      `memberCard/by-code/${encodeURIComponent(cardCode)}`
    )
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Update a member card by ID
export const updateMemberCard = async (id, data) => {
  try {
    const response = await API.put(`memberCard/${id}`, data)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Delete a member card by ID
export const deleteMemberCard = async (id) => {
  try {
    const response = await API.delete(`memberCard/${id}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}
