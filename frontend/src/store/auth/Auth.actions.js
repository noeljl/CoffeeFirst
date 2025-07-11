// npm install @reduxjs/toolkit
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  isMemberLoggedIn,
  loginMember,
  registerMember,
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
      console.log('loginMemberAction called with credentials ' + credentials)
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
    try {
      console.log("registrationData", registrationData)
      const user = await registerMember(registrationData)
      return { user, isAuthenticated: true }
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)
