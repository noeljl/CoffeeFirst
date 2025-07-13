import { createSlice } from '@reduxjs/toolkit'
import {
  checkLoginStatus,
  loginMemberAction,
  registerMemberAction,
} from './Auth.actions.js'

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  error: null,
  member: null,
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
      .addCase(registerMemberAction.pending, (state) => {
        state.isFetching = true
        state.error = null
      })

      // Login Member success
      .addCase(loginMemberAction.fulfilled, (state, action) => {
        const { isAuthenticated, member } = action.payload // Assuming member is returned
        state.isFetching = false
        state.isAuthenticated = isAuthenticated
        state.member = member.member
        state.error = null
        console.log(
          'Member ist jetzt gesetzt auf ' + JSON.stringify(state.member)
        )
      })

      // Login Member failure
      .addCase(loginMemberAction.rejected, (state, action) => {
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
