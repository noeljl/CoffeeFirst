import React, { useState } from 'react' // Make sure this is uncommented and includes useState
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../Buttons.jsx'
import '../styles/Form.css'
import { loginMemberAction } from '../../store/auth/Auth.actions.js' // Pfad ist korrekt

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(false)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegisterClick = () => {
    navigate('/signup/regform') // Assuming '/register' is your registration page path
  }

  const handleSubmit = async (e) => {
    // Mache die Funktion async, um await zu nutzen
    e.preventDefault()
    setStatus(false) // Reset error state before new attempt
    setMessage('') // Reset message before new attempt

    try {
      const resultAction = await dispatch(
        loginMemberAction({ email, password })
      )
      console.log('resultAction:', resultAction)

      // Überprüfe, ob die Action erfolgreich war (fulfilled)
      if (loginMemberAction.fulfilled.match(resultAction)) {
        // Hier prüfen wir auf 'isAuthenticated', da deine Action das zurückgibt
        if (resultAction.payload.isAuthenticated) {
          // alert('Login erfolgreich für Email: ' + email)
          navigate('/dashboard') // Navigiere nur bei Erfolg
        } else {
          console.error(
            'Login erfolgreich, aber Authentifizierung ist false:',
            resultAction.payload
          )
          setStatus(true)
          setMessage('Login nicht erfolgreich. Bitte versuchen Sie es erneut.')
        }
      } else if (loginMemberAction.rejected.match(resultAction)) {
        let errorMessage = resultAction.payload;
        if (!errorMessage) {
          // Fallback für leeres/undefiniertes Payload
          errorMessage = 'Login failed. Please check your credentials.';
        } else if (typeof errorMessage === 'object') {
          if (errorMessage.error) {
            errorMessage = errorMessage.error;
          } else if (errorMessage.message) {
            errorMessage = errorMessage.message;
          } else {
            errorMessage = JSON.stringify(errorMessage);
          }
        }
        if (errorMessage === 'Unknown email address') {
          setMessage('E-Mail existiert nicht.');
        } else if (errorMessage === 'Incorrect password') {
          setMessage('Passwort ist falsch.');
        } else {
          setMessage(errorMessage);
        }
        setStatus(true)
      }
    } catch (error) {
      console.error('Unhandled login error:', error)
      setStatus(true)
      setMessage('Ein unerwarteter Fehler ist aufgetreten.')
    }
  }

  return (
    <div className="form-section">
      {message && <p className="error-message" style={{ marginBottom: '8px' }}>{message}</p>}
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
          fw="bold"
          bg="red"
          radius="small"
          width="full"
        >
          LOGIN {/* Changed button text */}
        </Button>
      </form>
      <p className="register-prompt">
        New to CoffeeFirst?{' '}
        <span className="register-link" onClick={handleRegisterClick}>
          Sign up here!
        </span>
      </p>
    </div>
  )
}
