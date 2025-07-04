// CoffeeShopService.js
import createError from 'http-errors'
import CoffeeShopModel from '../models/coffeeShop.js' // Assuming CoffeeShopModel is in a file named coffeeShopModel.js

class CoffeeShopService {
  constructor() {
    this.coffeeShopModel = CoffeeShopModel // CoffeeShopModel is already an instance
  }

  /**
   * Creates a new coffee shop.
   * @param {Object} data - The data for the new coffee shop (name, address, level, etc.).
   * @returns {Promise<Document>} The created coffee shop document.
   * @throws {HttpError} If a coffee shop with the name already exists, validation fails, or a server error occurs.
   */
  async createCoffeeShop(data) {
    try {
      const coffeeShop = await this.coffeeShopModel.create(data)
      return coffeeShop
    } catch (error) {
      console.error(`Error in createCoffeeShop: ${error.message}`)
      if (error.message.includes('already exists')) {
        throw createError(409, error.message) // Conflict
      }
      if (error.message.includes('Validation error')) {
        throw createError(400, error.message) // Bad Request
      }
      throw createError(500, `Failed to create coffee shop: ${error.message}`)
    }
  }

  /**
   * Retrieves a coffee shop by its ID.
   * @param {string} coffeeShopId - The ID of the coffee shop.
   * @returns {Promise<Document>} The coffee shop document.
   * @throws {HttpError} If the coffee shop is not found or a server error occurs.
   */
  async getCoffeeShopById(coffeeShopId) {
    try {
      const coffeeShop = await this.coffeeShopModel.findById(coffeeShopId)
      if (!coffeeShop) {
        throw createError(404, 'Coffee shop not found')
      }
      return coffeeShop
    } catch (error) {
      console.error(`Error in getCoffeeShopById: ${error.message}`)
      if (error.statusCode) throw error // Re-throw http-errors
      throw createError(500, `Failed to retrieve coffee shop: ${error.message}`)
    }
  }

  /**
   * Retrieves a coffee shop by its name.
   * @param {string} name - The name of the coffee shop.
   * @returns {Promise<Document>} The coffee shop document.
   * @throws {HttpError} If the coffee shop is not found or a server error occurs.
   */
  async getCoffeeShopByName(name) {
    try {
      const coffeeShop = await this.coffeeShopModel.findByName(name)
      if (!coffeeShop) {
        throw createError(404, 'Coffee shop with this name not found')
      }
      return coffeeShop
    } catch (error) {
      console.error(`Error in getCoffeeShopByName: ${error.message}`)
      if (error.statusCode) throw error // Re-throw http-errors
      throw createError(
        500,
        `Failed to retrieve coffee shop by name: ${error.message}`
      )
    }
  }

  /**
   * Retrieves a coffee shop by its slug.
   * @param {string} slug - The slug of the coffee shop.
   * @returns {Promise<Document>} The coffee shop document.
   * @throws {HttpError} If the coffee shop is not found or a server error occurs.
   */
  async getCoffeeShopBySlug(slug) {
    try {
      const coffeeShop = await this.coffeeShopModel.findBySlug(slug)
      if (!coffeeShop) {
        throw createError(404, 'Coffee shop with this slug not found')
      }
      return coffeeShop
    } catch (error) {
      console.error(`Error in getCoffeeShopBySlug: ${error.message}`)
      if (error.statusCode) throw error // Re-throw http-errors
      throw createError(
        500,
        `Failed to retrieve coffee shop by slug: ${error.message}`
      )
    }
  }

  /**
   * Retrieves all coffee shops.
   * @returns {Promise<Array<Document>>} An array of coffee shop documents.
   * @throws {HttpError} If a server error occurs.
   */
  async getAllCoffeeShops() {
    try {
      const coffeeShops = await this.coffeeShopModel.findAll()
      return coffeeShops
    } catch (error) {
      console.error(`Error in getAllCoffeeShops: ${error.message}`)
      throw createError(
        500,
        `Failed to retrieve all coffee shops: ${error.message}`
      )
    }
  }

