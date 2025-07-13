import API from './client.js'

// Login für Mitglieder
export const loginMember = async (credentials) => {
  try {
    console.log('Request in auth.js/loginMember', JSON.stringify(credentials))

    const response = await API.post('auth/login', credentials)

    console.log(
      'Response in auth.js/loginMember',
      JSON.stringify(response.data)
    )

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

export const isMemberLoggedIn = async () => {
  try {
    const response = await API.get('auth/check-session')
    console.log('isMemberLoggedIn response:', response.data)
    return response.data
  } catch (err) {
    console.error('isMemberLoggedIn error:', err)
    throw err.response?.data || err.message
  }
}

export const logoutMember = async () => {
  try {
    const response = await API.post('auth/logout')
    return response.data
  } catch (err) {
    throw err.response?.data || err.message
  }
}
