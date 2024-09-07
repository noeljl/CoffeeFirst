// npm install @reduxjs/toolkit
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  isLoggedIn,
  login,
  register,
  loginEventAttendee,
} from '../../apis/auth.js'

export const checkLoginStatus = createAsyncThunk(
  'auth/checkLogin',
  async (param, thunkAPI) => {
    try {
      const response = await isLoggedIn()

      return {
        isAuthenticated: true,
        user: response.user,
      }
    } catch (err) {
      throw err
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const user = await login(credentials)
      return { user, isAuthenticated: true }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data) // oder passende Fehlerdaten
    }
  }
)

export const loginEventAttendeeAction = createAsyncThunk(
  'auth/loginEventAttendee',
  async (credentials, thunkAPI) => {
    try {
      const attendee = await loginEventAttendee(credentials)
      console.log(attendee)
      return { attendee, isAuthenticated: true }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data) // oder passende Fehlerdaten
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, thunkAPI) => {
    try {
      await register(credentials)
      return {}
    } catch (err) {
      throw err
    }
  }
)
