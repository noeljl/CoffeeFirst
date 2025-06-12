// Wennd du hier die Reducers nichts registrierst, funktioniert redux nicht
import { combineReducers } from 'redux'
import authReducer from './auth/Auth.reducers'
import memberReducer from './member/Member.reducers'

export default combineReducers({
  auth: authReducer,
  member: memberReducer,
})
