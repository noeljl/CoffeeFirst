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

export const registerMemberAction = createAsyncThunk(
  'auth/registerMember',
  async (registrationData, thunkAPI) => {
    // Benenne 'credentials' um in 'registrationData' für mehr Klarheit
    try {
      // Zugriff auf den Redux-Store, um den aktuellen Zustand zu erhalten
      // const state = thunkAPI.getState();
      // const { email, password, plan } = state.signup; // Hier holst du die Daten aus dem Redux-Store

      // Wenn du alle Daten direkt als Argument übergibst (empfohlen für diese Aktion):
      await registerMember(registrationData) // registrationData sollte hier alle benötigten Felder enthalten
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
