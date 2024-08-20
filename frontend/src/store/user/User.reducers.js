import { createSlice } from '@reduxjs/toolkit'
import { checkLoginStatus, loginUser } from '../auth/Auth.actions.js'

const initialState = {
  user: null, // initialer Zustand
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload
        console.log('Daten in UserReducer:', user) // Debug: Zeigt an, welche Daten ankommen
        state.user = user
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { user } = action.payload
        console.log('Check Login Status:', user) // Debug: Zeigt an, welche Daten ankommen
        state.user = user
      })
  },
})

// Export reducer function by default
export default userSlice.reducer
