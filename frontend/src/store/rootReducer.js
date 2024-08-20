// Wennd du hier die Reducers nichts registrierst, funktioniert redux nicht
import { combineReducers } from 'redux'
import authReducer from './auth/Auth.reducers'
import userReducer from './user/User.reducers'

export default combineReducers({
  auth: authReducer,
  user: userReducer,
})
