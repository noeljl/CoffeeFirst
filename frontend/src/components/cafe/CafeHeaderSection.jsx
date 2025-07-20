import React, { useState } from 'react'
import Snackbar from '../snackbar/Snackbar'
import { FaHeart,FaRegHeart, FaStar, FaRegStar, FaDirections } from 'react-icons/fa'
import styles from '../styles/CafeHeader.module.css'

import { useSelector } from 'react-redux'
import useGetWishlist from '../../hooks/useGetWishlist'
import useGetFavorites from '../../hooks/useGetFavorites'
import renderStars from '../../functions/renderStars'
import handleGetDirection from '../../functions/handleGetDirection'
import { handleAddToWishlist, handleRemoveFromWishlist } from '../../functions/handleWishlistActions'
import { handleAddToFavorites, handleRemoveFromFavorites } from '../../functions/handleFavoriteActions'

function CafeHeaderSection({ cafe }) {
  const member = useSelector((state) => state.auth.member)
  const memberId = member?.id
  // Snackbar state for user feedback
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  // Get wishlist and favorites data with local update functions
  const { data: wishlist = [], loading: wishlistLoading, addToWishlist, removeFromWishlist } = useGetWishlist(memberId)
  const { data: favorites = [], loading: favoritesLoading, addToFavorites, removeFromFavorites } = useGetFavorites(memberId)

  // Check if cafe is in user's lists
  const isInWishlist = wishlist.some(cafeObj => cafeObj._id === cafe._id)
  const isInFavorites = favorites.some(cafeObj => cafeObj._id === cafe._id)

  const onAddToWishlist = () => handleAddToWishlist(
    memberId,
    'wishlistCoffeeShops',
    cafe,
    setSnackbarMessage,
    setSnackbarOpen,
    addToWishlist,
    removeFromWishlist
  )
  const onRemoveFromWishlist = () => handleRemoveFromWishlist(
    memberId,
    'wishlistCoffeeShops',
    cafe,
    setSnackbarMessage,
    setSnackbarOpen,
    addToWishlist,
    removeFromWishlist
  )
  const onAddToFavorites = () => handleAddToFavorites(
    memberId,
    'favoriteCoffeeShops',
    cafe,
    setSnackbarMessage,
    setSnackbarOpen,
    addToFavorites,
    removeFromFavorites
  )
  const onRemoveFromFavorites = () => handleRemoveFromFavorites(
    memberId,
    'favoriteCoffeeShops',
    cafe,
    setSnackbarMessage,
    setSnackbarOpen,
    addToFavorites,
    removeFromFavorites
  )

  // Show loading state while data is being fetched
  if (wishlistLoading || favoritesLoading) return <div>Loading...</div>


  return (
    <>
      {/* Snackbar for user feedback */}
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
      <div className={styles.headerContainer}>
        <div className={styles.headerTitleContainer}>
          <h2 className={styles.headerTitle}>{cafe.name}</h2>
          <div className={styles.headerRatingContainer}>
            {renderStars(cafe.averageRating || 0)}
          </div>
        </div>
        <div className={styles.headerImageContainer}>
          <img className={styles.headerImageMain} src={cafe.images[0]} alt={cafe.name} />
          <div className={styles.headerImageSecondaryContainer}>
            <img
              className={styles.headerImageSecondaryUpper}
              src={cafe.images[1]}
              alt="Gallery 1"
            />
            <img
              className={styles.headerImageSecondaryLower}
              src={cafe.images[2]}
              alt="Gallery 2"
            />
          </div>
        </div>
        <div className={styles.headerButtonContainer}>
          {isInWishlist ? <FaHeart size={30} color='#DA0A00' style={{cursor: 'pointer'}} onClick={onRemoveFromWishlist}/> : <FaRegHeart size={30} color='#222' style={{cursor: 'pointer'}} onClick={onAddToWishlist}/>}
          {isInFavorites ? <FaStar size={30} color='#FFD73F' style={{cursor: 'pointer'}} onClick={onRemoveFromFavorites}/> : <FaRegStar size={30} color='#222' style={{cursor: 'pointer'}} onClick={onAddToFavorites}/>}
          <FaDirections size={30} color='#222' style={{cursor: 'pointer'}} onClick={() => handleGetDirection(cafe.address)}/>
        </div>
      </div>
    </>
  )
}

export default CafeHeaderSection
