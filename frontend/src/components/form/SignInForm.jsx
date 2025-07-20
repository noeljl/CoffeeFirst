import React, { useState } from 'react' // Make sure this is uncommented and includes useState
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../Buttons.jsx'
import './Form.css'
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

    try {
      const resultAction = await dispatch(
        loginMemberAction({ email, password })
      )

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
        // Die Action wurde abgelehnt (Fehler)
        const errorMessage =
          resultAction.payload ||
          'Sorry, we can\'t find an account with this email address.'
        console.error('Login failed:', errorMessage)
        setStatus(true)
        setMessage(errorMessage)
      }
    } catch (error) {
      console.error('Unhandled login error:', error)
      setStatus(true)
      setMessage('Ein unerwarteter Fehler ist aufgetreten.')
    }
  }

  return (
    <div className="form-section">
      {status && <p className="error-message">{message}</p>}
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
