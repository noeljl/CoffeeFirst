// src/pages/Payment.js
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../components/footer/Footer'
// import './SignUp.css'
import NavBar from '../../components/ui/navbar/Navbar.jsx'
import Button from '../../components/ui/buttons/Button.jsx'
import { useNavigate } from 'react-router-dom'
import { registerMemberAction } from '../../store/auth/Auth.actions.js' // Pfad ist korrekt
// Angepasster Importpfad für clearSignupForm vom signupSlice
import { clearSignupForm } from '../../store/auth/signupSlice.js'

function Payment() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Hole Registrierungsdetails und Plan aus dem Redux Store
  // Die 'loading' und 'error' States für den Registrierungsprozess kommen ebenfalls vom signupSlice
  const {
    firstName,
    lastName,
    subscribe,
    email,
    password,
    plan,
    loading,
    error,
  } = useSelector((state) => state.signup)

  const handleStartPaidMembership = async () => {
    const paymentMethodId = 'pm_card_visa' // Diese käme von Stripe nach der Tokenisierung

    // Bereite Anmeldedaten für die Registrierung vor
    const credentials = {
      firstName,
      lastName,
      subscribe,
      email,
      password,
      plan, // Füge den ausgewählten Plan hinzu
      paymentMethodId, // Füge die Payment Method ID von Stripe hinzu
    }

    try {
      await dispatch(registerMemberAction(credentials)).unwrap()

      dispatch(clearSignupForm())
      navigate('/dashboard')
    } catch (err) {
      console.error('Failed to register member:', err)
    }
  }

  return (
    <div>
      <NavBar />
      <div className="signup-form-section">
        <div className="signup-form-text">
          <p className="step-indicator">
            STEP <span style={{ fontWeight: 'bold' }}>3</span> OF{' '}
            <span style={{ fontWeight: 'bold' }}>3</span>
          </p>
          <h2>Set up your credit or debit card</h2>
          <h1>-- insert stripe --</h1>
          {/* Implementiere hier deine Stripe-Integration */}
          {/* z.B. <StripeElementsProvider><CheckoutForm /></StripeElementsProvider> */}
          <Button
            type="submit"
            fs="medium"
            padding="medium"
            bg="red"
            radius="small"
            width="full"
            onClick={handleStartPaidMembership}
            disabled={loading} // Deaktiviere den Button während des Ladevorgangs
          >
            {loading ? 'Registering...' : 'Start Paid Membership'}
          </Button>
          {/* Zeige Fehlermeldung an, falls vorhanden */}
          {error && (
            <p style={{ color: 'red' }}>
              Error: {error.message || 'Something went wrong.'}
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Payment
