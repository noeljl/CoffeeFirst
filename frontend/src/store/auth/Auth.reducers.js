import { createSlice } from '@reduxjs/toolkit'
import {
  checkLoginStatus,
  loginMemberAction,
  registerMemberAction,
  logoutMemberAction,
} from './Auth.actions.js'

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  error: null,
  member: null,
  isInitialized: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Lokaler Logout ohne Server-Call
    clearAuth: (state) => {
      state.isAuthenticated = false
      state.member = null
      state.error = null
    },
    // Fehler zurücksetzen
    clearError: (state) => {
      state.error = null
    },
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
      .addCase(logoutMemberAction.pending, (state) => {
        state.isFetching = true
        state.error = null
      })

      // --- Check Login Status ---
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        console.log(
          'checkLoginStatus.fulfilled called with payload:',
          action.payload
        )
        const { isAuthenticated, member } = action.payload
        state.isFetching = false
        state.isAuthenticated = isAuthenticated
        state.member = member
        state.error = null
        state.isInitialized = true
        console.log('Auth Status gecheckt:', { isAuthenticated, member })
        console.log('State after update:', {
          isAuthenticated: state.isAuthenticated,
          member: state.member,
          isInitialized: state.isInitialized,
        })
      })
      .addCase(checkLoginStatus.rejected, (state, action) => {
        state.isFetching = false
        state.isAuthenticated = false
        state.member = null
        state.error = action.payload || 'Auth check failed'
        state.isInitialized = true
      })
      // --- Login Member ---
      .addCase(loginMemberAction.fulfilled, (state, action) => {
        const { isAuthenticated, member } = action.payload
        state.isFetching = false
        state.isAuthenticated = isAuthenticated
        state.member = member
        state.error = null
        state.isInitialized = true
        console.log('Member ist jetzt gesetzt auf:', state.member)
      })
      .addCase(loginMemberAction.rejected, (state, action) => {
        state.isFetching = false
        state.isAuthenticated = false
        state.member = null
        state.error = action.payload || 'Login failed'
      })

      // --- Register Member ---
      .addCase(registerMemberAction.fulfilled, (state, action) => {
        state.isFetching = false
        state.error = null
        // Optional: Auto-login nach Registration
        // const { isAuthenticated, member } = action.payload
        // if (isAuthenticated) {
        //   state.isAuthenticated = true
        //   state.member = member
        // }
      })
      .addCase(registerMemberAction.rejected, (state, action) => {
        state.isFetching = false
        state.isAuthenticated = false
        state.error = action.payload || 'Registration failed'
      })

      // --- Logout Member ---
      .addCase(logoutMemberAction.fulfilled, (state, action) => {
        state.isFetching = false
        state.isAuthenticated = false
        state.member = null
        state.error = null
      })
      .addCase(logoutMemberAction.rejected, (state, action) => {
        state.isFetching = false
        // Auch bei Logout-Fehler lokale Daten löschen
        state.isAuthenticated = false
        state.member = null
        state.error = action.payload || 'Logout failed'
      })
  },
})

export const { clearAuth, clearError } = authSlice.actions
export default authSlice.reducer
