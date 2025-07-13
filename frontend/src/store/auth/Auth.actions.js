import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  isMemberLoggedIn,
  loginMember,
  registerMember,
  logoutMember,
} from '../../apis/auth.js'

// Prüfe Login-Status für Member
export const checkLoginStatus = createAsyncThunk(
  'auth/checkLogin',
  async (_, thunkAPI) => {
    try {
      console.log('checkLoginStatus action called')
      const response = await isMemberLoggedIn()
      console.log('checkLoginStatus response:', response)

      const result = {
        isAuthenticated: response.isAuthenticated,
        member: response.member,
      }
      console.log('checkLoginStatus returning:', result)
      return result
    } catch (err) {
      console.error('checkLoginStatus error:', err)
      return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
  }
)

// Login für Member
export const loginMemberAction = createAsyncThunk(
  'auth/loginMember',
  async (credentials, thunkAPI) => {
    try {
      console.log('loginMemberAction called with credentials:', credentials)
      const response = await loginMember(credentials)
      console.log('loginMemberAction response:', response)
      return {
        member: response.member,
        isAuthenticated: response.isAuthenticated,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const logoutMemberAction = createAsyncThunk(
  'auth/logoutMember',
  async (_, thunkAPI) => {
    try {
      const response = await logoutMember()
      return { isAuthenticated: false }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const registerMemberAction = createAsyncThunk(
  'auth/registerMember',
  async (registrationData, thunkAPI) => {
    try {
      console.log('registrationData', registrationData)
      const user = await registerMember(registrationData)
      return { user, isAuthenticated: true }
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)
