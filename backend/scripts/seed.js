// backend/scripts/seed.js
// Injects some static Instances into the database, which
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { MembershipType } from '../models/membershipType.js'

import { MembershipTier, MembershipPrice, CoffeeType } from '../models/enums.js'
import { Offer, SustainabilityFeature } from '../models/enums.js'
import { CoffeeShop } from '../models/coffeeShop.js'

// Lade die Umgebungsvariablen aus der .env Datei
dotenv.config()

// Definiere die statischen Mitgliedschaftstypen, die du anlegen möchtest
const membershipTypesToSeed = [
  {
    name: 'Silver',
    membershipTier: MembershipTier.SILVER,
    membershipPrice: MembershipPrice.LEVEL_1, // 29
    coffeeTypes: [CoffeeType.ESPRESSO, CoffeeType.AMERICANO],
    coffeeQuota: 10,
  },
  {
    name: 'Gold',
    membershipTier: MembershipTier.GOLD,
    membershipPrice: MembershipPrice.LEVEL_2, // 59
    coffeeTypes: [
      CoffeeType.ESPRESSO,
      CoffeeType.AMERICANO,
      CoffeeType.FLAT_WHITE,
    ],
    coffeeQuota: 20,
  },
  {
    name: 'Black',
    membershipTier: MembershipTier.BLACK,
    membershipPrice: MembershipPrice.LEVEL_3, // 99
    coffeeTypes: [
      CoffeeType.ESPRESSO,
      CoffeeType.AMERICANO,
      CoffeeType.FLAT_WHITE,
      CoffeeType.LATTE_MACCHIATO,
    ],
    coffeeQuota: 40,
  },
]

