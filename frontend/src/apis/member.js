import API from './client.js'

// Get a member by ID
export const getMemberById = async (id) => {
  try {
    const response = await API.get(`member/${id}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

export const getMemberByMail = async (mail) => {
  try {
    console.log('api/getMemberByMail called with mail ' + mail)
    const response = await API.get(`member/mail/${mail}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Update a member's profile by ID
export const updateMember = async (id, payload) => {
  const { data } = await API.put(`member/${id}`, payload) // payload kann JSON ODER FormData sein
  return data // z. B. { id, profilePicture, ... }
}

// Update a member's profile by ID
export const updateMemberByID = async (id, data) => {
  try {
    const res = await API.put(`member/${id}`, data) // <-- 'data' statt 'formData'
    return res.data // <-- 'res' statt 'response'
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Delete a member by ID
export const deleteMember = async (id) => {
  try {
    const response = await API.delete(`member/${id}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Add a coffee shop to a member's list
export const addCoffeeShopToMemberList = async (
  memberId,
  coffeeShopId,
  listType
) => {
  try {
    const response = await API.post(
      `member/${memberId}/coffeeshops/${listType}`,
      { coffeeShopId }
    )
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Remove a coffee shop from a member's list
export const removeCoffeeShopFromMemberList = async (
  memberId,
  coffeeShopId,
  listType
) => {
  try {
    const response = await API.delete(
      `member/${memberId}/coffeeshops/${listType}/${coffeeShopId}`
    )
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Get all cafe objects from a user's wishlist or favorite list
export const getMemberCafeList = async (memberId, listType) => {
  try {
    const response = await API.get(`member/${memberId}/${listType}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

export const changeMemberPassword = (id, data) => {
  // baseURL ist bereits "/api", Router heißt "/member"
  return API.put(`member/${id}/password`, data).then((res) => res.data)
}