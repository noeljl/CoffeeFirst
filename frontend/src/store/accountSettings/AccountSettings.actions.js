// npm install @reduxjs/toolkit
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getMemberById, updateMember } from '../../apis/member.js'

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
