import API from './client.js'

/**
 * Fetch filtered coffee shops based on selected offers and coffeeVariants.
 * @param {Object} filters - Object with optional `offers` and `coffeeVariants` arrays.
 * @param {string[] | string} [filters.offers] - Array or single value of offers (e.g., ['FreeWater']).
 * @param {string[] | string} [filters.coffeeVariants] - Array or single value of coffee variants (e.g., ['Flat White']).
 * @returns {Promise<Object[]>} - Array of matching coffee shop objects.
 */
export const getFilteredCoffeeShops = async ({ offers, coffeeVariants } = {}) => {
  try {
    const params = {}

    if (offers) params.offers = offers
    if (coffeeVariants) params.coffeeVariants = coffeeVariants

    const response = await API.get('filter', { params })
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}
