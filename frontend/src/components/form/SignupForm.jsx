import React, { useState } from 'react' // Importiere useState
import { useDispatch } from 'react-redux' // Importiere useDispatch
import { useNavigate } from 'react-router-dom' // Importiere useNavigate
import Button from '../Buttons.jsx' // Dein Button-Component
import { setRegistrationDetails } from '../../store/auth/signupSlice' // Importiere die Redux-Aktion
import { checkEmailExists } from '../../apis/auth'
import '../styles/Form.css' // Dein CSS

export default function SignupForm() {
  // State für Email, Passwort und das Checkbox-Flag
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [subscribe, setSubscribe] = useState(false) // Für die Checkbox
  const [emailError, setEmailError] = useState('')
  const [checkingEmail, setCheckingEmail] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  // Hooks initialisieren
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const checkEmailExistsClick = async (email) => {
    setCheckingEmail(true)
    try {
      const { exists } = await checkEmailExists(email)
      if (exists) {
        setEmailError('Mail bereits vergeben')
        return true
      } else {
        setEmailError('')
        return false
      }
    } catch (err) {
      setEmailError('Fehler bei der E-Mail-Prüfung.')
      return true
    } finally {
      setCheckingEmail(false)
    }
  }

  // Password strength checker
  const isStrongPassword = (pwd) => {
    // At least 8 characters, at least one letter and one number
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/.test(
      pwd
    )
  }

  // Handler für das Absenden des Formulars
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Password strength validation
    if (!isStrongPassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters and contain both letters and numbers.'
      )
      return
    } else {
      setPasswordError('')
    }
    // Prüfe, ob die E-Mail bereits vergeben ist
    const emailTaken = await checkEmailExistsClick(email)
    if (emailTaken) {
      // Nicht weiterleiten, wenn die E-Mail vergeben ist
      return
    }
    const registrationData = { firstName, lastName, subscribe, email, password }
    dispatch(setRegistrationDetails(registrationData))
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
          onBlur={() => checkEmailExistsClick(email)}
          required
        />
        {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
        <input
          type="password"
          placeholder="Add a password"
          className="inputField"
          value={password} // Wert an den State binden
          onChange={(e) => setPassword(e.target.value)} // State bei Änderung aktualisieren
          required
        />
        {passwordError && (
          <div style={{ color: 'red', marginBottom: '8px' }}>
            {passwordError}
          </div>
        )}
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
