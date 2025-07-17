// File: /your-project/test/createMember.test.js

import mongoose from 'mongoose'
import MemberModel from '../member.js' // Pfad zu Ihrer Member-Model-Datei
import MemberCardModel from '../memberCard.js' // Pfad zu Ihrer MemberCard-Model-Datei

const TEST_DB_URI = 'mongodb://mongodb:27017/admin' // ERSETZEN SIE DIES BEI BEDARF

async function runTest() {
  let createdMember = null
  let createdMemberCard = null

  try {
    // 1. Verbindung zur Datenbank herstellen
    console.log('Connecting to MongoDB...')
    await mongoose.connect(TEST_DB_URI)
    console.log('MongoDB connected successfully!')

    // 2. Eine MemberCard für den Member erstellen
    console.log('Creating a dummy MemberCard...')
    const memberCardData = {
      name: `TestCard_${Date.now()}`,
      coffeeType: 'FlatWhite', // Muss aus dem CoffeeType Enum stammen
      cardCode: `CODE${Date.now()}`,
      membershipTier: 'Silver', // Muss aus dem MembershipTier Enum stammen
    }
    createdMemberCard = await MemberCardModel.create(memberCardData)
    console.log('Dummy MemberCard created:', createdMemberCard._id)

    // 3. Member-Daten vorbereiten
    console.log('Preparing Member data...')
    const memberData = {
      firstName: 'Test',
      lastName: 'User',
      email: `test.user.${Date.now()}@example.com`,
      password: 'SecurePassword123!',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'Male', // Muss aus dem Gender Enum stammen
      memberCard: createdMemberCard._id, // Verknüpfung mit der gerade erstellten MemberCard
    }

    // 4. Member erstellen
    console.log('Creating Member...')
    createdMember = await MemberModel.create(memberData)
    console.log('Member created successfully:', createdMember)
    console.log('Member ID:', createdMember._id)
    console.log('Member Email:', createdMember.email)
    console.log('Member Card ID:', createdMember.memberCard)

    // 5. Member finden und überprüfen
    console.log('Verifying Member creation by finding by ID...')
    const foundMember = await MemberModel.findById(createdMember._id)
    if (foundMember) {
      console.log('Member found:', foundMember.email)
      console.log('Populated MemberCard name:', foundMember.memberCard.name)
    } else {
      console.error('ERROR: Member not found after creation!')
    }
  } catch (error) {
    console.error('Test failed with an error:', error.message)
    if (error.name === 'ValidationError' && error.errors) {
      for (const field in error.errors) {
        console.error(`  ${field}: ${error.errors[field].message}`)
      }
    }
  } finally {
    // 6. Aufräumen: Erstellten Member und MemberCard löschen
    console.log('\nCleaning up...')
    if (createdMember) {
      try {
        await MemberModel.delete(createdMember._id)
        console.log(`Member ${createdMember._id} deleted.`)
      } catch (cleanupErr) {
        console.error(`Error during Member cleanup: ${cleanupErr.message}`)
      }
    }
    if (createdMemberCard) {
      try {
        await MemberCardModel.delete(createdMemberCard._id)
        console.log(`MemberCard ${createdMemberCard._id} deleted.`)
      } catch (cleanupErr) {
        console.error(`Error during MemberCard cleanup: ${cleanupErr.message}`)
      }
    }

    // 7. Datenbankverbindung schließen
    console.log('Closing MongoDB connection...')
    await mongoose.disconnect()
    console.log('MongoDB disconnected.')
  }
}

// Test ausführen
runTest()
