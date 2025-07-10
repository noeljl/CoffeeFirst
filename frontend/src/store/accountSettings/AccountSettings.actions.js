// npm install @reduxjs/toolkit
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getMemberById,
  updateMember,
  changeMemberPassword,
} from '../../apis/member.js'

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL'

// Prüfe Login-Status für Member
export const getMemberByIdAction = createAsyncThunk(
  'member/getMemberById',
  async (id, thunkAPI) => {
    try {
      console.log('getMemberByIdAction called with', { id })
      const response = await getMemberById(id)
      console.log('Response in getMemberByIdAction ist ', response)

      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
  }
)

// Prüfe Login-Status für Member
export const updateMemberByIDAction = createAsyncThunk(
  'member/update',
  // PayloadCreator bekommt genau EIN Objekt
  async (
    /** @type {{ id: string, updatedFields: FormData | Record<string, any> }} */
    { id, updatedFields },
    thunkAPI
  ) => {
    try {
      const result = await updateMember(id, updatedFields)
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
  }
)

export const changeMemberPasswordAction = createAsyncThunk(
  'accountSettings/changeMemberPassword',
  async ({ id, currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      // Rufen Sie hier Ihre API-Funktion auf, die bereits axios verwendet
      await changeMemberPassword(id, {
        currentPassword,
        newPassword,
      })
      return {} // Nichts in den Redux-State schreiben, nur Erfolg signalisieren
    } catch (err) {
      // Die API-Fehlermeldung bevorzugen, sonst allgemeine Fehlermeldung
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          'Fehler beim Passwort ändern.'
      )
    }
  }
)
