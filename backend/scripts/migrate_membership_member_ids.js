import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import { MembersModel } from '../models/member.js'
import { MembershipModel } from '../models/membership.js'

dotenv.config()

const migrateMembershipMemberIds = async () => {
  try {
    // Connect to database
    const dbUri = process.env.MONGO_URI
    if (!dbUri) {
      throw new Error('MONGO_URI is not defined in your .env file')
    }
    await mongoose.connect(dbUri)
    console.log('🌱 Database connection successful.')

    // Get all memberships that still have ObjectId in member field
    const memberships = await mongoose.model('Membership').find({
      member: { $type: 'objectId' },
    })

    console.log(
      `Found ${memberships.length} memberships with ObjectId member references`
    )

    for (const membership of memberships) {
      try {
        // Find the member by _id (MongoDB ObjectId)
        const member = await mongoose
          .model('Member')
          .findById(membership.member)

        if (!member) {
          console.log(
            `⚠️  Member with _id ${membership.member} not found, skipping membership ${membership._id}`
          )
          continue
        }

        // Check if member has a UUID
        if (!member.id) {
          console.log(`⚠️  Member ${member._id} has no UUID, generating one...`)
          member.id = uuidv4()
          await member.save()
        }

        // Update membership to use UUID instead of ObjectId
        membership.member = member.id
        await membership.save()

        console.log(
          `✅ Updated membership ${membership._id}: member ObjectId ${membership.member} → UUID ${member.id}`
        )
      } catch (error) {
        console.error(
          `❌ Error updating membership ${membership._id}:`,
          error.message
        )
      }
    }

    console.log('🎉 Migration completed!')
  } catch (err) {
    console.error('🔥 Error during migration:', err)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Database connection closed.')
  }
}

migrateMembershipMemberIds()
