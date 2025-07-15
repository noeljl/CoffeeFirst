import API from './client.js'

// Create a new review
export const createReview = async (data) => {
  try {
    const response = await API.post('review', data)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Get a review by ID
export const getReviewById = async (id) => {
  try {
    const response = await API.get(`review/${id}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Get all reviews for a specific coffee shop
export const getReviewsByCoffeeShopId = async (coffeeShopId) => {
  try {
    const response = await API.get(`review/coffee-shop/${coffeeShopId}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Get all reviews by a specific member
export const getReviewsByMemberId = async (memberId) => {
  try {
    const response = await API.get(`review/member/${memberId}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Update an existing review by ID
export const updateReview = async (id, data) => {
  try {
    const response = await API.put(`review/${id}`, data)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Delete a review by ID
export const deleteReview = async (id) => {
  try {
    const response = await API.delete(`review/${id}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

export async function fetchReviewSummary(coffeeShopId) {
  try {
    const response = await API.get(`review/coffee-shop/${coffeeShopId}/summary`);
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
}
