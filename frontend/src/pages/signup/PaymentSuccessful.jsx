import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../components/footer/Footer.jsx'
import NavBar from '../../components/ui/navbar/Navbar.jsx'
import { useNavigate, useLocation } from 'react-router-dom'
import { registerMemberAction } from '../../store/auth/Auth.actions.js'
import { clearSignupForm } from '../../store/auth/signupSlice.js'
import { getCompleteSession } from '../../apis/stripe.js'

function PaymentResult() {
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

  const performRegistration = async () => {
    try {
      // Bereite Anmeldedaten für die Registrierung vor
      const credentials = {
        firstName,
        lastName,
        subscribe,
        email,
        password,
        plan,
        customerId,
        subscriptionId,
        paymentStatus,
        subscriptionPeriodEnd,
      }

      console.log('Here are the credentials', credentials)

      await dispatch(registerMemberAction(credentials)).unwrap()
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
        console.log('Here is the session', session.payment_status)

        setCustomerId(session.customer)
        setSubscriptionId(session.subscription)
        setPaymentStatus(session.status)
        setSubscriptionPeriodEnd(session.expires_at)

        // Warten bis Session-Daten gesetzt sind, dann registrieren
        setTimeout(() => {
          performRegistration()
        }, 100)
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

  // Processing-Seite
  if (registrationStatus === 'processing') {
    return (
      <div>
        <NavBar />
        <div className="signup-form-section">
          <div className="signup-form-text">
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div
                style={{
                  fontSize: '24px',
                  marginBottom: '20px',
                  animation: 'spin 2s linear infinite',
                }}
              >
                ⏳
              </div>
              <h2>Processing your registration...</h2>
              <p>Please wait while we set up your account.</p>
              <div style={{ marginTop: '20px' }}>
                <div
                  style={{
                    width: '100%',
                    height: '4px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#007bff',
                      animation: 'progress 1.5s infinite',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes progress {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>
    )
  }

  // Success-Seite
  if (registrationStatus === 'success') {
    return (
      <div>
        <NavBar />
        <div className="signup-form-section">
          <div className="signup-form-text">
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div
                style={{
                  fontSize: '48px',
                  marginBottom: '20px',
                  color: '#28a745',
                }}
              >
                ✅
              </div>
              <h2>Registration Successful!</h2>
              <p>
                Your account has been created and your subscription is active.
              </p>
              <div
                style={{
                  marginTop: '30px',
                  padding: '20px',
                  backgroundColor: '#d4edda',
                  border: '1px solid #c3e6cb',
                  borderRadius: '5px',
                }}
              >
                <h3>What's next?</h3>
                <p>
                  You'll be redirected to your dashboard in {countdown} seconds.
                </p>
                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: '#c3e6cb',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    marginTop: '10px',
                  }}
                >
                  <div
                    style={{
                      width: `${((3 - countdown) / 3) * 100}%`,
                      height: '100%',
                      backgroundColor: '#28a745',
                      transition: 'width 1s ease',
                    }}
                  ></div>
                </div>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Go to Dashboard Now
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Failure-Seite
  if (registrationStatus === 'failure') {
    return (
      <div>
        <NavBar />
        <div className="signup-form-section">
          <div className="signup-form-text">
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div
                style={{
                  fontSize: '48px',
                  marginBottom: '20px',
                  color: '#dc3545',
                }}
              >
                ❌
              </div>
              <h2>Registration Failed</h2>
              <p>
                Unfortunately, something went wrong during your registration.
              </p>
              <div
                style={{
                  marginTop: '30px',
                  padding: '20px',
                  backgroundColor: '#f8d7da',
                  border: '1px solid #f5c6cb',
                  borderRadius: '5px',
                }}
              >
                <h3>Error Details:</h3>
                <p style={{ color: '#721c24' }}>
                  {errorMessage || 'An unknown error occurred'}
                </p>
              </div>
              <div style={{ marginTop: '30px' }}></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return null
}

export default PaymentResult
