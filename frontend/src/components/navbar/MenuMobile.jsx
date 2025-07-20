
import React from 'react';
import styles from '../styles/Navbar.module.css';
import { FaSearch, FaHeart, FaStar, FaUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MobileMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check if a route is active
  const isActive = (path) => {
    if (path === '/dashboard') {
      return (
        location.pathname === '/dashboard/discover' ||
        location.pathname.startsWith('/dashboard/discover/')
      );
    }
    return location.pathname === path;
  };

  return (
    <div className={styles.mobileMenuContainer}>
      <div
        className={styles.mobileMenuEntry}
        onClick={() => navigate('/dashboard/discover')}
        id={isActive('/dashboard/discover') ? styles.active : ''}
      >
        <FaSearch size={20} id={isActive('/dashboard/discover') ? styles.active : ''} />
        <p className={styles.mobileMenuEntryText} id={isActive('/dashboard/discover') ? styles.active : ''}>
          Discover
        </p>
      </div>
      <div
        className={styles.mobileMenuEntry}
        onClick={() => navigate('/dashboard/wishlist')}
        id={isActive('/dashboard/wishlist') ? styles.active : ''}
      >
        <FaHeart size={20} id={isActive('/dashboard/wishlist') ? styles.active : ''} />
        <p className={styles.mobileMenuEntryText} id={isActive('/dashboard/wishlist') ? styles.active : ''}>
          Wishlist
        </p>
      </div>
      <div
        className={styles.mobileMenuEntry}
        onClick={() => navigate('/dashboard/favorites')}
        id={isActive('/dashboard/favorites') ? styles.active : ''}
      >
        <FaStar size={20} id={isActive('/dashboard/favorites') ? styles.active : ''} />
        <p className={styles.mobileMenuEntryText} id={isActive('/dashboard/favorites') ? styles.active : ''}>
          Favorites
        </p>
      </div>
      <div
        className={styles.mobileMenuEntry}
        onClick={() => navigate('/profile')}
        id={isActive('/profile') ? styles.active : ''}
      >
        <FaUser size={20} id={isActive('/profile') ? styles.active : ''} />
        <p className={styles.mobileMenuEntryText} id={isActive('/profile') ? styles.active : ''}>
          Profile
        </p>
      </div>
    </div>
  );
}
