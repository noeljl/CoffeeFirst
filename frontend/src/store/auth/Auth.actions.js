// npm install @reduxjs/toolkit
import { createAsyncThunk } from '@reduxjs/toolkit'
import { isLoggedIn, login, register } from '../../apis/auth.js'

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
      // console.log('Daten aus loginUser ' + JSON.stringify(user))
      return {
        user, // Es muss ein `user`-Objekt geben
        isAuthenticated: true,
      }
    } catch (err) {
      throw err
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
