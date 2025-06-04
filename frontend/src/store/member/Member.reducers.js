import { createSlice } from '@reduxjs/toolkit'
import { checkLoginStatus, loginMemberAction } from '../auth/Auth.actions.js'

const initialState = {
  member: null, // initialer Zustand
}

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginMemberAction.fulfilled, (state, action) => {
        const { member } = action.payload
        console.log('Daten in MemberReducer:', member) // Debug
        state.member = member
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { member } = action.payload
        console.log('Check Login Status:', member) // Debug
        state.member = member
      })
  },
})

export default memberSlice.reducer
