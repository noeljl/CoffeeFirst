import { createSlice } from '@reduxjs/toolkit'
import {
  checkLoginStatus,
  loginUser,
  registerUser,
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
      // Login success
      .addCase(loginUser.fulfilled, (state, action) => {
        const { isAuthenticated } = action.payload
        state.isAuthenticated = isAuthenticated
      })
      // Login failure
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false
        state.error = action.payload.error
      })
      // Login Event Attendee success
      .addCase(loginEventAttendeeAction.fulfilled, (state, action) => {
        console.log("Attendee is logged in")
        const { isAuthenticated } = action.payload
        state.isAuthenticated = isAuthenticated
      })
      // Login Event Attendee failure
      .addCase(loginEventAttendeeAction.rejected, (state, action) => {
        state.isAuthenticated = false
        state.error = action.payload.error
      })
      // Registration success
      .addCase(registerUser.fulfilled, (state, action) => {
        // Optionally handle registration success
      })
      // Registration failure
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false
        state.error = action.payload.error
      })
  },
})

export default authSlice.reducer
