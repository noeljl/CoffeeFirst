import './Footer.css'
import Icons from '../../assets/Icons'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="footer">
      <div className="footer-container">
        <img
          src={Icons.logo}
          alt="CoffeeFirst Logo"
          className="footer-logo"
          draggable={false}
          onClick={() => {
            navigate('/home')
          }}
        />

        <div className="footer-center">
          <div className="footer-links">
            <a href="/imprint">Imprint</a>
            <span>|</span>
            <a href="/privacy">Privacy Policy</a>
          </div>
          <p>© 2025 CoffeeFirst. All Rights Reserved.</p>
        </div>

        <div className="footer-socials">
          <a href="#">
            <img src={Icons.facebook} alt="Facebook" draggable={false} />
          </a>
          <a href="#">
            <img src={Icons.linkedin} alt="LinkedIn" draggable={false} />
          </a>
          <a href="#">
            <img src={Icons.x} alt="X" draggable={false} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
