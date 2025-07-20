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
    console.log('input', input)
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

    console.log('membershipType service', membershipType)
    console.log('membershipType name ', plan.name)
    console.log('membershipType.coffeeQuota', membershipType.coffeeQuota)

    // 3) Daten vorbereiten
    const now = new Date()
    const end = new Date(now)
    end.setDate(now.getDate() + (membershipType.durationDays ?? 30))
    const passwordHash = await bcrypt.hash(password, 10)

    // 4) IDs erzeugen
    const membershipId = new mongoose.Types.ObjectId()
    const memberCardId = new mongoose.Types.ObjectId()

    // Variablen für Cleanup
    let createdMembership = null
    let createdMemberCard = null
    let createdMember = null

    try {
      // a) Member zuerst anlegen (mit temporären Referenzen)
      const member = await this.membersModel.create({
        firstName,
        lastName,
        email,
        passwordHash,
        subscribe,
        membership: membershipId, // Verwende die vorbereitete ID
        memberCard: memberCardId, // Verwende die vorbereitete ID
        stripeCustomerId: input.customerId,
        stripeSubscriptionId: input.subscriptionId,
        paymentStatus: 'Success',
        subscriptionPeriodEnd: input.subscriptionPeriodEnd,
      })
      createdMember = member

      // b) Membership anlegen (mit der echten Member UUID)
      const membership = await MembershipModel.create({
        _id: membershipId,
        member: member.id, // Verwende die echte Member UUID
        chosenMembership: membershipType._id,
        startDate: now,
        endDate: end,
        payDate: now,
        coffeeQuotaLeft: membershipType.coffeeQuota ?? 0,
      })
      createdMembership = membership

      // c) MemberCard anlegen
      const memberCard = await MemberCardModel.create({
        _id: memberCardId,
        name: `${firstName} ${lastName}`,
        coffeeType: membershipType.coffeeTypes[0],
        cardCode: crypto.randomBytes(6).toString('hex'),
        membershipTier: membershipType.membershipTier,
        membership: membership._id,
      })
      createdMemberCard = memberCard

      return member
    } catch (err) {
      // Im Fehlerfall: Cleanup der bereits erstellten Dokumente
      console.error('Registration failed, cleaning up:', err)

      try {
        // Cleanup in umgekehrter Reihenfolge
        if (createdMemberCard) {
          await MemberCardModel.delete(createdMemberCard._id)
        }
        if (createdMembership) {
          await MembershipModel.delete(createdMembership._id)
        }
        if (createdMember) {
          await this.membersModel.delete(createdMember.id)
        }
      } catch (cleanupErr) {
        console.error('Cleanup failed:', cleanupErr)
        // Cleanup-Fehler sollten nicht den ursprünglichen Fehler überlagern
      }

      // Propagate 409 errors as 409, not as 500
      if (err.status === 409) {
        throw err
      }
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