// Dummy coffee shops to seed
const coffeeShopsToSeed = [
  {
    slug: 'man-vs-machine-hohenzollern',
    name: 'Man versus Machine Coffee Roasters',
    brand: 'Man versus Machine',
    address: 'Hohenzollernstraße 32, 80801 München',
    coords: { lat: 48.15997773264443, lng: 11.581492083804415 },
    images: [
      '/images/cafes/man-vs-machine-hohenzollern/cover.png',
      '/images/cafes/man-vs-machine-hohenzollern/coffees.jpg',
      '/images/cafes/man-vs-machine-hohenzollern/customer.jpg'
    ],
    aboutCafe: 'Man vs Machine is a specialty coffee roaster based in Munich, founded in 2014...',
    aboutCoffee: 'At Man vs Machine, quality always comes before growth...',
    sustainabilityFeatures: [SustainabilityFeature.SMALL_BATCH_ROASTING, SustainabilityFeature.ETHICAL_SOURCING],
    coffeeTypes: [CoffeeType.ESPRESSO, CoffeeType.FLAT_WHITE, CoffeeType.CAPPUCCINO],
    amenities: [Offer.FREE_WATER, Offer.OUTDOOR_SITTING, Offer.WHEELCHAIR_FRIENDLY]
  },
  {
    slug: 'man-vs-machine-muellerstrasse',
    name: 'Man versus Machine – Müllerstraße',
    brand: 'Man versus Machine',
    address: 'Müllerstraße 23, 80469 München',
    coords: { lat: 48.129582, lng: 11.574003 },
    images: [
      '/images/cafes/man-vs-machine-muellerstrasse/cover.png',
      '/images/cafes/man-vs-machine-muellerstrasse/coffees.jpg',
      '/images/cafes/man-vs-machine-muellerstrasse/customer.jpg'
    ],
    aboutCafe: 'This second MvM location blends urban aesthetics with the same exceptional beans.',
    aboutCoffee: 'A great spot for espresso lovers and cappuccino fans alike.',
    sustainabilityFeatures: [SustainabilityFeature.ETHICAL_SOURCING, SustainabilityFeature.ECO_FRIENDLY_PACKAGING],
    coffeeTypes: [CoffeeType.ESPRESSO, CoffeeType.AMERICANO, CoffeeType.CAPPUCCINO],
    amenities: [Offer.WHEELCHAIR_FRIENDLY, Offer.PET_FRIENDLY, Offer.INDOOR_SITTING]
  },
  // 8 more dummy cafes
  {
    slug: 'cafe-frischluft',
    name: 'Café Frischluft',
    brand: 'Frischluft',
    address: 'Lindwurmstraße 88, 80337 München',
    coords: { lat: 48.123456, lng: 11.567890 },
    images: [
      '/images/cafes/cafe-frischluft/cover.png',
      '/images/cafes/cafe-frischluft/coffees.jpg',
      '/images/cafes/cafe-frischluft/customer.jpg'
    ],
    aboutCafe: 'A bright, plant-filled café with a large outdoor terrace and a focus on fresh air and sustainability.',
    aboutCoffee: 'Serving only Arabica beans, roasted weekly in small batches.',
    sustainabilityFeatures: [SustainabilityFeature.SMALL_BATCH_ROASTING, SustainabilityFeature.ARABICA_ONLY],
    coffeeTypes: [CoffeeType.ESPRESSO, CoffeeType.LATTE_MACCHIATO],
    amenities: [Offer.OUTDOOR_SITTING, Offer.FREE_WATER, Offer.STUDY_FRIENDLY]
  },
  {
    slug: 'urban-beans',
    name: 'Urban Beans',
    brand: 'Urban Beans',
    address: 'Sonnenstraße 12, 80331 München',
    coords: { lat: 48.137154, lng: 11.575490 },
    images: [
      '/images/cafes/urban-beans/cover.png',
      '/images/cafes/urban-beans/coffees.jpg',
      '/images/cafes/urban-beans/customer.jpg'
    ],
    aboutCafe: 'Trendy city café with a minimalist design and a focus on ethically sourced coffee.',
    aboutCoffee: 'Espresso-based drinks and pour-overs from single-origin beans.',
    sustainabilityFeatures: [SustainabilityFeature.ETHICAL_SOURCING, SustainabilityFeature.ECO_FRIENDLY_PACKAGING],
    coffeeTypes: [CoffeeType.ESPRESSO, CoffeeType.AMERICANO],
    amenities: [Offer.WIFI, Offer.INDOOR_SITTING, Offer.FREE_CHARGING]
  },
  {
    slug: 'kaffee-ecke',
    name: 'Kaffee Ecke',
    brand: 'Ecke',
    address: 'Eckeplatz 5, 80335 München',
    coords: { lat: 48.148000, lng: 11.560000 },
    images: [
      '/images/cafes/kaffee-ecke/cover.png',
      '/images/cafes/kaffee-ecke/coffees.jpg',
      '/images/cafes/kaffee-ecke/customer.jpg'
    ],
    aboutCafe: 'A cozy corner café known for its friendly staff and pet-friendly policy.',
    aboutCoffee: 'Classic Italian espresso and cappuccino.',
    sustainabilityFeatures: [SustainabilityFeature.ARABICA_ONLY],
    coffeeTypes: [CoffeeType.ESPRESSO, CoffeeType.CAPPUCCINO],
    amenities: [Offer.PET_FRIENDLY, Offer.INDOOR_SITTING]
  },
  {
    slug: 'green-cup',
    name: 'Green Cup Coffee',
    brand: 'Green Cup',
    address: 'Türkenstraße 86, 80799 München',
    coords: { lat: 48.150000, lng: 11.580000 },
    images: [
      '/images/cafes/green-cup/cover.png',
      '/images/cafes/green-cup/coffees.jpg',
      '/images/cafes/green-cup/customer.jpg'
    ],
    aboutCafe: 'A café with a green heart, offering eco-friendly packaging and a lush interior.',
    aboutCoffee: 'Specialty coffees and seasonal blends.',
    sustainabilityFeatures: [SustainabilityFeature.ECO_FRIENDLY_PACKAGING, SustainabilityFeature.ETHICAL_SOURCING],
    coffeeTypes: [CoffeeType.LATTE_MACCHIATO, CoffeeType.CAPPUCCINO],
    amenities: [Offer.FREE_WATER, Offer.STUDY_FRIENDLY]
  },
  {
    slug: 'cafe-morgenrot',
    name: 'Café Morgenrot',
    brand: 'Morgenrot',
    address: 'Morgenstraße 1, 80469 München',
    coords: { lat: 48.130000, lng: 11.570000 },
    images: [
      '/images/cafes/cafe-morgenrot/cover.png',
      '/images/cafes/cafe-morgenrot/coffees.jpg',
      '/images/cafes/cafe-morgenrot/customer.jpg'
    ],
    aboutCafe: 'A sunrise-themed café perfect for early risers and breakfast lovers.',
    aboutCoffee: 'Light roasts and breakfast blends.',
    sustainabilityFeatures: [SustainabilityFeature.SMALL_BATCH_ROASTING],
    coffeeTypes: [CoffeeType.AMERICANO, CoffeeType.ESPRESSO],
    amenities: [Offer.WIFI, Offer.FREE_CHARGING]
  },
  {
    slug: 'espresso-bar',
    name: 'Espresso Bar',
    brand: 'Espresso Bar',
    address: 'Barstraße 7, 80339 München',
    coords: { lat: 48.140000, lng: 11.550000 },
    images: [
      '/images/cafes/espresso-bar/cover.png',
      '/images/cafes/espresso-bar/coffees.jpg',
      '/images/cafes/espresso-bar/customer.jpg'
    ],
    aboutCafe: 'A small but lively bar specializing in espresso drinks.',
    aboutCoffee: 'Espresso, doppio, and macchiato.',
    sustainabilityFeatures: [SustainabilityFeature.ARABICA_ONLY],
    coffeeTypes: [CoffeeType.ESPRESSO],
    amenities: [Offer.INDOOR_SITTING, Offer.FREE_WATER]
  },
  {
    slug: 'petit-cafe',
    name: 'Petit Café',
    brand: 'Petit',
    address: 'Französische Straße 3, 80333 München',
    coords: { lat: 48.145000, lng: 11.565000 },
    images: [
      '/images/cafes/petit-cafe/cover.png',
      '/images/cafes/petit-cafe/coffees.jpg',
      '/images/cafes/petit-cafe/customer.jpg'
    ],
    aboutCafe: 'A French-inspired café with fresh pastries and a sunny terrace.',
    aboutCoffee: 'French press and café au lait.',
    sustainabilityFeatures: [SustainabilityFeature.ECO_FRIENDLY_PACKAGING],
    coffeeTypes: [CoffeeType.LATTE_MACCHIATO, CoffeeType.CAPPUCCINO],
    amenities: [Offer.OUTDOOR_SITTING, Offer.PET_FRIENDLY]
  },
  {
    slug: 'study-hub-cafe',
    name: 'Study Hub Café',
    brand: 'Study Hub',
    address: 'Studentenweg 10, 80802 München',
    coords: { lat: 48.160000, lng: 11.590000 },
    images: [
      '/images/cafes/study-hub-cafe/cover.png',
      '/images/cafes/study-hub-cafe/coffees.jpg',
      '/images/cafes/study-hub-cafe/customer.jpg'
    ],
    aboutCafe: 'A café designed for students and remote workers, with plenty of outlets and fast Wi-Fi.',
    aboutCoffee: 'Affordable filter coffee and espresso.',
    sustainabilityFeatures: [SustainabilityFeature.ETHICAL_SOURCING],
    coffeeTypes: [CoffeeType.AMERICANO, CoffeeType.ESPRESSO],
    amenities: [Offer.STUDY_FRIENDLY, Offer.WIFI, Offer.FREE_CHARGING]
  }
]

