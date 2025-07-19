import React, { useState } from 'react' // Importiere useState
import { useDispatch } from 'react-redux' // Importiere useDispatch
import { useNavigate } from 'react-router-dom' // Importiere useNavigate
import Button from '../buttons/Button' // Dein Button-Component
import { setRegistrationDetails } from '../../store/auth/signupSlice' // Importiere die Redux-Aktion
import './Form.css' // Dein CSS

export default function SignupForm() {
  // State für Email, Passwort und das Checkbox-Flag
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [subscribe, setSubscribe] = useState(false) // Für die Checkbox

  // Hooks initialisieren
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Handler für das Absenden des Formulars
  const handleSubmit = (e) => {
    e.preventDefault() // Verhindert das Neuladen der Seite beim Absenden des Formulars
    console.log(email, password)
    const registrationData = { firstName, lastName, subscribe, email, password }
    dispatch(setRegistrationDetails(registrationData))
    // Save to localStorage
    console.log('registrationData in SignupForm', registrationData)
    localStorage.setItem('signupData', JSON.stringify(registrationData))
    navigate('/signup/planform')
  }

  return (
    <div className="form-section">
      <form onSubmit={handleSubmit}>
        {' '}
        {/* onSubmit-Handler auf das Formular anwenden */}
        <input
          type="FirstName"
          placeholder="Legal First Name"
          className="inputField"
          value={firstName} // Wert an den State binden
          onChange={(e) => setFirstName(e.target.value)} // State bei Änderung aktualisieren
          required
        />
        <input
          type="LastName"
          placeholder="Legal Last Name"
          className="inputField"
          value={lastName} // Wert an den State binden
          onChange={(e) => setLastName(e.target.value)} // State bei Änderung aktualisieren
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="inputField"
          value={email} // Wert an den State binden
          onChange={(e) => setEmail(e.target.value)} // State bei Änderung aktualisieren
          required
        />
        <input
          type="password"
          placeholder="Add a password"
          className="inputField"
          value={password} // Wert an den State binden
          onChange={(e) => setPassword(e.target.value)} // State bei Änderung aktualisieren
          required
        />
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={subscribe} // Zustand der Checkbox an den State binden
            onChange={(e) => setSubscribe(e.target.checked)} // State bei Änderung aktualisieren
          />
          Yes, please email me CoffeeFirst special offers.
        </label>
        <Button
          type="submit" // Wichtig: Button-Typ 'submit', damit onSubmit ausgelöst wird
          fs="medium"
          padding="medium"
          bg="red"
          radius="small"
          fw="bold"
        // Der onClick hier ist nicht mehr nötig, da der onSubmit des Formulars greift
        // Wenn du hier einen zusätzlichen onClick für den Button hättest, würde er VOR dem onSubmit ausgelöst.
        // Für das Speichern der Daten und Navigieren ist der onSubmit des Formulars der richtige Ort.
        >
          NEXT
        </Button>
      </form>
    </div>
  )
}
