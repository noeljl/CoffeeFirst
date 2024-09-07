import { createAsyncThunk } from '@reduxjs/toolkit'
import { validateQRCode } from '../../apis/qrCode.js'

export const validateQRCodeAction = createAsyncThunk(
  'event/validateQRCode',
  async ({ eventID, token }, thunkAPI) => {
    try {
      console.log('Validating QR Code ... in actions/qrcode')
      // Sende die Daten (event_id und token) im Body der Anfrage an die API
      const response = await validateQRCode({ event_id: eventID, token })

      console.log('Valid? ' + eventID)

      // Wenn der QR-Code gültig ist, gib den Status zurück
      return {
        isValid: response.valid,
        event: eventID,
      }
    } catch (err) {
      // Fehler abfangen und entsprechend an Redux übergeben
      return thunkAPI.rejectWithValue(
        err.response?.data || 'Verifizierung fehlgeschlagen'
      )
    }
  }
)
