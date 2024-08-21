// npm install @reduxjs/toolkit
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  registerAttendee,
  updateAttendee,
  deleteAttendee,
  fetchAttendees,
  updateTimesAttended,
} from '../../apis/attendee.js'

export const registerAttendeeAction = createAsyncThunk(
  'attendees/registerAttendee',
  async (registerData, thunkAPI) => {
    try {
      const attendee = await registerAttendee(registerData)
      console.log(attendee)
      return {}
    } catch (err) {
      throw err
    }
  }
)

export const updateAttendeeAction = createAsyncThunk(
  'attendees/updateAttendee',
  async (updateData, thunkAPI) => {
    try {
      const attendee = await updateAttendee(updateData)
      console.log(attendee)
      return {}
    } catch (err) {
      throw err
    }
  }
)

export const deleteAttendeeAction = createAsyncThunk(
  'attendees/deleteAttendee',
  async (deleteData, thunkAPI) => {
    try {
      const attendee = await deleteAttendee(deleteData)
      console.log(attendee)
      return {}
    } catch (err) {
      throw err
    }
  }
)

export const fetchAttendeesAction = createAsyncThunk(
  'attendees/fetchAttendees',
  async (_, thunkAPI) => {
    try {
      console.log('fetchAttendeesAction activated')
      const attendees = await fetchAttendees()
      console.log('action/attendees ' + JSON.stringify(attendees))
      return attendees
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response ? err.response.data : err)
    }
  }
)

export const updateTimesAttendedAction = createAsyncThunk(
  'attendees/updateTimesAttended',
  async ({ attendeeId, incrementBy }, thunkAPI) => {
    try {
      console.log('Kommt an bei attendees/updateTimesAttended: ' + attendeeId)
      const updatedAttendee = await updateTimesAttended(attendeeId, incrementBy)
      return updatedAttendee
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response ? err.response.data : err.message
      )
    }
  }
)
