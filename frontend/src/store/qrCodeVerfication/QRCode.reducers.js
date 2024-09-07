import { createSlice } from '@reduxjs/toolkit'
import { validateQRCodeAction } from './QRCode.actions.js'

const qrCodeSlice = createSlice({
  name: 'qrcode',
  initialState: {
    isQRCodeValid: false,
    event: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(validateQRCodeAction.fulfilled, (state, action) => {
        state.isQRCodeValid = action.payload.isValid
        state.event = action.payload.event
        console.log('event is valid ' + state.event)
      })
      .addCase(validateQRCodeAction.rejected, (state, action) => {
        state.isQRCodeValid = false
        state.error = action.payload || 'Verifizierung fehlgeschlagen'
      })
  },
})

export default qrCodeSlice.reducer
