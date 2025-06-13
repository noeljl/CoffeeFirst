import React from "react";
import NavBar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./SignUp.css";
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";

function Payment() {
    const navigate = useNavigate();
    return (
        <div>
            <NavBar />
            <div className="signup-form-section">
                <div className="signup-form-text">
                    <p className="step-indicator">STEP <span style={{ fontWeight: "bold" }}>3</span> OF <span style={{ fontWeight: "bold" }}>3</span></p>
                    <h2>Set up your credit or debit card</h2>
                    <h1>-- insert stripe --</h1>
                    <Button type="submit" fs="medium" padding="medium" bg="red" radius="small" width="full" onClick={() => { navigate("/dashboard") }}>Start Paid Membership</Button>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Payment;