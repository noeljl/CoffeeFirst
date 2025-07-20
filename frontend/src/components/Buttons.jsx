import styles from "./styles/Button.module.css";
import { FiSearch, FiFilter, FiGrid, FiMenu } from 'react-icons/fi'
import { useState } from 'react'
import FilterModal from './modals/FilterModal'
import CheckInModal from './modals/CheckInModal'
import BurgerMenuModal from './modals/BurgerMenuModal'
import { useCheckin } from '../hooks/useCheckin'

/* ============================== */
/* Default Button Component */
/* ============================== */

export default function Button({
  children,
  bg = 'red', // red | white | blac
  fs = 'medium', // small | medium | large
  fw = '', // bold
  radius = 'full', // full | small
  padding = 'small',
  icon, // optional icon src
  type = 'button',
  width = 'small',
  border = 'none',
  onClick,
}) {
  const classes = [
    styles.btn,
    styles[`bg-${bg}`],
    styles[`fs-${fs}`],
    styles[`fw-${fw}`],
    styles[`radius-${radius}`],
    styles[`width-${width}`],
    styles[`p-${padding}`],
    styles[`border-${border}`],
  ].join(' ')

  return (
    <button className={classes} onClick={onClick} type={type}>
      {icon && icon}
      {children}
    </button>
  )
}

/* ============================== */
/* Search Button Component */
/* ============================== */

export function SearchButton() {
  return (
    <Button bg="white" fs="small" radius="full" padding="medium" icon={<FiSearch size={20} color="#222" />} width="circle">
      Find our next café
    </Button>
  )
}

export function SearchButtonIcon() {
  return (
    <Button bg="white" fs="small" radius="full" padding="medium" icon={<FiSearch size={20} color="#222" />} width="circle" />
  )
}

/* ============================== */
/* Filter Button Component */
/* ============================== */

export function FilterButtonText() {
  const [isFilterOpen, setFilterOpen] = useState(false)
  return (
    <>  
      <Button bg="white" fs="small" radius="full" padding="medium" icon={<FiFilter size={20} color="#222" />} width="circle" onClick={() => setFilterOpen(true)}>
        Filter
      </Button>
      {isFilterOpen && <FilterModal onClose={() => setFilterOpen(false)} />}
    </>
  )
}

export function FilterButtonIcon() {
  const [isFilterOpen, setFilterOpen] = useState(false)
  return (
    <>
      <Button bg="white" fs="small" radius="full" padding="medium" icon={<FiFilter size={20} color="#222" />} width="circle" onClick={() => setFilterOpen(true)} />
      {isFilterOpen && <FilterModal onClose={() => setFilterOpen(false)} />}
    </>
  )
}

/* ============================== */
/* Check In Button Component */
/* ============================== */

export function CheckInButton() {
  const [isCheckInOpen, setCheckInOpen] = useState(false)
  const { 
    member, 
    membershipName, 
    qrCodeContent, 
    handleCheckInClick, 
    getCurrentImageSrc 
  } = useCheckin()

  const handleButtonClick = () => {
    setCheckInOpen(true)
    handleCheckInClick()
  }

  return (
    <>
      <Button 
        bg="red" 
        fs="small" 
        radius="full" 
        padding="medium" 
        icon={<FiGrid size={20} color="white" />} 
        width="circle" 
        onClick={handleButtonClick}
      >
        Check In
      </Button>
      {isCheckInOpen && (
        <CheckInModal
          onClose={() => setCheckInOpen(false)}
          firstName={member?.firstName}
          lastName={member?.lastName}
          profilePicture={member?.profilePicture}
          getCurrentImageSrc={getCurrentImageSrc}
          membershipName={membershipName}
          qrCodeContent={qrCodeContent}
        />
      )}
    </>
  )
}

export function CheckInButtonIcon() {
  const [isCheckInOpen, setCheckInOpen] = useState(false)
  const { 
    member, 
    membershipName, 
    qrCodeContent, 
    handleCheckInClick, 
    getCurrentImageSrc 
  } = useCheckin()

  const handleButtonClick = () => {
    setCheckInOpen(true)
    handleCheckInClick()
  }

  return (
    <>
      <Button 
        bg="red" 
        fs="small" 
        radius="full" 
        padding="medium" 
        icon={<FiGrid size={20} color="white" />} 
        width="circle" 
        onClick={handleButtonClick} 
      />
      {isCheckInOpen && (
        <CheckInModal
          onClose={() => setCheckInOpen(false)}
          firstName={member?.firstName}
          lastName={member?.lastName}
          profilePicture={member?.profilePicture}
          getCurrentImageSrc={getCurrentImageSrc}
          membershipName={membershipName}
          qrCodeContent={qrCodeContent}
        />
      )}
    </>
  )
}

/* ============================== */
/* Burger Menu Button Component */
/* ============================== */

export function BurgerMenuButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <>
      <Button bg="white" fs="small" radius="full" padding="medium" icon={<FiMenu size={20} color="#222" />} width="circle" onClick={() => setIsMenuOpen(true)}>
        Menu
      </Button>
      {isMenuOpen && <BurgerMenuModal onClose={() => setIsMenuOpen(false)} />}
    </>
  )
}

export function BurgerMenuButtonIcon() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <>
      <Button bg="white" fs="small" radius="full" padding="medium" icon={<FiMenu size={20} color="#222" />} width="circle" onClick={() => setIsMenuOpen(true)} />
      {isMenuOpen && <BurgerMenuModal onClose={() => setIsMenuOpen(false)} />}
    </>
  )
}