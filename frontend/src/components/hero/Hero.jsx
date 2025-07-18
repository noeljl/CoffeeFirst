import heroBackground from "../../assets/png/hero-background.jpg";
import Button from "../buttons/Button";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();
    return (
        <div className="hero-container" style={{ backgroundImage: `url(${heroBackground})` }}>
            <div className="overlay">
                <div className="hero-content-box-up">
                    <h1 id="hero-title">Your Daily Coffee, Upgraded</h1>
                    <div className="hero-content-text">
                        <p className="hero-text">From filter to flat white – enjoy premium coffee at partner cafés across Munich.</p>
                        <p className="hero-text">Starting at €29.99/month – cancel anytime.</p>
                    </div>
                </div>
                <div className="hero-content-box-down">
                    <Button
                        bg="red"
                        fs="large"
                        fw="bold"
                        radius="small"
                        padding="medium"
                        onClick={() => { navigate("/signup/regform") }}
                        style={{ marginTop: 20 }}
                    >
                        Become a coffee lover
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default Hero;