import "./Footer.css";
import Icons from "../../assets/Icons";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-container">
        <img src={Icons.logo} alt="CoffeeFirst Logo" className="footer-logo" onClick={() => {navigate("/")}}/>

        <div className="footer-center">
          <div className="footer-links">
            <a href="/imprint">Imprint</a>
            <span>|</span>
            <a href="/privacy">Privacy Policy</a>
          </div>
          <p>© 2025 CoffeeFirst. All Rights Reserved.</p>
        </div>

        <div className="footer-socials">
          <a href="#"><img src={Icons.facebook} alt="Facebook" /></a>
          <a href="#"><img src={Icons.linkedin} alt="LinkedIn" /></a>
          <a href="#"><img src={Icons.x} alt="X" /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;