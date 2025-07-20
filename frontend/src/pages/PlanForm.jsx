import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Footer from '../components/footer/Footer.jsx'
import { useNavigate } from 'react-router-dom'
// Corrected import path for setPlanDetails from the signupSlice
import { setPlanDetails } from '../store/auth/signupSlice.js' // <-- IMPORTANT CHANGE HERE!
import Button from '../components/Buttons.jsx'
import NavBar from '../components/navbar/Navbar.jsx'
import PricingTable from '../components/pricing-table/PricingTable.jsx'
import styles from './styles/LoginSignup.module.css'

function PlanForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [stripeSession, setStripeSession] = useState(null)

  const handlePlanSelection = (selectedPlan) => {
    dispatch(setPlanDetails({ plan: selectedPlan }))
    const signupData = JSON.parse(localStorage.getItem('signupData') || '{}')
    signupData.plan = selectedPlan
    console.log('signupData', signupData)
    localStorage.setItem('signupData', JSON.stringify(signupData))
  }

  const handleNext = () => {
    if (stripeSession && stripeSession.url) {
      window.location.href = stripeSession.url // Redirect to Stripe checkout
    } else {
      navigate('/signup/payment') // Error Page implementierten
    }
  }

  return (
    <>
      <NavBar />
      <div className={styles.bodySection}>
        <div className={styles.pricingTableContainer}>
          <div className={styles.textContainer}>
            <p className={styles.stepIndicator}>
              STEP <span style={{ fontWeight: 'bold' }}>2</span> OF{' '}
              <span style={{ fontWeight: 'bold' }}>3</span>
            </p>
            <h2 className={styles.title}>Choose your membership</h2>
            <p className={styles.subtitle}>
              Choose the plan that’s right for you.
            </p>
          </div>
          <PricingTable
            onSelectPlan={handlePlanSelection}
            onSessionCreated={setStripeSession}
          />
          <div className={styles.buttonContainer}>
            <Button
              type="button" // Changed to "button" since it's not submitting a form directly
              fs="medium"
              padding="medium"
              bg="red"
              radius="small"
              width="full"
              onClick={handleNext}
            >
              NEXT
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PlanForm