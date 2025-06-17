import React from 'react'
import { useDispatch } from 'react-redux'
import NavbarSignedOut from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import './SignUp.css'
import { useNavigate } from 'react-router-dom'
import PricingTable from '../../components/pricing/PricingTable'
// Corrected import path for setPlanDetails from the signupSlice
import { setPlanDetails } from '../../store/auth/signupSlice.js' // <-- IMPORTANT CHANGE HERE!
import Button from '../../components/ui/buttons/Button.jsx'

function PlanForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlePlanSelection = (selectedPlan) => {
    dispatch(setPlanDetails({ plan: selectedPlan }))
  }

  const handleNext = () => {
    navigate('/signup/payment')
  }

  return (
    <div>
      <NavbarSignedOut />
      <div className="signup-form-section">
        <div className="signup-form-text">
          <p className="step-indicator">
            STEP <span style={{ fontWeight: 'bold' }}>2</span> OF{' '}
            <span style={{ fontWeight: 'bold' }}>3</span>
          </p>
          <h2>Choose your membership</h2>
          {/* Ensure your PricingTable component has an 'onSelectPlan' prop
              that it calls when a plan is chosen. */}
          <PricingTable onSelectPlan={handlePlanSelection} />
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