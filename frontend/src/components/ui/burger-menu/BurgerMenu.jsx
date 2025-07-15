import { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './BurgerMenu.css'
import dashboardMenu from '../sidebars/MenuData'
import Icons from '../../../assets/Icons'
import { AuthContext } from '../../../contexts/AuthProvider'
import { useDispatch } from 'react-redux'
import { logoutMemberAction } from '../../../store/auth/Auth.actions.js'

/* The burger menu icon as a button. It triggers the open/close movement of the actual menu */
function BurgerMenuButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div>
      <button
        className="menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img src={Icons.menu} alt="Menu" draggable={false} />
      </button>
      {isMenuOpen && (
        <>
          <div className="burger-menu-overlay" onClick={() => setIsMenuOpen(false)} />
          <Menu onClose={() => setIsMenuOpen(false)} />
        </>
      )}
    </div>
  )
}

/* The menu which gets triggered by the button */
function Menu({ onClose }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useContext(AuthContext)
  const dispatch = useDispatch()
  return (
    <div className="burger-menu">
      <ul>
        <div className="border">
          {dashboardMenu.map((val, key) => (
            <li
              key={key}
              className="entries"
              id={location.pathname === val.link && 'active'}
              onClick={() => {
                navigate(val.link)
                onClose()
              }}
            >
              <div id="icon">
                <img src={val.icon} alt={val.title} draggable={false} />
              </div>
              <div id="title">
                <span>{val.title}</span>
              </div>
            </li>
          ))}
        </div>
        <li
          className="entries"
          id={location.pathname === '/account-settings' && 'active'}
          onClick={() => {
            navigate('/account-settings')
            onClose()
          }}
        >
          <div id="icon">
            <img src={Icons.setting} alt="Account" draggable={false} />
          </div>
          <div id="title">
            <span>Account settings</span>
          </div>
        </li>

        <li
          className="entries"
          onClick={async () => {
            try {
              await logout()
              await dispatch(logoutMemberAction())
              navigate('/')
              onClose()
            } catch (error) {
              console.error('Logout failed:', error)
              // You might want to show an error message to the user here
            }
          }}
        >
          <div id="icon">
            <img src={Icons.logout} alt="Logout" draggable={false} />
          </div>
          <div id="title">
            <span>Logout</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default BurgerMenuButton
