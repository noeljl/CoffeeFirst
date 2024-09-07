import API from './client.js'

// API interface for validating QR-Code for a specific event
export const validateQRCode = async (data) => {
  try {
    const { event_id, token } = data

    console.log('Validating QR Code ... in apis/qrcode')
    console.log(event_id)
    console.log(token)

    const response = await API.post('/QRCode/validateQRCode', {
      event_id,
      token,
    })
    return response.data
  } catch (err) {
    throw err.response ? err.response.data : err
  }
}
