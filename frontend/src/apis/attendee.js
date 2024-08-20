import API from './client.js'

// API interface for loading the user's profile
export const registerAttendee = async (data) => {
  try {
    const response = await API.post('attendees/register', data)
    // console.log('Full response:', response) // Debug-Ausgabe
    return response.data
  } catch (err) {
    // console.error('Error:', err) // Fehlerprotokollierung
    throw err.response ? err.response.data : err // Anpassung für Fehler ohne `response`
  }
}
