import authRouter from './auth.js'
import userRoute from './user.js'
import attendeeRoute from './attendees.js'

const routeLoader = (app, passport) => {
  authRouter(app, passport)
  userRoute(app)
  attendeeRoute(app)
}

export default routeLoader
