// src/pages/Payment.js
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../components/footer/Footer.jsx'
// import './SignUp.css'
import NavBar from '../../components/ui/navbar/Navbar.jsx'
import Button from '../../components/ui/buttons/Button.jsx'
import { useNavigate, useLocation } from 'react-router-dom'
import { registerMemberAction } from '../../store/auth/Auth.actions.js' // Pfad ist korrekt
// Angepasster Importpfad für clearSignupForm vom signupSlice
import { clearSignupForm } from '../../store/auth/signupSlice.js'
import { getCompleteSession } from '../../apis/stripe.js'

function PaymentSuccessful() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const sessionId = params.get('session_id')
  const dispatch = useDispatch()
  const [customerId, setCustomerId] = useState(null)
  const [subscriptionId, setSubscriptionId] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [subscriptionPeriodEnd, setSubscriptionPeriodEnd] = useState(null)

  // Hole Registrierungsdetails und Plan aus dem Redux Store
  // Die 'loading' und 'error' States für den Registrierungsprozess kommen ebenfalls vom signupSlice
  const signupData = useSelector((state) => state.signup)
  let {
    firstName,
    lastName,
    subscribe,
    email,
    password,
    plan,
    loading,
    error
  } = signupData

  // If Redux state is empty, try to load from localStorage
  if (!email || !plan) {
    const local = JSON.parse(localStorage.getItem('signupData') || '{}')
    firstName = firstName || local.firstName
    lastName = lastName || local.lastName
    subscribe = subscribe || local.subscribe
    email = email || local.email
    password = password || local.password
    plan = plan || local.plan
  }

  const handleStartPaidMembership = async () => {

    // Bereite Anmeldedaten für die Registrierung vor
    const credentials = {
      firstName,
      lastName,
      subscribe,
      email,
      password,
      plan, // Füge den ausgewählten Plan hinzu
      customerId,
      subscriptionId,
      paymentStatus,
      subscriptionPeriodEnd
    }
    console.log("Here are the credentials", credentials)
    try {
      await dispatch(registerMemberAction(credentials)).unwrap()

      dispatch(clearSignupForm())
      localStorage.removeItem('signupData')
      navigate('/dashboard')
    } catch (err) {
      console.error('Failed to register member:', err)
    }
  }

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getCompleteSession(sessionId)
      console.log("Here is the session", session.payment_status)
      setCustomerId(session.customer)
      setSubscriptionId(session.subscription)
      setPaymentStatus(session.status)
      setSubscriptionPeriodEnd(session.expires_at)
    }
    fetchSession()
  }, [sessionId])


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
            Go to Dashboard
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PaymentSuccessful
