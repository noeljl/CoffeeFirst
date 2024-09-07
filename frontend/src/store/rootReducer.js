// Wennd du hier die Reducers nichts registrierst, funktioniert redux nicht
import { combineReducers } from 'redux'
import authReducer from './auth/Auth.reducers'
import userReducer from './user/User.reducers'
import attendeesReducer from './attendees/Attendees.reducers'
import attendeesEventsReducer from './attendeeEvents/AttendeeEvents.reducers'
import QRCodeReducers from './qrCodeVerfication/QRCode.reducers'
import attendeeReducers from './attendee/attendee.reducers'

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  attendees: attendeesReducer,
  attendeesEvents: attendeesEventsReducer, // Beachte den korrekten Namen
  QRCode: QRCodeReducers,
  attendee: attendeeReducers,
})
