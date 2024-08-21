import { createSlice } from '@reduxjs/toolkit'
import {
  registerAttendeeAction,
  updateAttendeeAction,
  deleteAttendeeAction,
  fetchAttendeesAction,
  updateTimesAttendedAction,
} from '../attendees/Attendees.actions.js'

const initialState = {
  attendees: [], // Speicherort für die Teilnehmerdaten
  error: null,
  loading: false, // Wird verwendet, um den Ladezustand zu verfolgen
}

const attendeesSlice = createSlice({
  name: 'attendees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Registration success
      .addCase(registerAttendeeAction.fulfilled, (state, action) => {
        state.error = null
      })
      // Registration failure
      .addCase(registerAttendeeAction.rejected, (state, action) => {
        state.error = action.error.message
      })
      // Update success
      .addCase(updateAttendeeAction.fulfilled, (state, action) => {
        state.error = null
      })
      // Update failure
      .addCase(updateAttendeeAction.rejected, (state, action) => {
        state.error = action.error.message
      })
      // Delete success
      .addCase(deleteAttendeeAction.fulfilled, (state, action) => {
        state.error = null
      })
      // Delete failure
      .addCase(deleteAttendeeAction.rejected, (state, action) => {
        state.error = action.error.message
      })
      // Fetch attendees - pending state
      .addCase(fetchAttendeesAction.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // Fetch attendees - success state
      .addCase(fetchAttendeesAction.fulfilled, (state, action) => {
        // console.log('reducer/attendees ' + JSON.stringify(response))
        state.loading = false
        state.attendees = action.payload // Setze die abgerufenen Teilnehmerdaten
      })
      // Fetch attendees - failure state
      .addCase(fetchAttendeesAction.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Delete success
      .addCase(updateTimesAttendedAction.fulfilled, (state, action) => {
        state.error = null
      })
      // Delete failure
      .addCase(updateTimesAttendedAction.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

// Export reducer function by default
export default attendeesSlice.reducer
