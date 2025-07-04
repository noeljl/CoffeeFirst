import React, { useState } from 'react' // Make sure this is uncommented and includes useState
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/buttons/Button'
import './SignInForm.css' // This import is already correct in SignInForm.jsx
import { loginMemberAction } from '../../store/auth/Auth.actions.js' // Pfad ist korrekt

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    // Mache die Funktion async, um await zu nutzen
    e.preventDefault()
    console.log('Attempting to log in with:', { email, password })

    try {
      const resultAction = await dispatch(
        loginMemberAction({ email, password })
      )

      // Überprüfe, ob die Action erfolgreich war (fulfilled)
      if (loginMemberAction.fulfilled.match(resultAction)) {
        // Hier prüfen wir auf 'isAuthenticated', da deine Action das zurückgibt
        if (resultAction.payload.isAuthenticated) {
          alert('Login erfolgreich für Email: ' + email)
          navigate('/dashboard') // Navigiere nur bei Erfolg
        } else {
          console.error(
            'Login erfolgreich, aber Authentifizierung ist false:',
            resultAction.payload
          )
          alert('Login nicht erfolgreich. Bitte versuchen Sie es erneut.')
        }
      } else if (loginMemberAction.rejected.match(resultAction)) {
        // Die Action wurde abgelehnt (Fehler)
        const errorMessage =
          resultAction.payload ||
          'Login fehlgeschlagen. Ungültige Anmeldeinformationen.'
        console.error('Login failed:', errorMessage)
        alert('Login fehlgeschlagen: ' + errorMessage)
      }
    } catch (error) {
      console.error('Unhandled login error:', error)
      alert('Ein unerwarteter Fehler ist aufgetreten.')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="inputField"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="inputField"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Removed the checkbox as it's not typical for a login form */}
        <Button
          type="submit"
          fs="medium"
          padding="medium"
          bg="red"
          radius="small"
          width="full"
        >
          LOGIN {/* Changed button text */}
        </Button>
      </form>
    </div>
  )
}
