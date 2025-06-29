import mongoose from 'mongoose'

export const PaymentStatus = Object.freeze({
  SUCCESS: 'Success',
  FAILED: 'Failed',
  PENDING: 'Pending',
})

const MemberSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true }, // Added trim
    lastName: { type: String, required: true, trim: true }, // Added trim
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'], // Added basic email validation
    },
    passwordHash: { type: String, required: true },
    profilePicture: {
      type: String,
      default: 'https://example.com/default-profile.png', // Added a more concrete default
      trim: true,
    },
    agreedToNewsletter: { type: Boolean, default: false },

    stripeCustomerId: { type: String, unique: true, sparse: true, trim: true },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
      required: true, // Assuming payment status is always present
    },

    // Enforcing 1-to-1 relationships as per UML cardinality '1'
    // This means a Member MUST have a Membership and a MemberCard.
    // In a real application, you might handle creation of these related
    // documents in a service layer to ensure they are always linked.
    membership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Membership',
      required: true, // Changed from optional to required
      unique: true, // A member has one unique membership
    },
    memberCard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MemberCard',
      required: true, // Changed from optional to required
      unique: true, // A member has one unique member card
    },

    // Lists of CoffeeShops (already well-defined)
    wishlistCoffeeShops: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'CoffeeShop' },
    ],
    favoriteCoffeeShops: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'CoffeeShop' },
    ],
    visitedCoffeeShops: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'CoffeeShop' },
    ],
    reviewedCoffeeShops: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'CoffeeShop' },
    ],

    // External authentication IDs (good additions, kept)
    google: {
      id: String,
    },
    facebook: {
      id: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toObject: { virtuals: true }, // Ensure virtuals are included when converting to object
    toJSON: { virtuals: true }, // Ensure virtuals are included when converting to JSON
  }
)

// Virtual for full name (already good)
MemberSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})

