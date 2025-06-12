import React from "react";
import NavbarSignedOut from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import SignupForm from "../../components/signup-form/SignupForm";
import "./SignUp.css";

function RegForm() {
    return (
        <div>
            <NavbarSignedOut />
            <div className="signup-form-section">
                <div className="signup-form-text">
                    <p className="step-indicator">STEP <span style={{ fontWeight: "bold" }}>1</span> OF <span style={{ fontWeight: "bold" }}>3</span></p>
                    <h2>Enter yor mail and create a password to start your membership</h2>
                    <p className="subtitle">Just a few more steps to get your first coffee!</p>
                    <div className="signupComp"><SignupForm /></div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RegForm;