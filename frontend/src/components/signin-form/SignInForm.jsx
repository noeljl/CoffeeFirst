import React, { useState } from 'react' // Make sure this is uncommented and includes useState
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/buttons/Button'
import './SignInForm.css' // This import is already correct in SignInForm.jsx

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Attempting to log in with:', { email, password })

    // In a real application, you would dispatch an action to an authentication API here.
    // For example:
    // dispatch(loginUser({ email, password }))
    //   .then((response) => {
    //     if (response.payload.success) { // Assuming your loginUser action returns success
    //       navigate('/dashboard'); // Navigate to a protected route after successful login
    //     } else {
    //       // Handle login failure (e.g., show an error message)
    //       console.error('Login failed:', response.payload.message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Login error:', error);
    //   });

    // For now, let's simulate a successful login and navigate
    // You'd replace this with actual authentication logic.
    alert(
      'Simulating login with Email: ' + email + ' and Password: ' + password
    )
    navigate('/dashboard') // Redirect to a dashboard or main page after login
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
