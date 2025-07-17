import React from 'react'
import NavBar from '../../components/navbar/Navbar.jsx'
import Footer from '../../components/footer/Footer'
import SignInForm from '../../components/signin-form/SignInForm.jsx'
// import "./SignUp.css";

function SignIn() {
  return (
    <div>
      <NavBar minimal />
      <div className="signup-form-section">
        <div className="signup-form-text">
          <h2
            style={{
              textAlign: 'center',
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
            }}
          >
            Login
          </h2>
          <div className="signupComp">
            <SignInForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SignIn
