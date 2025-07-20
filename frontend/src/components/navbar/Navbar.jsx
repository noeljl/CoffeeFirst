import React, { useContext, useEffect } from 'react'
import styles from '../styles/Navbar.module.css'
import Button, { SearchButton, SearchButtonIcon, FilterButtonText, FilterButtonIcon, CheckInButton, CheckInButtonIcon, BurgerMenuButton, BurgerMenuButtonIcon } from '../Buttons.jsx'
import { useNavigate, useLocation } from 'react-router-dom'
import { SearchContext } from '../../contexts/SearchContext'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import logo from '../../assets/Logo.svg'

// Handles both navbar types: logged in and out.
export default function NavBar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const location = useLocation()
  // Get both searchFilter and setSearchFilter from context
  const { searchFilter, setSearchFilter } = useContext(SearchContext)

  // Set media queries to show mobile or desktop navbar
  const isTablet = useMediaQuery({ maxWidth: 900 })

  useEffect(() => {
    setSearchFilter(null)
  }, [location.pathname, setSearchFilter])

  return (
    <>
      {isAuthenticated ? (
        isTablet ? (
          <SignedInMobile />
        ) : (
          <SignedInDefault
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
          />
        )
      ) : (
        <SignedOut />
      )}
    </>
  )
}

/* ============================== */
/* Signed Out Navbar */
/* ============================== */

function SignedOut() {
  const navigate = useNavigate()
  return (
    <div className={styles.navbarContainer}>
      <img
        src={logo}
        alt="CoffeeFirst Logo"
        className={styles.navbarLogo}
        draggable={false}
        onClick={() => {
          navigate('/home')
        }}
      />
      <div className={styles.navbarButtonsContainer}>
        <Button bg="white" fs="medium" radius="small" padding="small" fw="bold" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button bg="red" fs="medium" radius="small" padding="small" fw="bold" onClick={() => navigate('/signup/regform')}>
          Sign Up
        </Button>
      </div>
    </div>
  )
}

/* ============================== */
/* Signed In Default Navbar */
/* ============================== */

// Pass searchFilter and setSearchFilter as props to SignedIn
function SignedInDefault({ searchFilter, setSearchFilter }) {
  const navigate = useNavigate()
  const location = useLocation()

  // Handler for search selection
  const handleSearchSelect = (filter) => {
    setSearchFilter(filter)
    if (filter.type === 'district') {
      if (location.pathname !== '/dashboard/discover') {
        navigate('/dashboard/discover')
      }
    } else if (filter.type === 'cafe') {
      navigate(`/dashboard/discover/${encodeURIComponent(filter.name)}`)
    }
  }

  useEffect(() => {
    if (searchFilter === null) {
      // setQuery('');
      // setOpen(false);
      // setSelectedIndex(-1);
    }
  }, [searchFilter])

  return (
    <div className={styles.navbarContainer}>
      <img
        src={logo}
        alt="CoffeeFirst Logo"
        className={styles.navbarLogo}
        draggable={false}
        onClick={() => {
          navigate('/dashboard/discover')
        }}
      />
      <div className={styles.navbarMiddleContainer}>
        {/* Pass searchFilter to SearchBar */}
        {/* <SearchBar onSelect={handleSearchSelect} searchFilter={searchFilter} /> */}
        <SearchButton />
        <FilterButtonText />
      </div>
      <div className={styles.navbarRightContainer}>
        <CheckInButton />
        <BurgerMenuButtonIcon />
      </div>
    </div>
  )
}

/* ============================== */
/* Signed In Mobile Navbar */
/* ============================== */

function SignedInMobile() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className={styles.navbarContainer}>
      <img src={logo} alt="CoffeeFirst Logo" className={styles.navbarLogo} draggable={false} onClick={() => navigate('/dashboard/discover')} />
      <div className={styles.navbarRightContainer}>
        <SearchButtonIcon />
        <FilterButtonIcon />
        <CheckInButtonIcon />
      </div>
    </div>
  )
}