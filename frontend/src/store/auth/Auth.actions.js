// npm install @reduxjs/toolkit
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  isMemberLoggedIn,
  loginMember,
  registerMember,
  loginEventAttendee,
} from '../../apis/auth.js'

// Prüfe Login-Status für Member
export const checkLoginStatus = createAsyncThunk(
  'auth/checkLogin',
  async (_, thunkAPI) => {
    try {
      const response = await isMemberLoggedIn()

      return {
        isAuthenticated: true,
        member: response.member,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
  }
)

// Login für Member
export const loginMemberAction = createAsyncThunk(
  'auth/loginMember',
  async (credentials, thunkAPI) => {
    try {
      const member = await loginMember(credentials)
      return { member, isAuthenticated: true }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
  }
)

// Registrierung für Member
export const registerMemberAction = createAsyncThunk(
  'auth/registerMember',
  async (credentials, thunkAPI) => {
    try {
      await registerMember(credentials)
      return {}
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
  }
)

// Login für Event Attendee
export const loginEventAttendeeAction = createAsyncThunk(
  'auth/loginEventAttendee',
  async (credentials, thunkAPI) => {
    try {
      const attendee = await loginEventAttendee(credentials)
      return { attendee, isAuthenticated: true }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
  }
)
