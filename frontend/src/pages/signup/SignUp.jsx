import React from "react";
import NavbarSignedOut from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./SignUp.css";
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import checkImg from "../../assets/check.svg"

function SignUp() {
    const navigate = useNavigate();
    return (
        <div>
            <NavbarSignedOut />
            <div className="signup-form-section">
                <div className="signup-form-text">
                    <p className="step-indicator">STEP <span style={{ fontWeight: "bold" }}>2</span> OF <span style={{ fontWeight: "bold" }}>3</span></p>
                    <h2>Choose your membership</h2>
                    <p className="subtitle">Just a few more steps to get your first coffee!</p>
                    <ul className="advantages-list">
                        <li>
                            <img src={checkImg} alt="icon" className="list-icon" />
                            Free coffee every month
                        </li>
                        <li>
                            <img src={checkImg} alt="icon" className="list-icon" />
                            Access Munich’s top cafés
                        </li>
                        <li>
                            <img src={checkImg} alt="icon" className="list-icon" />
                            Cancel anytime
                        </li>
                    </ul>
                    <div><Button type="submit" fs="medium" padding="medium" bg="red" radius="small" width="full" onClick={() => { navigate("/signup/planform") }}>NEXT</Button></div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SignUp;