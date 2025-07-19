import React from 'react'
import NavBar from '../components/navbar/Navbar.jsx'
import Footer from '../components/footer/Footer.jsx'
import SignInForm from '../components/form/SignInForm.jsx'
import SignupForm from '../components/form/SignupForm.jsx'
import styles from './styles/LoginSignup.module.css'  // Importiere das CSS-Modul

function Login() {
  return (
    <>
      <NavBar />
      <div className={styles.bodySection}>
        <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
            <h2 className={styles.title} >Time for your next cup?</h2>
            <p className={styles.subtitle}>
              Welcome back! Let’s get you logged in.
            </p>
          </div>
          <SignInForm />
        </div>
      </div>
      <Footer />
    </>
  )
}



function Signup() {
  return (
    <>
      <NavBar />
      <div className={styles.bodySection}>
        <div className={styles.contentContainer}>
          <div className={styles.textContainer}>
            <p className={styles.stepIndicator}>
              STEP <span style={{ fontWeight: 'bold' }}>1</span> OF{' '}
              <span style={{ fontWeight: 'bold' }}>3</span>
            </p>
            <h2 className={styles.title}>Enter yor mail and create a password to start your membership</h2>
            <p className={styles.subtitle}>
              Just a few more steps to get your first coffee!
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
      <Footer />
    </>
  )
}

export { Login, Signup }