import authRouter from './auth.js'
import userRoute from './user.js'

const routeLoader = (app, passport) => {
  authRouter(app, passport)
  userRoute(app)
}

export default routeLoader
