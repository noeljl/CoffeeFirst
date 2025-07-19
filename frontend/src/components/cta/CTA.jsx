import React from "react";
import "./CTA.css";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";

function CTA() {
    const navigate = useNavigate();
    return (
        <div className="cta-container" style={{ backgroundImage: `url(/images/cta-background.jpg)` }}>
            <div className="overlay">
                <div className="cta-content-box-up">
                    <h2 id="cta-title">Join Munich’s coffee community today</h2>
                    <div className="cta-content-text">
                        <p className="cta-text" style={{ fontWeight: "bold" }}>Drink better coffee. Spend less.</p>
                        <p className="cta-text">Access premium drinks at your favorite local cafés </p>
                        <p className="cta-text">— starting at just €29.99/month.</p>
                    </div>
                </div>
                <div className="cta-content-box-down">
                    <Button bg="red" fs="large" padding="medium" fw="bold" radius="small" onClick={() => { navigate("/signup/regform") }}
                    >Become a coffee lover
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CTA;