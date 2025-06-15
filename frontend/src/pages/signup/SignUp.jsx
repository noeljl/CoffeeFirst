import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/buttons/Button.jsx'
import { setRegistrationDetails } from '../../store/auth/signupSlice'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [subscribe, setSubscribe] = useState(false) // falls du das Checkbox-Flag brauchst

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ email, password })
    dispatch(setRegistrationDetails({ email, password }))
    navigate('/signup/planform')
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form">
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
        placeholder="Add a password"
        className="inputField"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={subscribe}
          onChange={(e) => setSubscribe(e.target.checked)}
        />
        Yes, please email me CoffeeFirst special offers.
      </label>

      <Button
        type="submit"
        fs="medium"
        padding="medium"
        bg="red"
        radius="small"
        width="full"
      >
        NEXT
      </Button>
    </form>
  )
}