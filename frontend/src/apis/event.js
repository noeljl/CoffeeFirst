import API from './client.js'

// API interface for registering an event
export const registerEvent = async (data) => {
  try {
    const response = await API.post('events/register', data)
    // console.log('Full response:', response) // Debug-Ausgabe
    return response.data
  } catch (err) {
    // console.error('Error:', err) // Fehlerprotokollierung
    throw err.response ? err.response.data : err // Anpassung für Fehler ohne `response`
  }
}

// API interface for updating the event
export const updateEvent = async (data) => {
  try {
    const { eventID } = data

    const response = await API.put(`events/${eventID}`, data)
    return response.data
  } catch (err) {
    throw err.response ? err.response.data : err
  }
}

// API interface for deleting the event
export const deleteEvent = async (data) => {
  try {
    const { eventID } = data

    const response = await API.delete(`events/${eventID}`)
    return response.data
  } catch (err) {
    throw err.response ? err.response.data : err
  }
}

// API interface for fetching all events
export const fetchEvents = async () => {
  try {
    const response = await API.get('events/')
    console.log('apis/event data:', response.data) // Nur response.data ausgeben
    return response.data
  } catch (err) {
    throw err.response ? err.response.data : err
  }
}

export const fetchEvent = async (eventID, token) => {
  try {
    console.log('fetchEventIn /apis ' + eventID + ' ' + token)
    // Übergebe eventID und token als Query-Parameter in der GET-Anfrage
    const response = await API.get(`events/${eventID}`, {
      params: {
        token: token, // Füge das Token als Query-Parameter hinzu
      },
    })


    console.log('apis/specific event data:', response.data) // Event-Daten ausgeben
    return response.data
  } catch (err) {
    console.error('Error fetching event data:', err)
    throw err.response ? err.response.data : err
  }
}

// API interface for updating the event category
export const updateEventCategory = async (eventID, newCategoryId) => {
  try {
    console.log('apis/event updateEventCategory ' + newCategoryId)
    const response = await API.patch(`events/${eventID}/category`, {
      newCategoryId,
    })
    return response.data
  } catch (err) {
    throw err.response ? err.response.data : err
  }
}
