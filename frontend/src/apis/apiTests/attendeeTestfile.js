import { registerAttendee, fetchAttendees } from '../attendee.js' // Stelle sicher, dass der Pfad zur API-Datei korrekt ist

const data = {
  firstName: 'Jan',
  middleName: 'Laurens',
  lastName: 'Ohl',
  timesAttended: 1,
}

const testRegisterUser = async () => {
  try {
    const userData = await registerAttendee(data) // Pass userId and data to updateUser
    console.log('Register User:', userData)
  } catch (error) {
    console.error('Error registring user:', error)
  }
}

const testfetchAttendees = async () => {
  try {
    const userData = await fetchAttendees() // Pass userId and data to updateUser
    console.log('Attendees:', userData)
  } catch (error) {
    console.error('Error registring user:', error)
  }
}

// testRegisterUser()

testfetchAttendees()
