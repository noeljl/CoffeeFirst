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

// API interface for updating the attendee
export const updateAttendee = async (data) => {
  try {
    const { firstName, middleName, lastName } = data

    const response = await API.put(
      `attendees/${firstName}/${middleName}/${lastName}`,
      data
    )
    return response.data
  } catch (err) {
    throw err.response ? err.response.data : err
  }
}

// API interface for deleting the attendee
export const deleteAttendee = async (data) => {
  try {
    const { firstName, middleName, lastName } = data

    const response = await API.delete(
      `attendees/${firstName}/${middleName}/${lastName}`
    )
    return response.data
  } catch (err) {
    throw err.response ? err.response.data : err
  }
}

// API interface for fetching all attendees
export const fetchAttendees = async () => {
  try {
    const response = await API.get('attendees/')
    console.log('apis/attendee data:', response.data) // Nur response.data ausgeben
    return response.data
  } catch (err) {
    throw err.response ? err.response.data : err
  }
}