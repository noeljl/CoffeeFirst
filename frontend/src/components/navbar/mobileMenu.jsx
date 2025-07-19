import React from 'react'
import styles from './Navbar.module.css'
import { FaSearch, FaHeart, FaStar, FaCog, FaUsers } from 'react-icons/fa'
import { useNavigate, useLocation } from 'react-router-dom'

export default function MobileMenu() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Helper function to check if a route is active
  const isActive = (path) => {
    if (path === '/dashboard/partners') {
      return location.pathname === '/dashboard/partners' || location.pathname.startsWith('/dashboard/partners/')
    }
    return location.pathname === path
  }
  
  return (
    <div className={styles.mobileMenuContainer}>
      <div className={styles.mobileMenuEntry}
        onClick={() => navigate('/dashboard/partners')}
        id={isActive('/dashboard/partners') ? styles.active : ""}
      >
        <FaSearch size={20} id={isActive('/dashboard/partners') ? styles.active : ""}/>
        <p className={styles.mobileMenuEntryText} id={isActive('/dashboard/partners') ? styles.active : ""}>Discover</p>
      </div>
      <div className={styles.mobileMenuEntry}
        onClick={() => navigate('/dashboard/wishlist')}
        id={isActive('/dashboard/wishlist') ? styles.active : ""}
      >
        <FaHeart size={20} id={isActive('/dashboard/wishlist') ? styles.active : ""}/>
        <p className={styles.mobileMenuEntryText} id={isActive('/dashboard/wishlist') ? styles.active : ""}>Wishlist</p>
      </div>
      <div className={styles.mobileMenuEntry}
        onClick={() => navigate('/dashboard/favorites')}
        id={isActive('/dashboard/favorites') ? styles.active : ""}
      >
        <FaStar size={20} id={isActive('/dashboard/favorites') ? styles.active : ""}/>
        <p className={styles.mobileMenuEntryText} id={isActive('/dashboard/favorites') ? styles.active : ""}>Favorites</p>
      </div>
      <div className={styles.mobileMenuEntry}
        onClick={() => navigate('/account-settings/personal')}
        id={isActive('/account-settings/personal') ? styles.active : ""}
      >
        <FaCog size={20} id={isActive('/account-settings/personal') ? styles.active : ""}/>
        <p className={styles.mobileMenuEntryText} id={isActive('/account-settings/personal') ? styles.active : ""}>Profile</p>
      </div>
    </div>
  )
}