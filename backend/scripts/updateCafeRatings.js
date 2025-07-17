import mongoose from 'mongoose'
import CoffeeShopModel from '../models/coffeeShop.js'
import ReviewModel from '../models/review.js'
import '../models/member.js' // Import to register the Member model

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://noellinder:w5WiwxRaVhD0TL4k@coffeefirst.vbrlytg.mongodb.net/coffeefirst?authMechanism=SCRAM-SHA-1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function updateAllCafeRatings() {
  try {
    console.log('Starting to update café ratings...')
    
    // Get all coffee shops
    const coffeeShops = await CoffeeShopModel.findAll()
    console.log(`Found ${coffeeShops.length} coffee shops`)
    
    // Update each coffee shop's rating
    for (const coffeeShop of coffeeShops) {
      console.log(`Updating ratings for: ${coffeeShop.name}`)
      await CoffeeShopModel.updateRating(coffeeShop._id)
    }
    
    console.log('✅ All café ratings updated successfully!')
  } catch (error) {
    console.error('❌ Error updating café ratings:', error)
  } finally {
    mongoose.connection.close()
  }
}

updateAllCafeRatings() 