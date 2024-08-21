import AttendeeModel from '../attendee.js' // Passe den Pfad an, falls notwendig

async function testFindAll() {
  try {
    const AttendeeModelInstance = new AttendeeModel()

    // Rufe die findAll-Methode auf
    const attendees = await AttendeeModelInstance.findAll()

    // Gebe das Ergebnis in der Konsole aus
    // console.log('Gefundene Teilnehmer in Model:', attendees)
  } catch (err) {
    console.error('Fehler beim Abrufen der Teilnehmer:', err)
  }
}

// Testfunktion ausführen
testFindAll()
