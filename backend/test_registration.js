import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AuthService from './services/AuthService.js'
import MembershipTypeModel from './models/membershipType.js'

dotenv.config()

const testRegistration = async () => {
  try {
    // Connect to database
    const dbUri = process.env.MONGO_URI
    if (!dbUri) {
      throw new Error('MONGO_URI is not defined in your .env file')
    }
    await mongoose.connect(dbUri)
    //console.log('🌱 Database connection successful.')

    // Check if membership types exist
    const membershipTypes = await MembershipTypeModel.findAll()
    console.log(
      `Found ${membershipTypes.length} membership types:`,
      membershipTypes.map((mt) => mt.name)
    )

    if (membershipTypes.length === 0) {
      console.log(
        '❌ No membership types found. Please run the seed script first.'
      )
      return
    }

    // Test registration
    const authService = new AuthService()
    const testInput = {
      password: 'testpassword123',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      plan: { name: 'Silver' },
      subscribe: false,
      customerId: 'cus_test123',
      subscriptionId: 'sub_test123',
      subscriptionPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    }

    console.log('🧪 Testing registration with:', testInput)

    const result = await authService.register(testInput)
    console.log('✅ Registration successful!')
    console.log('Member ID:', result.id)
    console.log('Membership ID:', result.membership)
    console.log('Member Card ID:', result.memberCard)

    // Verify the membership was created
    const membership = await mongoose
      .model('Membership')
      .findOne({ member: result.id })
    if (membership) {
      console.log('✅ Membership created successfully')
      console.log('Membership details:', {
        member: membership.member,
        chosenMembership: membership.chosenMembership,
        startDate: membership.startDate,
        endDate: membership.endDate,
        coffeeQuotaLeft: membership.coffeeQuotaLeft,
      })
    } else {
      console.log('❌ Membership not found')
    }
  } catch (err) {
    console.error('🔥 Error during test:', err.message)
    console.error('Stack trace:', err.stack)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Database connection closed.')
  }
}

// Run the test
testRegistration()
