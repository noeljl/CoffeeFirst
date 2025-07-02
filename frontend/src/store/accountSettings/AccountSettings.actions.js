// npm install @reduxjs/toolkit
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getMemberByMail,
  updateMemberProfileByMail,
} from '../../apis/member.js'

// Prüfe Login-Status für Member
export const getMemberByMailAction = createAsyncThunk(
  'member/getMemberByMail',
  async (mail, thunkAPI) => {
    try {
      console.log('member/getMemberByMail called')
      const response = await getMemberByMail(mail)
      console.log('Response in getMemberByMailAction ist ', response)

      // Prüfen, ob das Antwortobjekt eine 'data'-Eigenschaft hat, und diese zurückgeben
      // Andernfalls das gesamte Antwortobjekt zurückgeben
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
  }
)

// Prüfe Login-Status für Member
export const updateMemberProfileByMailAction = createAsyncThunk(
  'member/updateMemberProfileByMail',
  // Hier akzeptieren wir ein Objekt { email, updatedFields }
  async ({ email, updatedFields }, thunkAPI) => {
    try {
      console.log(
        'updateMemberProfileByMail called with',
        { email, updatedFields } // Loggen Sie das empfangene Objekt
      )
      console.log(
        'Response in updateMemberProfileByMailAction ist ',
        email,
        updatedFields
      )
      const response = await updateMemberProfileByMail(email, updatedFields)
      console.log('Response in updateMemberProfileByMailAction ist ', response)
      return response
    } catch (err) {
      console.error(
        'Error in updateMemberProfileByMailAction:',
        err.response?.data || err.message
      )
      return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
  }
)
