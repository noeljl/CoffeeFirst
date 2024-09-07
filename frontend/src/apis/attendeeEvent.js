import API from './client.js'

// API interface for fetching attendees for a specific event
export const fetchAttendeesForEvent = async (eventID) => {
  try {
    const response = await API.get(`events/${eventID}/attendees`)
    return response.data
  } catch (err) {
    throw err.response ? err.response.data : err
  }
}

// API interface for updating the times attended for an attendee at a specific event
export const updateAttendeesForEvent = async (data) => {
  try {
    const { attendeeId, incrementBy, eventID } = data

    const response = await API.put(
      `events/${eventID}/attendees/${attendeeId}`,
      { incrementBy }
    )
    return response.data
  } catch (err) {
    throw err.response ? err.response.data : err
  }
}

// API interface for fetching total attendance across all events for each attendee
export const fetchTotalAttendance = async () => {
  try {
    const response = await API.get('/events/total-attendance') // Endpunkt prüfen
    console.log('API response: ', response.data) // Log the response
    return response.data
  } catch (error) {
    console.error('Error in API call: ', error.response) // Log API error
    throw error.response ? error.response.data : error
  }
}
