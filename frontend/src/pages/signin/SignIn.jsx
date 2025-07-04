import React from 'react'
import NavBar from '../../components/ui/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import SignInForm from '../../components/signin-form/SignInForm.jsx'
import '../../components/signin-form/SignInForm.css'

function SignIn() {
  return (
    <div className="signup-form-section">
      <NavBar />
      <div className="signup-form-text">
        <h2 style={{ textAlign: 'center', fontSize: '32px', margin: 0 }}>
          Login
        </h2>
        {/* <SignInForm /> */}
      </div>
      <Footer />
    </div>
  )
}

export default SignIn
