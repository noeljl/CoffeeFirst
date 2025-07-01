import heroBackground from "../../assets/png/hero-background.jpg";
import Button from "../ui/buttons/Button";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();
    return (
        <div className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
            <div className="overlay">
                <div className="hero-content">
                    <h1>Your Daily Coffee, Upgraded</h1>
                    <p>From filter to flat white – enjoy premium coffee at partner cafés across Munich.</p>
                    <p>Starting at €29.99/month – cancel anytime.</p>
                    <Button bg="red" fs="l" fw="bold" radius="small" onClick={() => {navigate("/signup")}}>Become a coffee lover</Button>
                </div>
            </div>
        </div>
    )
};

export default Hero;