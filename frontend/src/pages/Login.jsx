import React from 'react'
import NavBar from '../components/navbar/Navbar.jsx'
import Footer from '../components/footer/Footer.jsx'
import SignInForm from '../components/signin-form/SignInForm.jsx'
// import "./SignUp.css";

export default function Login() {
  return (
    <div>
      <NavBar />
      <div className="signup-form-section">
        <div className="signup-form-text">
          <h2
            style={{
              textAlign: 'center',
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
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
