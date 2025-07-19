import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/footer/Footer.jsx'
import NavBar from '../components/navbar/Navbar.jsx'
import { useNavigate, useLocation } from 'react-router-dom'
import { registerMemberAction, loginMemberAction } from '../store/auth/Auth.actions.js'
import { clearSignupForm } from '../store/auth/signupSlice.js'
import { getCompleteSession } from '../apis/stripe.js'
import styles from './styles/LoginSignup.module.css'
import Button from '../components/buttons/Button.jsx'


export default function PaymentResult() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const sessionId = params.get('session_id')
  const dispatch = useDispatch()

  const [customerId, setCustomerId] = useState(null)
  const [subscriptionId, setSubscriptionId] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [subscriptionPeriodEnd, setSubscriptionPeriodEnd] = useState(null)
  const [registrationStatus, setRegistrationStatus] = useState('processing') // 'processing', 'success', 'failure'
  const [countdown, setCountdown] = useState(3)
  const [errorMessage, setErrorMessage] = useState('')

  // Hole Registrierungsdetails und Plan aus dem Redux Store
  const signupData = useSelector((state) => state.signup)
  let {
    firstName,
    lastName,
    subscribe,
    email,
    password,
    plan,
    loading,
    error,
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

  const performRegistration = async (sessionData) => {
    try {
      // Bereite Anmeldedaten für die Registrierung vor
      const credentials = {
        firstName,
        lastName,
        subscribe,
        email,
        password,
        plan,
        customerId: sessionData.customer,
        subscriptionId: sessionData.subscription,
        paymentStatus: sessionData.status,
        subscriptionPeriodEnd: sessionData.expires_at,
      }

      await dispatch(registerMemberAction(credentials)).unwrap()
      // Automatischer Login nach erfolgreicher Registrierung
      await dispatch(loginMemberAction({ email, password })).unwrap()
      dispatch(clearSignupForm())
      localStorage.removeItem('signupData')
      setRegistrationStatus('success')
    } catch (err) {
      console.error('Failed to register member:', err)
      setErrorMessage(err.message || 'Registration failed')
      setRegistrationStatus('failure')
    }
  }

  // Countdown für automatische Weiterleitung
  useEffect(() => {
    if (registrationStatus === 'success') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            navigate('/dashboard')
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [registrationStatus, navigate])

  // Stripe Session abrufen und Registrierung durchführen
  useEffect(() => {
    const fetchSessionAndRegister = async () => {
      try {
        const session = await getCompleteSession(sessionId)

        // State für UI-Anzeige setzen
        setCustomerId(session.customer)
        setSubscriptionId(session.subscription)
        setPaymentStatus(session.status)
        setSubscriptionPeriodEnd(session.expires_at)

        // Registrierung mit Session-Daten direkt durchführen
        await performRegistration(session)
      } catch (err) {
        console.error('Failed to fetch session:', err)
        setErrorMessage('Failed to fetch payment session')
        setRegistrationStatus('failure')
      }
    }

    if (sessionId) {
      fetchSessionAndRegister()
    } else {
      setErrorMessage('No session ID found')
      setRegistrationStatus('failure')
    }
  }, [sessionId])

  return (
    <>
      <NavBar />
      <div className={styles.bodySection}>
        {registrationStatus === 'processing' && <PaymentProcessing />}
        {registrationStatus === 'success' && <PaymentSuccess countdown={countdown} navigate={navigate} />}
        {registrationStatus === 'failure' && <PaymentFailure navigate={navigate} />}
      </div>
      <Footer />
    </>
  )

}

function PaymentProcessing() {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Brewing your membership ...</h2>
        <p className={styles.subtitle}>Hang tight while we set things up.</p>
      </div>
      <>
        <div className={styles.progressBar}>
          <div className={styles.progressBarFill}></div>
        </div>
      </>
    </div>
  )
}

function PaymentSuccess({ countdown, navigate }) {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Welcome to CoffeeFirst!</h2>
        <p className={styles.subtitle}>Your registration is complete – grab your first coffee and enjoy exclusive perks in Munich’s best cafés.</p>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          type="button"
          fs="medium"
          padding="medium"
          bg="red"
          radius="small"
          width="full"
          onClick={() => navigate('/dashboard')}
        >
          Redirection in <span style={{ fontWeight: 'bold', color: 'white' }}>{countdown}</span> seconds.
        </Button>
      </div>
    </div>
  )
}


function PaymentFailure({ navigate }) {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Looks like we spilled some coffee on the server</h2>
        <p className={styles.subtitle}>Please try again, or contact us if this keeps happening.</p>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          type="button"
          fs="medium"
          padding="medium"
          bg="red"
          radius="small"
          width="full"
          onClick={() => navigate('/signup/regform')}
        >
          Try again
        </Button>
      </div>
    </div>
  )
}