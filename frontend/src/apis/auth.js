import API from './client.js'

// Login für Mitglieder
export const loginMember = async (credentials) => {
  try {
    console.log('This is a question')

    const response = await API.post('auth/login', credentials)

    console.log('Response in auth.js/loginMember', JSON.stringify(credentials))

    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Registrierung für Mitglieder
export const registerMember = async (data) => {
  try {
    console.log('Response in auth.js/registerMember', JSON.stringify(data))
    const response = await API.post('auth/register', data)

    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Status prüfen
export const isMemberLoggedIn = async () => {
  try {
    const response = await API.get('auth/logged_in')

    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}

// Login für Event Attendee (falls separat)
export const loginEventAttendee = async (credentials) => {
  try {
    const response = await API.post('auth/loginEventAttendee', credentials)

    console.log(
      'Response in auth.js/loginEventAttendee',
      JSON.stringify(credentials)
    )

    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}
