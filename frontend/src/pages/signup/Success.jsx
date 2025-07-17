import React from 'react'
import NavBar from '../../components/ui/navbar/Navbar.jsx'
import Footer from '../../components/footer/Footer'
import SignInForm from '../../components/signin-form/SignInForm.jsx'

function Success() {
  return (
    <div>
      <NavBar />
      <div className="signup-form-section">
        <div className="signup-form-text">
          <h2
            style={{
              textAlign: 'center',
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
            }}
          >
            Hi NAME
          </h2>
          <h3>Login-in and get your coffee!</h3>
          <div className="signupComp">
            <SignInForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Success
