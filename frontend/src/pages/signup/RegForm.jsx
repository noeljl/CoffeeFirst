import React from 'react'
import NavBar from '../../components/navbar/Navbar.jsx'
import Footer from '../../components/footer/Footer'
import SignupForm from '../../components/signup-form/SignupForm'

function RegForm() {
  return (
    <div>
      <NavBar />
      <div className="signup-form-section">
        <div className="signup-form-text">
          <p className="step-indicator">
            STEP <span style={{ fontWeight: 'bold' }}>1</span> OF{' '}
            <span style={{ fontWeight: 'bold' }}>3</span>
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: '1.2' }}>Enter yor mail and create a password to start your membership</h2>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', margin: '10px 0px 30px 0px' }}>
            Just a few more steps to get your first coffee!
          </p>
          <div className="signupComp">
            <SignupForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RegForm
