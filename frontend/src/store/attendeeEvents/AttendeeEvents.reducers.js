import { createSlice } from '@reduxjs/toolkit'
import {
  fetchAttendeesForEventAction,
  updateAttendeesForEventAction,
  fetchTotalAttendanceAction, // Neue Action für das Abrufen der aggregierten Daten
} from './AttendeeEvents.actions.js'

const initialState = {
  eventAttendees: [], // Teilnehmer eines bestimmten Events
  totalAttendance: [], // Aggregierte Teilnehmerdaten über alle Events hinweg
  loading: false,
  error: null,
}

const attendeeEventsSlice = createSlice({
  name: 'attendeeEvents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching attendees for a specific event
      .addCase(fetchAttendeesForEventAction.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAttendeesForEventAction.fulfilled, (state, action) => {
        state.loading = false
        state.eventAttendees = action.payload // Event-Teilnehmer in den State einfügen
      })
      .addCase(fetchAttendeesForEventAction.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // Handle updating times attended for an attendee at a specific event
      .addCase(updateAttendeesForEventAction.fulfilled, (state, action) => {
        const { attendeeId, timesAttended } = action.payload
        const attendee = state.eventAttendees.find(
          (a) => a.attendee_id === attendeeId
        )
        if (attendee) {
          attendee.times_attended = timesAttended // Teilnehmer-Daten aktualisieren
        }
      })

      // Handle fetching total attendance for all events
      .addCase(fetchTotalAttendanceAction.pending, (state) => {
        console.log('fetchTotalAttendanceAction pending') // Debugging Log
        state.loading = true
        state.error = null
      })
      .addCase(fetchTotalAttendanceAction.fulfilled, (state, action) => {
        console.log('fetchTotalAttendanceAction fulfilled', action.payload) // Debugging Log
        state.loading = false
        state.totalAttendance = action.payload
      })
      .addCase(fetchTotalAttendanceAction.rejected, (state, action) => {
        console.log('fetchTotalAttendanceAction rejected', action.payload) // Debugging Log
        state.loading = false
        state.error = action.payload
      })
  },
})

export default attendeeEventsSlice.reducer
