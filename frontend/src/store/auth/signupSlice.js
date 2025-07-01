// src/store/slices/signupSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { registerMemberAction } from '../../store/auth/Auth.actions.js' // Pfad anpassen

const initialState = {
  firstName: '',
  lastName: '',
  subscribe: '',
  email: '',
  password: '',
  plan: null,
  loading: false,
  error: null,
}

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setRegistrationDetails: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.subscribe = action.payload.subscribe
      state.email = action.payload.email
      state.password = action.payload.password
    },
    setPlanDetails: (state, action) => {
      state.plan = action.payload.plan
    },
    clearSignupForm: (state) => {
      state.email = ''
      state.password = ''
      state.plan = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerMemberAction.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerMemberAction.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(registerMemberAction.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setRegistrationDetails, setPlanDetails, clearSignupForm } =
  signupSlice.actions

export default signupSlice.reducer
