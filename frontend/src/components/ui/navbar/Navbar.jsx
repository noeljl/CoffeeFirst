import { useState } from 'react'
import './Navbar.css'
import Button from '../../ui/buttons/Button'
import { useNavigate } from 'react-router-dom'
import BurgerMenuButton from '../../ui/burger-menu/BurgerMenu'
import Avatar from '../../ui/avatar/Avatar'
import FilterButton from '../../ui/filter/Filter'
import SearchBar from '../../ui/search-bar/SearchBar'
import CheckInButton from '../../ui/check-in/CheckIn'
import '../../../App.css'
import Icons from '../../../assets/Icons'
import { useSelector } from 'react-redux'

// Handles both navbar types: logged in and out.
function NavBar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  return (
    <div className="page-frame">
      {isAuthenticated ? <SignedIn /> : <SignedOut />}
    </div>
  )
}

// Logged out navbar.
function SignedOut() {
  const navigate = useNavigate()
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
    </div>
  )
}

// Logged in navbar
function SignedIn() {
  const navigate = useNavigate()
  const menuState = useState(false)
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

      <div className="gap">
        <SearchBar />
        <FilterButton />
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
