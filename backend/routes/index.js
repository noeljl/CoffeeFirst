import authRouter from './auth.js'
import userRoute from './user.js'
import attendeeRoute from './attendees.js'
import eventsRoute from './events.js'
import attendeeEvents from './attendeeEvents.js'
import qrCode from './qrCode.js'

const routeLoader = (app, passport) => {
  authRouter(app, passport)
  userRoute(app)
  attendeeRoute(app)
  eventsRoute(app)
  attendeeEvents(app)
  qrCode(app)
}

export default routeLoader
