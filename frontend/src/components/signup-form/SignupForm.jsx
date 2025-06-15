import React, { useState } from 'react' // Importiere useState
import { useDispatch } from 'react-redux' // Importiere useDispatch
import { useNavigate } from 'react-router-dom' // Importiere useNavigate
import Button from '../buttons/Button' // Dein Button-Component
import { setRegistrationDetails } from '../../store/auth/signupSlice' // Importiere die Redux-Aktion
import './SignupForm.css' // Dein CSS

export default function SignupForm() {
  // State für Email, Passwort und das Checkbox-Flag
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [subscribe, setSubscribe] = useState(false) // Für die Checkbox

  // Hooks initialisieren
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Handler für das Absenden des Formulars
  const handleSubmit = (e) => {
    e.preventDefault() // Verhindert das Neuladen der Seite beim Absenden des Formulars

    dispatch(setRegistrationDetails({ email, password }))
    navigate('/signup/planform')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {' '}
        {/* onSubmit-Handler auf das Formular anwenden */}
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
          width="full"
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
