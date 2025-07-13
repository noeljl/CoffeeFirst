import mongoose from 'mongoose'
import MembershipModel from '../models/membership.js'
import Member from '../models/member.js'

// Connect to MongoDB
await mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name'
)

async function fixMembershipData() {
  try {
    console.log('Starting membership data fix...')

    // Get all memberships
    const memberships = await MembershipModel.find()
    console.log(`Found ${memberships.length} memberships`)

    let fixedCount = 0

    for (const membership of memberships) {
      // Check if member field is an ObjectId instead of a string
      if (membership.member && typeof membership.member === 'object') {
        console.log(
          `Fixing membership ${membership._id} with ObjectId member: ${membership.member}`
        )

        // Find the member by ObjectId using the raw Mongoose model
        const member = await Member.findById(membership.member)
        if (member) {
          // Update membership with the correct UUID string
          await MembershipModel.update(membership._id, { member: member.id })
          console.log(
            `Updated membership ${membership._id} with member UUID: ${member.id}`
          )
          fixedCount++
        } else {
          console.log(
            `Warning: Could not find member for ObjectId ${membership.member}`
          )
        }
      }
    }

    console.log(`Fixed ${fixedCount} memberships`)
    console.log('Membership data fix completed')
  } catch (error) {
    console.error('Error fixing membership data:', error)
  } finally {
    await mongoose.disconnect()
  }
}

// Run the fix
fixMembershipData()
