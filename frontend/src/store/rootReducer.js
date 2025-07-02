// Wennd du hier die Reducers nichts registrierst, funktioniert redux nicht
import { combineReducers } from 'redux'
import authReducer from './auth/Auth.reducers'
import accountSettingsReducer from './accountSettings/AccountSettings.reducers'

export default combineReducers({
  auth: authReducer,
  accountSettings: accountSettingsReducer,
})
