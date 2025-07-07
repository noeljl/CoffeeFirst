import mongoose from 'mongoose'

import { CoffeeType, MembershipTier } from './enums.js'

const MemberCardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Member card name must be at least 3 characters long.'], // Added minlength validation
    },
    coffeeType: {
      type: String,
      required: true,
      enum: Object.values(CoffeeType), // Restrict values to the imported CoffeeType enum
      trim: true,
    },
    cardCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [6, 'Card code must be at least 6 characters long.'], // Added minlength validation
      maxlength: [20, 'Card code cannot exceed 20 characters.'], // Added maxlength validation
    },
    membershipTier: {
      type: String,
      required: true,
      // Assuming membershipTier will be linked to an enum from MembershipType or another source.
      // If it's the MembershipTier enum from membershipType.js, it should be imported:
      // enum: Object.values(MembershipTier),
      trim: true,
    },
    // Enforcing 1-to-1 relationship with Membership as per UML.
    // A MemberCard MUST be associated with a Membership.
    membership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Membership',
      required: true, // Changed to required based on UML's 1 cardinality
      unique: true, // Ensures each membership is linked to only one member card
      // Removed sparse: true as it's redundant with required: true and means it's never null
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
)

const MemberCard = mongoose.model('MemberCard', MemberCardSchema)

class MemberCardModel {
  /**
   * Creates a new member card.
   * @param {Object} data - The data for the new member card.
   * @returns {Promise<Document>} The created member card document.
   * @throws {Error} If there's a database error, or a member card with the name/card code/membership already exists.
   */
  async create(data) {
    try {
      const memberCard = new MemberCard(data)
      return await memberCard.save()
    } catch (err) {
      if (err.code === 11000) {
        console.log(data)
        throw new Error(
          'A member card with this name, card code, or linked membership already exists.'
        )
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error creating member card: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error creating member card: ${err.message}`)
    }
  }

  /**
   * Finds a member card by its ID.
   * Populates the 'membership' field.
   * @param {string} id - The ID of the member card to find.
   * @returns {Promise<Document|null>} The member card document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async findById(id) {
    try {
      const memberCard = await MemberCard.findById(id)
        .populate('membership')
        .exec()
      return memberCard
    } catch (err) {
      throw new Error(`Error finding member card by ID: ${err.message}`)
    }
  }

  /**
   * Finds a member card by its card code.
   * Populates the 'membership' field.
   * @param {string} cardCode - The card code of the member card to find.
   * @returns {Promise<Document|null>} The member card document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async findByCardCode(cardCode) {
    try {
      const memberCard = await MemberCard.findOne({ cardCode })
        .populate('membership')
        .exec()
      return memberCard
    } catch (err) {
      throw new Error(`Error finding member card by code: ${err.message}`)
    }
  }

  /**
   * Updates an existing member card.
   * @param {string} id - The ID of the member card to update.
   * @param {Object} updateData - The data to update.
   * @returns {Promise<Document|null>} The updated member card document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async update(id, updateData) {
    try {
      const memberCard = await MemberCard.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
      }).exec()
      if (!memberCard) {
        throw new Error(`Member card with ID ${id} not found.`)
      }
      return memberCard
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'Update failed: A duplicate value exists for a unique field (name, cardCode, or membership).'
        )
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error updating member card: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error updating member card: ${err.message}`)
    }
  }

  /**
   * Deletes a member card by its ID.
   * @param {string} id - The ID of the member card to delete.
   * @returns {Promise<Document|null>} The deleted member card document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async delete(id) {
    try {
      const memberCard = await MemberCard.findByIdAndDelete(id).exec()
      if (!memberCard) {
        throw new Error(`Member card with ID ${id} not found for deletion.`)
      }
      return memberCard
    } catch (err) {
      throw new Error(`Error deleting member card: ${err.message}`)
    }
  }
}

export default new MemberCardModel()
