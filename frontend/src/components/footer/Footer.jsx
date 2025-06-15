import "./Footer.css";
import logo from "../../assets/Logo.svg";
import facebookIcon from "../../assets/social-icons/facebook-icon.svg";
import linkedinIcon from "../../assets/social-icons/linkedin-icon.svg";
import xIcon from "../../assets/social-icons/x-icon.svg";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-container">
        <img src={logo} alt="CoffeeFirst Logo" className="footer-logo" onClick={() => {navigate("/")}}/>

        <div className="footer-center">
          <div className="footer-links">
            <a href="/imprint">Imprint</a>
            <span>|</span>
            <a href="/privacy">Privacy Policy</a>
          </div>
          <p>© 2025 CoffeeFirst. All Rights Reserved.</p>
        </div>

        <div className="footer-socials">
          <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
          <a href="#"><img src={linkedinIcon} alt="LinkedIn" /></a>
          <a href="#"><img src={xIcon} alt="X" /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;