import { createSlice } from '@reduxjs/toolkit'
import {
  checkLoginStatus,
  loginMemberAction,
  registerMemberAction,
  loginEventAttendeeAction,
} from './Auth.actions.js'

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Check login status success
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { isAuthenticated } = action.payload
        state.isAuthenticated = isAuthenticated
      })

      // Login Member success
      .addCase(loginMemberAction.fulfilled, (state, action) => {
        const { isAuthenticated } = action.payload
        state.isAuthenticated = isAuthenticated
        state.error = null
      })

      // Login Member failure
      .addCase(loginMemberAction.rejected, (state, action) => {
        state.isAuthenticated = false
        state.error = action.payload || 'Login failed'
      })

      // Login Event Attendee success
      .addCase(loginEventAttendeeAction.fulfilled, (state, action) => {
        const { isAuthenticated } = action.payload
        state.isAuthenticated = isAuthenticated
        state.error = null
      })

      // Login Event Attendee failure
      .addCase(loginEventAttendeeAction.rejected, (state, action) => {
        state.isAuthenticated = false
        state.error = action.payload || 'Login failed'
      })

      // Register Member success
      .addCase(registerMemberAction.fulfilled, (state, action) => {
        // Registrierung erfolgreich, könnte optional Flags setzen
        state.error = null
      })

      // Register Member failure
      .addCase(registerMemberAction.rejected, (state, action) => {
        state.isAuthenticated = false
        state.error = action.payload || 'Registration failed'
      })
  },
})

export default authSlice.reducer
