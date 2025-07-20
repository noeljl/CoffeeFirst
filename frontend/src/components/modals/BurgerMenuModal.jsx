import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/BurgerMenuModal.module.css'
import { FiSettings, FiLogOut } from "react-icons/fi";
import { AuthContext } from '../../contexts/AuthProvider.js'
import { useDispatch } from 'react-redux'
import { logoutMemberAction } from '../../store/auth/Auth.actions.js'
import useDisableScrolling from '../../hooks/useDisableScrolling.js'

/* The menu which gets triggered by the button */
export default function BurgerMenuModal({ onClose }) {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
  const dispatch = useDispatch()

  useDisableScrolling(true)

  return (
    <>
    <div className={styles.burgerMenuOverlay} onClick={onClose} />  
    <div className={styles.burgerMenuContainer}>
      <div className={styles.burgerMenuEntry} style={{borderBottom: '1px solid #eee'}} onClick={() => {
        navigate('/account-settings')
        onClose()
      }}>
          <FiSettings size={25} color="#222" />
          <p className={styles.burgerMenuEntryText}>Settings</p>
      </div>
      <div className={styles.burgerMenuEntry} onClick={async () => {
            try {
              await logout()
              await dispatch(logoutMemberAction())
              navigate('/')
              onClose()
            } catch (error) {
              console.error('Logout failed:', error)
              // You might want to show an error message to the user here
            }
          }}>
          <FiLogOut size={25} color="#222" />
          <p className={styles.burgerMenuEntryText}>Logout</p>
      </div>
    </div>
    </>
  )
}