  /**
   * Updates an existing coffee shop.
   * @param {string} coffeeShopId - The ID of the coffee shop to update.
   * @param {Object} updateData - The data to update.
   * @returns {Promise<Document>} The updated coffee shop document.
   * @throws {HttpError} If the coffee shop is not found, validation fails, or a server error occurs.
   */
  async updateCoffeeShop(coffeeShopId, updateData) {
    try {
      const coffeeShop = await this.coffeeShopModel.update(
        coffeeShopId,
        updateData
      )
      return coffeeShop
    } catch (error) {
      console.error(`Error in updateCoffeeShop: ${error.message}`)
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      if (
        error.message.includes('Validation error') ||
        error.message.includes('already exists')
      ) {
        throw createError(400, error.message)
      }
      throw createError(500, `Failed to update coffee shop: ${error.message}`)
    }
  }

  /**
   * Deletes a coffee shop by its ID.
   * @param {string} coffeeShopId - The ID of the coffee shop to delete.
   * @returns {Promise<Object>} A success message.
   * @throws {HttpError} If the coffee shop is not found or a server error occurs.
   */
  async deleteCoffeeShop(coffeeShopId) {
    try {
      const coffeeShop = await this.coffeeShopModel.delete(coffeeShopId)
      return {
        message: `Coffee shop with ID ${coffeeShop.id} successfully deleted.`,
      }
    } catch (error) {
      console.error(`Error in deleteCoffeeShop: ${error.message}`)
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      throw createError(500, `Failed to delete coffee shop: ${error.message}`)
    }
  }

  /**
   * Recalculates and updates the average rating and number of reviews for a coffee shop.
   * This method should be called after a review is created, updated, or deleted for this coffee shop.
   * @param {string} coffeeShopId - The ID of the coffee shop to update.
   * @returns {Promise<Document>} The updated coffee shop document.
   * @throws {HttpError} If the coffee shop is not found or a server error occurs.
   */
  async updateCoffeeShopRating(coffeeShopId) {
    try {
      const updatedShop = await this.coffeeShopModel.updateRating(coffeeShopId)
      return updatedShop
    } catch (error) {
      console.error(`Error in updateCoffeeShopRating: ${error.message}`)
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      throw createError(
        500,
        `Failed to update coffee shop rating: ${error.message}`
      )
    }
  }

  /**
   * Adds a coffee variant to the list of offered variants for a coffee shop.
   * @param {string} coffeeShopId - The ID of the coffee shop.
   * @param {string} coffeeVariantId - The ID of the coffee variant to add.
   * @returns {Promise<Document>} The updated coffee shop document.
   * @throws {HttpError} If the coffee shop is not found or a server error occurs.
   */
  async addCoffeeVariantToShop(coffeeShopId, coffeeVariantId) {
    try {
      const coffeeShop = await this.coffeeShopModel.addOfferedCoffeeVariant(
        coffeeShopId,
        coffeeVariantId
      )
      return coffeeShop
    } catch (error) {
      console.error(`Error in addCoffeeVariantToShop: ${error.message}`)
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      throw createError(
        500,
        `Failed to add coffee variant to coffee shop: ${error.message}`
      )
    }
  }

  /**
   * Removes a coffee variant from the list of offered variants for a coffee shop.
   * @param {string} coffeeShopId - The ID of the coffee shop.
   * @param {string} coffeeVariantId - The ID of the coffee variant to remove.
   * @returns {Promise<Document>} The updated coffee shop document.
   * @throws {HttpError} If the coffee shop is not found or a server error occurs.
   */
  async removeCoffeeVariantFromShop(coffeeShopId, coffeeVariantId) {
    try {
      const coffeeShop = await this.coffeeShopModel.removeOfferedCoffeeVariant(
        coffeeShopId,
        coffeeVariantId
      )
      return coffeeShop
    } catch (error) {
      console.error(`Error in removeCoffeeVariantFromShop: ${error.message}`)
      if (error.message.includes('not found')) {
        throw createError(404, error.message)
      }
      throw createError(
        500,
        `Failed to remove coffee variant from coffee shop: ${error.message}`
      )
    }
  }
}

export default CoffeeShopService
