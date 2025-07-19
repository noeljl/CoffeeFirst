import React, { useState, useContext, useEffect } from 'react'
import './Navbar.css'
import Button from '../buttons/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import BurgerMenuButton from '../burger-menu/BurgerMenu'
import Avatar from '../avatar/Avatar'
import FilterModal from '../filter/FilterModal'
import SearchBar from '../search-bar/SearchBar'
import CheckInButton from '../check-in/CheckIn'
// import '../../App.css'

import Icons from '../../assets/Icons'

// Import your SearchContext
import { SearchContext } from '../../contexts/SearchContext'
import { useSelector } from 'react-redux'

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
    <div className="page-frame">
      {isAuthenticated ? (
        <SignedIn
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
      ) : (
        <SignedOut />
      )}
    </div>
  )
}

// Logged out navbar.
function SignedOut() {
  const navigate = useNavigate()
  return (
    <div className="navbar-container">
      <div className="navbar-logo-container">
      <img
        src={Icons.logo}
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
    <div className="navbar-container">
      <img
        src={Icons.logo}
        alt="CoffeeFirst Logo"
        className="logo"
        draggable={false}
        onClick={() => {
          navigate('/home')
        }}
      />
      <div className="gap-nav-middle">
        {/* Pass searchFilter to SearchBar */}
        <SearchBar onSelect={handleSearchSelect} searchFilter={searchFilter} />
        <Button
          bg="white"
          fs="small"
          radius="full"
          icon={Icons.filter}
          padding="medium"
          fw="bold"
          onClick={() => setFilterOpen(true)}
        >
          Filter
        </Button>
        {isFilterOpen && <FilterModal onClose={() => setFilterOpen(false)} />}
      </div>
      <div className="gap">
        <CheckInButton />
        <Avatar />
        <BurgerMenuButton />
      </div>
    </div>
  )
}

export default NavBar
