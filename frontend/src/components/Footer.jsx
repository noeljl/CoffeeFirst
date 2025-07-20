import './styles/Footer.css'
import { FaFacebook, FaInstagramSquare, FaPinterest, FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer>
      <div className="footer-row upper-row">
        <div className="footer-icon-container payment-icons">
         <FaCcAmex className="footer-icon" />
         <FaCcVisa className="footer-icon" />
         <FaCcMastercard className="footer-icon" /> 
        </div>
        <div className="footer-icon-container social-icons">
          <FaFacebook className="footer-icon" />
          <FaInstagramSquare className="footer-icon" />
          <FaPinterest className="footer-icon" />
        </div>
          
      </div>

    <div className="footer-row lower-row">
      <div className="footer-legal">
        <span id="footer-copyright-text">© 2025 CoffeeFirst. All Rights Reserved.</span>
        <div className="footer-legal-links">
          <a href="/#">Imprint</a>
          <span>|</span>
          <a href="/#">Privacy Policy</a>
        </div>
      </div>
    </div>
    </footer>
  )
}
