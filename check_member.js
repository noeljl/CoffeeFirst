import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const checkMember = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to database')

    const Member = mongoose.model('Member')
    const Membership = mongoose.model('Membership')

    const memberId = 'c3615507-59bb-4a27-84d3-373e297ce86e'

    // Check if member exists
    const member = await Member.findOne({ id: memberId })
    console.log(
      'Member found:',
      member
        ? {
            id: member.id,
            email: member.email,
            _id: member._id,
          }
        : 'Not found'
    )

    // Check if membership exists for this member
    const membership = await Membership.findOne({ member: memberId })
    console.log(
      'Membership found:',
      membership
        ? {
            id: membership._id,
            member: membership.member,
          }
        : 'Not found'
    )

    // Check all memberships to see what's in the database
    const allMemberships = await Membership.find({})
    console.log(
      'All memberships:',
      allMemberships.map((m) => ({
        _id: m._id,
        member: m.member,
        memberType: typeof m.member,
      }))
    )

    await mongoose.disconnect()
  } catch (error) {
    console.error('Error:', error)
  }
}

checkMember()
