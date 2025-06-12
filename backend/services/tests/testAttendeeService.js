import AttendeeService from '../AttendeeService.js' // Passe den Pfad an, falls notwendig

async function testfetchAttendees() {
  try {
    const AttendeeServiceInstance = new AttendeeService()

    // Rufe die findAll-Methode auf
    const attendees = await AttendeeServiceInstance.fetchAttendees()

    // Gebe das Ergebnis in der Konsole aus
    console.log('Gefundene Teilnehmer in Service:', attendees)
  } catch (err) {
    console.error('Fehler beim Abrufen der Teilnehmer:', err)
  }
}

// Testfunktion ausführen
testfetchAttendees()