// --- Methods for the MembersModel ---
class MembersModel {
  /**
   * Creates a new member.
   * @param {Object} data - The data for the new member.
   * @returns {Promise<Document>} The created member document.
   * @throws {Error} If there's a database error or a member with the email/Stripe ID already exists.
   */
  async create(data) {
    try {
      const member = new Member(data)
      return await member.save()
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'A member with this email, Stripe ID, membership, or member card already exists. Each member must have unique values for these fields.'
        )
      }
      // Check for validation errors if required fields are missing
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error creating member: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error creating member: ${err.message}`)
    }
  }

  /**
   * Updates an existing member.
   * @param {string} id - The ID of the member to update.
   * @param {Object} updateData - The data to update.
   * @returns {Promise<Document|null>} The updated member document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async update(id, updateData) {
    try {
      // Ensure unique fields are handled carefully if updated
      const member = await Member.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
      }).exec()
      if (!member) {
        throw new Error(`Member with ID ${id} not found.`)
      }
      return member
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(
          'Update failed: A duplicate value exists for a unique field (e.g., email, Stripe ID, membership, member card).'
        )
      }
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        )
        throw new Error(
          `Validation error updating member: ${errors.join(', ')}`
        )
      }
      throw new Error(`Error updating member: ${err.message}`)
    }
  }

  /**
   * Deletes a member by ID.
   * @param {string} id - The ID of the member to delete.
   * @returns {Promise<Document|null>} The deleted member document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async delete(id) {
    try {
      const member = await Member.findByIdAndDelete(id).exec()
      if (!member) {
        throw new Error(`Member with ID ${id} not found for deletion.`)
      }
      return member
    } catch (err) {
      throw new Error(`Error deleting member: ${err.message}`)
    }
  }

  /**
   * Finds a single member by their email address.
   * @param {string} email - The email address of the member to find.
   * @returns {Promise<Document|null>} The member document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async findOneByEmail(email) {
    try {
      return await Member.findOne({ email }).exec()
    } catch (err) {
      throw new Error(`Error finding member by email: ${err.message}`)
    }
  }

  /**
   * Finds a single member by their ID.
   * Populates related documents like membership, memberCard, and wishlistCoffeeShops.
   * @param {string} id - The ID of the member to find.
   * @returns {Promise<Document|null>} The member document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async findOneById(id) {
    try {
      const member = await Member.findById(id)
        .populate('membership')
        .populate('memberCard')
        .populate('wishlistCoffeeShops')
        .populate('favoriteCoffeeShops') // Added populate for favorite shops
        .populate('visitedCoffeeShops') // Added populate for visited shops
        .populate('reviewedCoffeeShops') // Added populate for reviewed shops
        .exec()
      return member
    } catch (err) {
      throw new Error(`Error finding member by ID: ${err.message}`)
    }
  }

  /**
   * Finds a single member by their Google ID.
   * @param {string} id - The Google ID of the member to find.
   * @returns {Promise<Document|null>} The member document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async findOneByGoogleId(id) {
    try {
      return await Member.findOne({ 'google.id': id }).exec()
    } catch (err) {
      throw new Error(`Error finding member by Google ID: ${err.message}`)
    }
  }

  /**
   * Finds a single member by their Facebook ID.
   * @param {string} id - The Facebook ID of the member to find.
   * @returns {Promise<Document|null>} The member document or null if not found.
   * @throws {Error} If there's a database error.
   */
  async findOneByFacebookId(id) {
    try {
      return await Member.findOne({ 'facebook.id': id }).exec()
    } catch (err) {
      throw new Error(`Error finding member by Facebook ID: ${err.message}`)
    }
  }

  /**
   * Adds a coffee shop to a specified list for a member.
   * @param {string} memberId - The ID of the member.
   * @param {string} coffeeShopId - The ID of the coffee shop to add.
   * @param {string} listType - The type of list ('wishlistCoffeeShops', 'favoriteCoffeeShops', etc.).
   * @returns {Promise<Document|null>} The updated member document or null if not found.
   * @throws {Error} If there's a database error or invalid listType.
   */
  async addCoffeeShopToList(memberId, coffeeShopId, listType) {
    const validLists = [
      'wishlistCoffeeShops',
      'favoriteCoffeeShops',
      'visitedCoffeeShops',
      'reviewedCoffeeShops',
    ]
    if (!validLists.includes(listType)) {
      throw new Error(
        `Invalid list type: ${listType}. Must be one of ${validLists.join(
          ', '
        )}.`
      )
    }
    try {
      const member = await Member.findByIdAndUpdate(
        memberId,
        { $addToSet: { [listType]: coffeeShopId } }, // $addToSet prevents duplicates
        { new: true }
      ).exec()
      if (!member) {
        throw new Error(`Member with ID ${memberId} not found.`)
      }
      return member
    } catch (err) {
      throw new Error(`Error adding to ${listType}: ${err.message}`)
    }
  }

  /**
   * Removes a coffee shop from a specified list for a member.
   * @param {string} memberId - The ID of the member.
   * @param {string} coffeeShopId - The ID of the coffee shop to remove.
   * @param {string} listType - The type of list ('wishlistCoffeeShops', 'favoriteCoffeeShops', etc.).
   * @returns {Promise<Document|null>} The updated member document or null if not found.
   * @throws {Error} If there's a database error or invalid listType.
   */
  async removeCoffeeShopFromList(memberId, coffeeShopId, listType) {
    const validLists = [
      'wishlistCoffeeShops',
      'favoriteCoffeeShops',
      'visitedCoffeeShops',
      'reviewedCoffeeShops',
    ]
    if (!validLists.includes(listType)) {
      throw new Error(
        `Invalid list type: ${listType}. Must be one of ${validLists.join(
          ', '
        )}.`
      )
    }
    try {
      const member = await Member.findByIdAndUpdate(
        memberId,
        { $pull: { [listType]: coffeeShopId } }, // $pull removes all instances
        { new: true }
      ).exec()
      if (!member) {
        throw new Error(`Member with ID ${memberId} not found.`)
      }
      return member
    } catch (err) {
      throw new Error(`Error removing from ${listType}: ${err.message}`)
    }
  }
}

export const MemberPaymentStatus = PaymentStatus
export default new MembersModel()
