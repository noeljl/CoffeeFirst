// npm install @reduxjs/toolkit
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getMemberById, updateMemberByID} from '../../apis/member.js' 

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
  'member/updateMemberByID',
  async ({ id, updatedFields }, thunkAPI) => {
    try {
      console.log('updateMemberByIDAction called with', { id, updatedFields })
      const response = await updateMemberByID(id, updatedFields)
      console.log('Response in updateMemberByIDAction ist ', response)
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
  }
)
