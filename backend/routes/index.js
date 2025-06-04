import authRouter from './auth.js'
import memberRouter from './member.js'

export default (app) => {
  app.use('/api/auth', authRouter)
  app.use('/api/members', memberRouter)
}
