import express from 'express'
import UserService from '../services/UserService.js'

const router = express.Router()
const UserServiceInstance = new UserService()

export default (app) => {
  app.use('/api/users', router)

  router.get('/:userId', async (req, res, next) => {
    try {
      const { username } = req.params
      const response = await UserServiceInstance.getByUsername({ username: username })
      if (response) {
        res.status(200).json(response) // Ensure this is always called
      } else {
        res.status(404).send('User not found')
      }
    } catch (err) {
      next(err) // This will pass the error to the error handler middleware
    }
  })

  router.put('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params
      const data = req.body

    //   console.log("UpdateUser aufgerufen")

      const response = await UserServiceInstance.update({ id: userId, ...data })
    //   console.log(response)
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })
}
