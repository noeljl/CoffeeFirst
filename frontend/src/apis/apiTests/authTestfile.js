import { login, register, isLoggedIn } from '../auth.js' // Stelle sicher, dass der Pfad zur API-Datei korrekt ist

// Daten
const credentials = {
  username: 'testusernameUpdated',
  password: 'testpasswordUpdated',
}

const newData = {
  firstName: 'TestFirstNameNew',
  lastName: 'TestLastNameNew',
  mail: 'test@example.comNew',
  username: 'testusernameNew',
  password: 'testpasswordNew',
}

// Testfunktionen
const testloginUser = async () => {
  try {
    const user = await login(credentials)
    console.log('Benutzer erfolgreich eingeloggt: ', user)
  } catch (error) {
    console.error('Fehler beim Einloggen:', error)
  }
}

const testRegisterUser = async (data) => {
  try {
    const userData = await register(data) // Pass userId and data to updateUser
    console.log('Register User:', userData)
  } catch (error) {
    console.error('Error registring user:', error)
  }
}

const testUserIsLoggedIn = async () => {
  try {
    const userData = await isLoggedIn() // Pass userId and data to updateUser
    console.log('User LoggedIn:', userData)
  } catch (error) {
    console.error('User LoggedIn:', error)
  }
}

// Setzt vorraus, dass credentials oben zu Nutzer führen
testloginUser()

// Setzte vorraus,dass Benutzerdaten einnalig sind
testRegisterUser(newData)

testUserIsLoggedIn()
