import { createSlice } from '@reduxjs/toolkit'
import {
  registerEventAction,
  updateEventAction,
  deleteEventAction,
  fetchEventsAction,
  fetchEventAction, // Hinzugefügt
  updateEventCategoryAction,
} from './Events.actions.js'

const initialState = {
  events: [], // Speicherort für die Eventdaten
  event: null, // Speicherort für ein einzelnes Event
  error: null,
  loading: false, // Wird verwendet, um den Ladezustand zu verfolgen
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Registration success
      .addCase(registerEventAction.fulfilled, (state, action) => {
        state.error = null
      })
      // Registration failure
      .addCase(registerEventAction.rejected, (state, action) => {
        state.error = action.error.message
      })
      // Update success
      .addCase(updateEventAction.fulfilled, (state, action) => {
        state.error = null
      })
      // Update failure
      .addCase(updateEventAction.rejected, (state, action) => {
        state.error = action.error.message
      })
      // Delete success
      .addCase(deleteEventAction.fulfilled, (state, action) => {
        state.error = null
      })
      // Delete failure
      .addCase(deleteEventAction.rejected, (state, action) => {
        state.error = action.error.message
      })
      // Fetch events - pending state
      .addCase(fetchEventsAction.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // Fetch events - success state
      .addCase(fetchEventsAction.fulfilled, (state, action) => {
        state.loading = false
        state.events = action.payload // Setze die abgerufenen Eventdaten
      })
      // Fetch events - failure state
      .addCase(fetchEventsAction.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Fetch a single event - pending state
      .addCase(fetchEventAction.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // Fetch a single event - success state
      .addCase(fetchEventAction.fulfilled, (state, action) => {
        state.loading = false
        state.event = action.payload // Speichere das abgerufene Event
      })
      // Fetch a single event - failure state
      .addCase(fetchEventAction.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Update category success
      .addCase(updateEventCategoryAction.fulfilled, (state, action) => {
        state.error = null
      })
      // Update category failure
      .addCase(updateEventCategoryAction.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

// Export reducer function by default
export default eventsSlice.reducer
