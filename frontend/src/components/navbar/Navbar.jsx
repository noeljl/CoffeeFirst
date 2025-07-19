import React, { useState, useContext, useEffect } from 'react'
import styles from './Navbar.module.css'
import Button from '../buttons/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import BurgerMenuButton from '../burger-menu/BurgerMenu'
import Avatar from '../avatar/Avatar'
import FilterModal from '../filter/FilterModal'
import SearchBar from '../search-bar/SearchBar'
import CheckInButton from '../check-in/CheckIn'
import { SearchContext } from '../../contexts/SearchContext'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { FaBarcode, FaFilter } from 'react-icons/fa'
import logo from '../../assets/Logo.svg'



// Handles both navbar types: logged in and out.
function NavBar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const location = useLocation()
  // Get both searchFilter and setSearchFilter from context
  const { searchFilter, setSearchFilter } = useContext(SearchContext)

  useEffect(() => {
    setSearchFilter(null)
  }, [location.pathname, setSearchFilter])

  return (
    <>
      {isAuthenticated ? (
        <SignedIn
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
      ) : (
        <SignedOut />
      )}
    </>
  )
}

// Logged out navbar.
function SignedOut() {
  const navigate = useNavigate()
  return (
    <div className="navbar-container">
      <div className="navbar-logo-container">
        <img
          src={logo}
          alt="CoffeeFirst Logo"
          className="logo"
          draggable={false}
          onClick={() => {
            navigate('/home')
          }}
        />
      </div>
      <div className="navbar-buttons-container">
        <Button
          bg="white"
          fs="medium"
          radius="small"
          padding="medium"
          fw="bold"
          onClick={() => navigate('/login')}
          border="red"
        >
          Sign in
        </Button>
        <Button
          bg="red"
          fs="medium"
          radius="small"
          padding="medium"
          fw="bold"
          onClick={() => navigate('/signup/regform')}
        >
          Sign up
        </Button>
      </div>
    </div>
  )
}

// Pass searchFilter and setSearchFilter as props to SignedIn
function SignedIn({ searchFilter, setSearchFilter }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isFilterOpen, setFilterOpen] = useState(false)

  // Set media queries
  const isDesktop = useMediaQuery({ minWidth: 1025 })

  // Handler for search selection
  const handleSearchSelect = (filter) => {
    setSearchFilter(filter)
    if (filter.type === 'district') {
      if (location.pathname !== '/dashboard/partners') {
        navigate('/dashboard/partners')
      }
    } else if (filter.type === 'cafe') {
      navigate(`/dashboard/partners/${encodeURIComponent(filter.name)}`)
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
        className="logo"
        draggable={false}
        onClick={() => {
          navigate('/home')
        }}
      />
      <div className={styles.navbarMiddleContainer}>
        {/* Pass searchFilter to SearchBar */}
        <SearchBar onSelect={handleSearchSelect} searchFilter={searchFilter} />
        {isDesktop ? <Button
          bg="white"
          fs="small"
          radius="full"
          icon={<FaFilter size={20} />}
          padding="medium"
          fw="bold"
          onClick={() => setFilterOpen(true)}
          >
            Filter
          </Button> : <Button bg="white" fs="small" radius="full" icon={<FaFilter size={20} />} padding="small" fw="bold" onClick={() => setFilterOpen(true)} />}
        {isFilterOpen && <FilterModal onClose={() => setFilterOpen(false)} />}
      </div>
      <div className={styles.navbarRightContainer}>
        {/* <CheckInButton /> */}
        {isDesktop ? <Button bg="red" fs="small" radius="full" icon={<FaBarcode size={20} />} padding="medium" fw="bold" onClick={() => setFilterOpen(true)}>Check in</Button> : <Button bg="red" fs="small" radius="full" icon={<FaBarcode size={20} />} padding="small" fw="bold" onClick={() => setFilterOpen(true)}></Button>}
        {isDesktop ? <Avatar /> : undefined}
        <BurgerMenuButton />
      </div>
    </div>
  )
}

export default NavBar
