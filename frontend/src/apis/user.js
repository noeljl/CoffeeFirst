import API from './client.js'

// API interface for loading the user's profile
export const fetchUser = async (userId) => {
  try {
    const response = await API.get(`users/${userId}`)

    return response.data
  } catch (err) {
    throw err.response.data
  }
}

// API interface for updating the user's profile
export const updateUser = async (userId, data) => {
  try {
    const response = await API.put(`users/${userId}`, data) // Changed from post to put

    return response.data
  } catch (err) {
    throw err.response.data
  }
}
