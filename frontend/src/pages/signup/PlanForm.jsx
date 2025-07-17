import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Footer from '../../components/footer/Footer'
// import './SignUp.css'
import { useNavigate } from 'react-router-dom'
// Corrected import path for setPlanDetails from the signupSlice
import { setPlanDetails } from '../../store/auth/signupSlice.js' // <-- IMPORTANT CHANGE HERE!
import Button from '../../components/buttons/Button.jsx'
import NavBar from '../../components/navbar/Navbar.jsx'
import PricingTable from '../../components/pricing/PricingTable.jsx'

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
    <div>
      <NavBar />
      <div className="signup-form-section">
        <div className="signup-form-text">
          <p className="step-indicator">
            STEP <span style={{ fontWeight: 'bold' }}>2</span> OF{' '}
            <span style={{ fontWeight: 'bold' }}>3</span>
          </p>
          <h2>Choose your membership</h2>
          {/* Ensure your PricingTable component has an 'onSelectPlan' prop
              that it calls when a plan is chosen. */}
          <PricingTable
            onSelectPlan={handlePlanSelection}
            onSessionCreated={setStripeSession}
          />
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
      <Footer />
    </div>
  )
}

export default PlanForm
