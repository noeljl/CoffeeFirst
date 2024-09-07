import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchAttendeesForEvent,
  updateAttendeesForEvent,
  fetchTotalAttendance,
} from '../../apis/attendeeEvent.js'

// Fetch Attendees for a specific Event
export const fetchAttendeesForEventAction = createAsyncThunk(
  'attendeeEvents/fetchAttendeesForEvent',
  async (eventID, thunkAPI) => {
    try {
      console.log(`Fetching attendees for event with ID: ${eventID}`)
      const attendees = await fetchAttendeesForEvent(eventID)
      console.log('Fetched attendees: ', attendees) // Checkpoint 1
      return attendees
    } catch (err) {
      console.error('Error fetching attendees: ', err) // Checkpoint 2
      return thunkAPI.rejectWithValue(err.response ? err.response.data : err)
    }
  }
)

// Update the number of times an attendee attended an event
export const updateAttendeesForEventAction = createAsyncThunk(
  'attendeeEvents/updateAttendeesForEvent',
  async (updateData, thunkAPI) => {
    try {
      console.log('Updating attendee event data: ', JSON.stringify(updateData))
      const updatedAttendeeEvent = await updateAttendeesForEvent(updateData)
      console.log(
        'Updated attendee event: ',
        JSON.stringify(updatedAttendeeEvent)
      )
      return updatedAttendeeEvent
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response ? err.response.data : err)
    }
  }
)

// Action to fetch the total attendance across all events for all attendees
export const fetchTotalAttendanceAction = createAsyncThunk(
  'attendeeEvents/fetchTotalAttendance',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching attendance in fetchTotalAttendanceAction') // Debugging Log
      const response = await fetchTotalAttendance() // API call
      console.log('Fetched attendance data: ', response) // Debugging Log for API response
      return response
    } catch (err) {
      console.error('Error fetching total attendance: ', err) // Debugging Error
      return rejectWithValue(err.message)
    }
  }
)
