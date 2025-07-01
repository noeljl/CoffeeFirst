// backend/scripts/seed.js
// Injects some static Instances into the database, which
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { MembershipType } from '../models/membershipType.js'

import { MembershipTier, MembershipPrice, CoffeeType } from '../models/enums.js'

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

    // 3. Neue Daten einfügen (direkt auf dem Modell aufgerufen)
    console.log('➕ Inserting new seed data...')
    await MembershipType.insertMany(membershipTypesToSeed) // KORRIGIERT
    console.log('✅ Seed data inserted successfully.')
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
