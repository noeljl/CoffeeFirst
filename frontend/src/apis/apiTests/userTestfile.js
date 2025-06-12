// test-fetchUser.js
import { fetchUser, updateUser } from '../user.js' // Stelle sicher, dass der Pfad zur API-Datei korrekt ist

// Die ID des Benutzers, den du testen möchtest
const userId = '1663' // Ersetze dies durch eine gültige Benutzer-ID

const data = {
    firstName: 'TestFirstNameUpdated',
    lastName: 'TestLastNameUpdated',
    mail: 'test@example.comUpdated',
    username: 'testusernameUpdated',
    password: 'testpasswordUpdated',
  }

// Funktion zum Testen der API
const testFetchUser = async () => {
  try {
    const userData = await fetchUser(userId)
    console.log('Benutzerdaten:', userData)
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzerdaten:', error)
  }
}

const testUpdateUser = async (userId, data) => {
  try {
    const userData = await updateUser(userId, data) // Pass userId and data to updateUser
    console.log('Updated User Data:', userData)
  } catch (error) {
    console.error('Error updating user data:', error)
  }
}

 
// Führe den Test aus
testFetchUser()

// Setzt Eintrag voraus
testUpdateUser(userId, data)