const seedDatabase = async () => {
  try {
    // 1. Verbindung zur Datenbank herstellen
    const dbUri = process.env.MONGO_URI
    if (!dbUri) {
      throw new Error('MONGO_URI is not defined in your .env file')
    }
    await mongoose.connect(dbUri)
    console.log('🌱 Database connection successful.')

    // 2. Bestehende Daten löschen (direkt auf dem Modell aufgerufen)
    console.log('🗑️  Deleting existing membership types...')
    await MembershipType.deleteMany({}) // KORRIGIERT
    console.log('✅ Existing data cleared.')

    // Delete existing coffee shops
    console.log('🗑️  Deleting existing coffee shops...')
    await CoffeeShop.deleteMany({})
    console.log('✅ Existing coffee shops cleared.')

    // 3. Neue Daten einfügen (direkt auf dem Modell aufgerufen)
    console.log('➕ Inserting new seed data...')
    await MembershipType.insertMany(membershipTypesToSeed) // KORRIGIERT
    console.log('✅ Seed data inserted successfully.')

    // Insert new coffee shops
    console.log('➕ Inserting new coffee shops...')
    await CoffeeShop.insertMany(coffeeShopsToSeed)
    console.log('✅ Coffee shops seeded successfully.')
  } catch (err) {
    console.error('🔥 Error during database seeding:', err)
    process.exit(1)
  } finally {
    // 4. Datenbankverbindung schließen
    await mongoose.disconnect()
    console.log('🔌 Database connection closed.')
  }
}

// Skript ausführen
seedDatabase()
