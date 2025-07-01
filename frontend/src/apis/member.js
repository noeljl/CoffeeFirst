import API from './client.js'

// API interface for loading a member's profile
export const fetchMember = async (memberId) => {
  try {
    const response = await API.get(`members/${memberId}`)

    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// API interface for updating a member's profile
export const updateMember = async (memberId, data) => {
  try {
    const response = await API.put(`members/${memberId}`, data)

    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}
