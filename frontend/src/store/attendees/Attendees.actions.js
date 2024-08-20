// npm install @reduxjs/toolkit
import { createAsyncThunk } from '@reduxjs/toolkit'
import { registerAttendee } from '../../apis/attendee.js'

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
