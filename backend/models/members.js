import mongoose from 'mongoose'

const MemberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    google: {
      id: String,
    },
    facebook: {
      id: String,
    },
  },
  { timestamps: true }
)

const Member = mongoose.model('Members', MemberSchema)

class MembersModel {
  async create(data) {
    try {
      const member = new Member(data)
      return await member.save()
    } catch (err) {
      throw new Error(err)
    }
  }

  async update(data) {
    try {
      const { id, ...updateFields } = data
      const updatedUser = await Member.findByIdAndUpdate(id, updateFields, {
        new: true,
      })
      return updatedUser
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOneByMail(email) {
    try {
      return await Member.findOne({ email })
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOneByUsername(username) {
    try {
      return await Member.findOne({ username })
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOneById(id) {
    try {
      return await Member.findById(id)
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOneByGoogleId(id) {
    try {
      return await Member.findOne({ 'google.id': id })
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOneByFacebookId(id) {
    try {
      return await Member.findOne({ 'facebook.id': id })
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default MembersModel
