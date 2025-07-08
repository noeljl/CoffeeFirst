// services/filterService.js
import CoffeeShop from '../models/coffeeShop.js'
import CoffeeVariant from '../models/coffeeVariant.js'

// Mapping of frontend coffee variant labels to enum values used in the DB
const frontendLabelToCoffeeType = {
  'Espresso': 'Espresso',
  'Flat White': 'Flat White',
  'Cold Brew': 'Cold Brew',
  'Cappuccino': 'Cappuccino',
}

export async function getFilteredCoffeeShops({ offers = [], coffeeVariants = [] }) {
  const filter = {}

  // Normalize offers into an array
  const offersArray = Array.isArray(offers) ? offers : [offers]
  if (offersArray.length > 0) {
    filter.features = { $all: offersArray } // ← Match all selected offers
  }

  const variantsArray = Array.isArray(coffeeVariants) ? coffeeVariants : [coffeeVariants]
  if (variantsArray.length > 0) {
    const frontendLabelToCoffeeType = {
      'Espresso': 'Espresso',
      'Flat White': 'Flat White',
      'Cold Brew': 'Cold Brew',
      'Cappuccino': 'Cappuccino',
    }

    const coffeeTypes = variantsArray
      .map((label) => frontendLabelToCoffeeType[label])
      .filter(Boolean)

    const matchingVariants = await CoffeeVariant.find({
      coffeeType: { $in: coffeeTypes },
    }).select('coffeeShop')

    const matchingShopIds = [...new Set(matchingVariants.map((v) => v.coffeeShop.toString()))]

    filter._id = { $in: matchingShopIds }
  }

  return await CoffeeShop.find(filter)
}
