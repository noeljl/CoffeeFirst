import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { SustainabilityFeature } from '../models/enums.js'

// Load environment variables
dotenv.config()

// Import the CoffeeShop model directly
import { CoffeeShop } from '../models/coffeeShop.js'

const addDefaultSustainabilityFeatures = async () => {
  try {
    // Connect to database
    const dbUri = process.env.MONGO_URI
    if (!dbUri) {
      throw new Error('MONGO_URI is not defined in your .env file')
    }
    await mongoose.connect(dbUri)
    console.log('🌱 Database connection successful.')

    // Find cafes with no sustainability features
    const cafesWithoutSustainability = await CoffeeShop.find({
      $or: [
        { sustainabilityFeatures: { $exists: false } },
        { sustainabilityFeatures: { $size: 0 } }
      ]
    })

    console.log(`📊 Found ${cafesWithoutSustainability.length} cafes without sustainability features`)

    if (cafesWithoutSustainability.length === 0) {
      console.log('✅ All cafes already have sustainability features!')
      return
    }

    // Default sustainability features to add
    const defaultFeatures = [
      SustainabilityFeature.ETHICAL_SOURCING, // Most cafes should have ethical sourcing
      SustainabilityFeature.ARABICA_ONLY      // Most specialty cafes use Arabica
    ]

    // Update each cafe with default sustainability features
    let updatedCount = 0
    for (const cafe of cafesWithoutSustainability) {
      try {
        await CoffeeShop.findByIdAndUpdate(
          cafe._id,
          { 
            $set: { sustainabilityFeatures: defaultFeatures }
          }
        )
        console.log(`✅ Added sustainability features to: ${cafe.name}`)
        updatedCount++
      } catch (error) {
        console.error(`❌ Failed to update ${cafe.name}:`, error.message)
      }
    }

    console.log(`🎉 Successfully updated ${updatedCount} cafes with default sustainability features!`)
    console.log('📋 Default features added:')
    defaultFeatures.forEach(feature => console.log(`   - ${feature}`))

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed.')
  }
}

// Run the script
addDefaultSustainabilityFeatures() 