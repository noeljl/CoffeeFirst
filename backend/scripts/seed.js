import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { MembershipType } from '../models/membershipType.js'
import { CoffeeType, MembershipTier, MembershipPrice } from '../models/enums.js'

dotenv.config()

const seedMembershipTypes = async () => {
  try {
    // Connect to database
    const dbUri = process.env.MONGO_URI
    if (!dbUri) {
      throw new Error('MONGO_URI is not defined in your .env file')
    }
    await mongoose.connect(dbUri)
    console.log('🌱 Database connection successful.')

    // Clear existing membership types
    await MembershipType.deleteMany({})
    console.log('🗑️ Cleared existing membership types.')

    // Create membership types that match the frontend plan names
    const membershipTypes = [
      {
        name: 'Silver',
        membershipTier: MembershipTier.SILVER,
        membershipPrice: MembershipPrice.LEVEL_1,
        coffeeTypes: [
          CoffeeType.ESPRESSO,
          CoffeeType.AMERICANO,
          CoffeeType.CAPPUCCINO,
        ],
        durationDays: 30,
        coffeeQuota: 10,
      },
      {
        name: 'Gold',
        membershipTier: MembershipTier.GOLD,
        membershipPrice: MembershipPrice.LEVEL_2,
        coffeeTypes: [
          CoffeeType.ESPRESSO,
          CoffeeType.AMERICANO,
          CoffeeType.CAPPUCCINO,
          CoffeeType.FLAT_WHITE,
          CoffeeType.LATTE_MACCHIATO,
        ],
        durationDays: 30,
        coffeeQuota: 15,
      },
      {
        name: 'Black',
        membershipTier: MembershipTier.BLACK,
        membershipPrice: MembershipPrice.LEVEL_3,
        coffeeTypes: [
          CoffeeType.ESPRESSO,
          CoffeeType.AMERICANO,
          CoffeeType.CAPPUCCINO,
          CoffeeType.FLAT_WHITE,
          CoffeeType.LATTE_MACCHIATO,
          CoffeeType.COLD_BREW,
        ],
        durationDays: 30,
        coffeeQuota: 30,
      },
    ]

    // Insert membership types
    for (const membershipType of membershipTypes) {
      const created = await MembershipType.create(membershipType)
      console.log(`✅ Created membership type: ${created.name}`)
    }

    console.log('🎉 Seed completed successfully!')
  } catch (err) {
    console.error('🔥 Error during seeding:', err)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Database connection closed.')
  }
}

// Run the seed function
seedMembershipTypes()
