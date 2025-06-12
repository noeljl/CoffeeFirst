import express from 'express'
import MemberService from '../services/MemberService.js'

const router = express.Router()
const MemberServiceInstance = new MemberService()

export default (app) => {
  app.use('/api/members', router)

  // GET member by username
  router.get('/username/:username', async (req, res, next) => {
    try {
      const { username } = req.params
      const response = await MemberServiceInstance.getByUsername({ username })

      if (response) {
        res.status(200).json(response)
      } else {
        res.status(404).send('Member not found')
      }
    } catch (err) {
      next(err)
    }
  })

  // UPDATE member by ID
  router.put('/:memberId', async (req, res, next) => {
    try {
      const { memberId } = req.params
      const data = req.body

      const response = await MemberServiceInstance.update({
        id: memberId,
        ...data,
      })

      if (response) {
        res.status(200).json(response)
      } else {
        res.status(404).send('Member not found for update')
      }
    } catch (err) {
      next(err)
    }
  })
}
