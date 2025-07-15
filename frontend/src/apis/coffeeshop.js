import API from './client.js'

// Create a new coffee shop
export const createCoffeeShop = async (data) => {
  try {
    const response = await API.post('coffeeshop', data)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Get all coffee shops
export const getAllCoffeeShops = async () => {
  try {
    const response = await API.get('coffeeshop')
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Get a coffee shop by name
export const getCoffeeShopByName = async (name) => {
  try {
    const response = await API.get(
      `coffeeshop/by-name/${encodeURIComponent(name)}`
    )
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Get a coffee shop by ID
export const getCoffeeShopById = async (id) => {
  try {
    const response = await API.get(`coffeeshop/${id}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Update a coffee shop by ID
export const updateCoffeeShop = async (id, data) => {
  try {
    const response = await API.put(`coffeeshop/${id}`, data)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Delete a coffee shop by ID
export const deleteCoffeeShop = async (id) => {
  try {
    const response = await API.delete(`coffeeshop/${id}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Add a coffee variant to a shop
export const addCoffeeVariantToShop = async (shopId, variantId) => {
  try {
    const response = await API.post(`coffeeshop/${shopId}/variants`, {
      coffeeVariantId: variantId,
    })
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Remove a coffee variant from a shop
export const removeCoffeeVariantFromShop = async (shopId, variantId) => {
  try {
    const response = await API.delete(
      `coffeeshop/${shopId}/variants/${variantId}`
    )
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Get a coffee shop by slug
export const getCoffeeShopBySlug = async (slug) => {
  try {
    const response = await API.get(`coffeeshop/by-slug/${encodeURIComponent(slug)}`)
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

export function getCoffeeShopsByDistrict(district) {
  return API.get(`coffeeshop?district=${encodeURIComponent(district)}`).then(res => res.data)
}

export function getAllDistricts() {
  return API.get('/coffeeshop/districts').then(res => res.data)
}

export function getAllCoffeeShopsGroupedByDistrict() {
  return API.get('/coffeeshop/districts').then(res => res.data)
}

export const getFilteredCoffeeShops = async ({
  offers,
  coffeeVariants,
  sustainability,
} = {}) => {
  try {
    const params = {};
    if (offers) params.offers = offers;
    if (coffeeVariants) params.coffeeVariants = coffeeVariants;
    if (sustainability) params.sustainability = sustainability;
    const response = await API.get('/coffeeshop/filter', { params });
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

