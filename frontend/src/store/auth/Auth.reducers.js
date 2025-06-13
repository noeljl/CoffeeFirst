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
  // You might want to store user data here if available after login/registration
  // member: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // You could add a logout reducer here if you don't have it elsewhere
    // logout: (state) => {
    //   state.isAuthenticated = false;
    //   state.member = null;
    //   state.error = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      // --- Common pending cases for all async actions ---
      .addCase(checkLoginStatus.pending, (state) => {
        state.isFetching = true
        state.error = null
      })
      .addCase(loginMemberAction.pending, (state) => {
        state.isFetching = true
        state.error = null
      })
      .addCase(loginEventAttendeeAction.pending, (state) => {
        state.isFetching = true
        state.error = null
      })
      .addCase(registerMemberAction.pending, (state) => {
        state.isFetching = true
        state.error = null
      })

      // Check login status success
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { isAuthenticated, member } = action.payload // Assuming member is returned
        state.isFetching = false
        state.isAuthenticated = isAuthenticated
        // state.member = member; // Uncomment if you want to store member data
        state.error = null
      })
      // Check login status failure (optional, as it often means not logged in)
      .addCase(checkLoginStatus.rejected, (state, action) => {
        state.isFetching = false
        state.isAuthenticated = false
        state.error = action.payload || 'Failed to check login status'
      })

      // Login Member success
      .addCase(loginMemberAction.fulfilled, (state, action) => {
        const { isAuthenticated, member } = action.payload // Assuming member is returned
        state.isFetching = false
        state.isAuthenticated = isAuthenticated
        // state.member = member; // Uncomment if you want to store member data
        state.error = null
      })

      // Login Member failure
      .addCase(loginMemberAction.rejected, (state, action) => {
        state.isFetching = false
        state.isAuthenticated = false
        state.error = action.payload || 'Login failed'
      })

      // Login Event Attendee success
      .addCase(loginEventAttendeeAction.fulfilled, (state, action) => {
        const { isAuthenticated, attendee } = action.payload // Assuming attendee is returned
        state.isFetching = false
        state.isAuthenticated = isAuthenticated
        // state.attendee = attendee; // Uncomment if you want to store attendee data
        state.error = null
      })

      // Login Event Attendee failure
      .addCase(loginEventAttendeeAction.rejected, (state, action) => {
        state.isFetching = false
        state.isAuthenticated = false
        state.error = action.payload || 'Login failed'
      })

      // Register Member success
      .addCase(registerMemberAction.fulfilled, (state, action) => {
        state.isFetching = false
        // Optional: If registration automatically logs the user in, set isAuthenticated to true
        // state.isAuthenticated = true;
        state.error = null
      })

      // Register Member failure
      .addCase(registerMemberAction.rejected, (state, action) => {
        state.isFetching = false
        // For registration failure, isAuthenticated should remain false
        state.isAuthenticated = false
        state.error = action.payload || 'Registration failed'
      })
  },
})

export default authSlice.reducer
