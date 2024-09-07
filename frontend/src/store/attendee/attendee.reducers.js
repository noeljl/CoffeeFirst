import { createSlice } from '@reduxjs/toolkit'
import { loginEventAttendeeAction } from '../auth/Auth.actions.js'

const initialState = {
  attendee: null, // initialer Zustand
}

const userSlice = createSlice({
  name: 'attendee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginEventAttendeeAction.fulfilled, (state, action) => {
        const { attendee } = action.payload
        console.log('Daten in AttendeeReducer:', attendee) // Debug: Zeigt an, welche Daten ankommen
        state.attendee = attendee
      })
  },
})

// Export reducer function by default
export default userSlice.reducer
