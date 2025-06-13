import React from "react";
import NavBar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./SignUp.css";
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import PricingTable from "../../components/pricing/PricingTable";

function PlanForm() {
    const navigate = useNavigate();
    return (
        <div>
            <NavBar />
            <div className="signup-form-section">
                <div className="signup-form-text">
                    <p className="step-indicator">STEP <span style={{ fontWeight: "bold" }}>2</span> OF <span style={{ fontWeight: "bold" }}>3</span></p>
                    <h2>Choose your membership</h2>
                    <PricingTable />
                    <Button type="submit" fs="medium" padding="medium" bg="red" radius="small" width="full" onClick={() => { navigate("/signup/payment") }}>NEXT</Button>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PlanForm;