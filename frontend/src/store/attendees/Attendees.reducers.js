import { createSlice } from '@reduxjs/toolkit'
import { checkLoginStatus, loginUser, registerUser } from './Auth.actions.js'

const initialState = {
  error: null,
}

// Bin mir nicht sicher, ob wir hier einen Slice brauchen
const attendeesSlice = createSlice({
  name: 'attendees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Registration success
      .addCase(registerUser.fulfilled, (state, action) => {
        const { error } = action.payload
        state.error = error
      })
      // Registration failure
      .addCase(registerUser.rejected, (state, action) => {
        const { error } = action.payload
        state.error = error
      })
  },
})

// Export reducer function by default
export default attendeesSlice.reducer
