import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { MembersModel } from './models/member.js'
import { MembershipType } from './models/membershipType.js'
import { MembershipModel } from './models/membership.js'
import { MemberCardModel } from './models/memberCard.js'

dotenv.config()

const createTestUser = async () => {
  try {
    // Connect to database
    const dbUri = process.env.MONGO_URI
    if (!dbUri) {
      throw new Error('MONGO_URI is not defined in your .env file')
    }
    await mongoose.connect(dbUri)
    console.log('🌱 Database connection successful.')

    // Get a membership type (Silver)
    const membershipType = await MembershipType.findOne({ name: 'Silver' })
    if (!membershipType) {
      throw new Error(
        'Silver membership type not found. Please run the seed script first.'
      )
    }

    // Create test user data with provided credentials
    const testUserData = {
      firstName: 'Jan',
      lastName: 'Laurens',
      email: 'janlaurens.ohl@gmail.com',
      passwordHash: await bcrypt.hash('pass1234', 10),
      subscribe: true,
      stripeCustomerId: 'cus_test123',
      stripeSubscriptionId: 'sub_test123',
      paymentStatus: 'Success',
      subscriptionPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    }

    // Create membership
    const membership = await MembershipModel.create({
      member: null, // Will be set after member creation
      chosenMembership: membershipType._id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      payDate: new Date(),
      coffeeQuotaLeft: membershipType.coffeeQuota,
    })

    // Create member card
    const memberCard = await MemberCardModel.create({
      name: `${testUserData.firstName} ${testUserData.lastName}`,
      coffeeType: membershipType.coffeeTypes[0],
      cardCode: 'test123',
      membershipTier: membershipType.membershipTier,
      membership: membership._id,
    })

    // Create member
    const member = await MembersModel.create({
      ...testUserData,
      membership: membership._id,
      memberCard: memberCard._id,
    })

    // Update membership with member reference
    await MembershipModel.findByIdAndUpdate(membership._id, {
      member: member._id,
    })

    console.log('✅ Test user created successfully!')
    console.log('Email: janlaurens.ohl@gmail.com')
    console.log('Password: pass1234')
    console.log('Member ID:', member.id)
  } catch (err) {
    console.error('🔥 Error creating test user:', err)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Database connection closed.')
  }
}

createTestUser()
