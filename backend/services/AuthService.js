import createError from 'http-errors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import MembersModel from '../models/member.js'
import MembershipTypeModel from '../models/membershipType.js'
import MembershipModel from '../models/membership.js'
import MemberCardModel from '../models/memberCard.js'

class AuthService {
  constructor() {
    this.membersModel = new MembersModel()
  }

  async register(input) {

    console.log("input", input)

    const {
      password,
      firstName,
      lastName,
      email,
      plan,
      subscribe = false,
    } = input

    // 1) Doppelter Nutzer?
    if (await this.membersModel.findOneByEmail(email)) {
      throw createError(409, 'Email already registered')
    }

    // 2) Plan validieren
    const membershipType = await MembershipTypeModel.findByName(plan.name)
    if (!membershipType) {
      throw createError(400, 'Unknown membership plan')
    }

    // 3) Daten vorbereiten
    const now = new Date()
    const end = new Date(now)
    end.setDate(now.getDate() + (membershipType.durationDays ?? 30))
    const passwordHash = await bcrypt.hash(password, 10)

    // 4) IDs erzeugen
    const memberId = new mongoose.Types.ObjectId()
    const membershipId = new mongoose.Types.ObjectId()
    const memberCardId = new mongoose.Types.ObjectId()

    try {
      // a) Membership anlegen
      const membership = await MembershipModel.create({
        _id: membershipId,
        member: memberId,
        chosenMembership: membershipType._id,
        startDate: now,
        endDate: end,
        payDate: now,
        coffeeQuotaLeft: membershipType.coffeeQuota ?? 0,
      })

      // b) MemberCard anlegen
      const memberCard = await MemberCardModel.create({
        _id: memberCardId,
        name: `${firstName} ${lastName}`,
        coffeeType: membershipType.coffeeTypes[0],
        cardCode: crypto.randomBytes(6).toString('hex'),
        membershipTier: membershipType.membershipTier,
        membership: membership._id,
      })

      // c) Member anlegen
      const member = await this.membersModel.create({
        _id: memberId,
        firstName,
        lastName,
        email,
        passwordHash,
        subscribe,
        membership: membership._id,
        memberCard: memberCard._id,
        stripeCustomerId: input.customerId,
        stripeSubscriptionId: input.subscriptionId,
        paymentStatus: "Success",
        subscriptionPeriodEnd: input.subscriptionPeriodEnd
      })

      return this.membersModel.findOneById(member.id)
    } catch (err) {
      // Im Fehlerfall: optional Cleanup
      console.error('Registration failed, cleaning up:', err)
      // z.B. Membership.deleteOne({ _id: membershipId }), usw.
      throw createError(
        500,
        `Registration could not be completed: ${err.message}`
      )
    }
  }

  /* ---------- Login ---------- */
  async loginMember({ email, password }) {
    const member = await this.membersModel.findOneByEmail(email)
    if (!member) throw createError(401, 'Incorrect username or password')

    const isMatch = await bcrypt.compare(password, member.passwordHash)
    if (!isMatch) throw createError(401, 'Incorrect username or password')

    return member // JWT-Erstellung z. B. hier anhängen
  }
}

export default AuthService
