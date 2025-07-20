import React, { useState } from 'react'
import Snackbar from '../snackbar/Snackbar'
import Button from '../Buttons'
import Icons from '../../assets/Icons'
import './CafeHeaderSection.css'
import { addCoffeeShopToMemberList, removeCoffeeShopFromMemberList } from '../../apis/member'
import { useSelector } from 'react-redux'
import useGetWishlist from '../../hooks/useGetWishlist'
import useGetFavorites from '../../hooks/useGetFavorites'
import renderStars from '../../functions/renderStars'

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

  // Handle adding cafe to wishlist
  const handleAddToWishlist = async (memberId, listType) => {
    try {
      // Update local state immediately for instant UI feedback
      addToWishlist(cafe._id)
      // Show success message
      setSnackbarMessage('Added to wishlist!')
      setSnackbarOpen(true)
      // Make API call in background
      await addCoffeeShopToMemberList(memberId, cafe._id, listType)
    } catch (err) {
      // Revert local state if API call fails
      removeFromWishlist(cafe._id)
      setSnackbarMessage('Failed to add to wishlist.')
      setSnackbarOpen(true)
    }
  }

  // Handle adding cafe to favorites
  const handleAddToFavorites = async (memberId, listType) => {
    try {
      // Update local state immediately for instant UI feedback
      addToFavorites(cafe._id)
      // Show success message
      setSnackbarMessage('Added to favorites!')
      setSnackbarOpen(true)
      // Make API call in background
      await addCoffeeShopToMemberList(memberId, cafe._id, listType)
    } catch (err) {
      // Revert local state if API call fails
      removeFromFavorites(cafe._id)
      setSnackbarMessage('Failed to add to favorites.')
      setSnackbarOpen(true)
    }
  }

  // Handle removing cafe from wishlist
  const handleRemoveFromWishlist = async (memberId, listType) => {
    try {
      // Update local state immediately for instant UI feedback
      removeFromWishlist(cafe._id)
      // Show success message
      setSnackbarMessage('Removed from wishlist!')
      setSnackbarOpen(true)
      // Make API call in background
      await removeCoffeeShopFromMemberList(memberId, cafe._id, listType)
    } catch (err) {
      // Revert local state if API call fails
      addToWishlist(cafe._id)
      setSnackbarMessage('Failed to remove from wishlist.')
      setSnackbarOpen(true)
    }
  }

  // Handle removing cafe from favorites
  const handleRemoveFromFavorites = async (memberId, listType) => {
    try {
      // Update local state immediately for instant UI feedback
      removeFromFavorites(cafe._id)
      // Show success message
      setSnackbarMessage('Removed from favorites!')
      setSnackbarOpen(true)
      // Make API call in background
      await removeCoffeeShopFromMemberList(memberId, cafe._id, listType)
    } catch (err) {
      // Revert local state if API call fails
      addToFavorites(cafe._id)
      setSnackbarMessage('Failed to remove from favorites.')
      setSnackbarOpen(true)
    }
  }

  // Show loading state while data is being fetched
  if (wishlistLoading || favoritesLoading) return <div>Loading...</div>

  // Handle getting directions to cafe
  const handleGetDirection = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude
        const destLat = cafe.coords.lat
        const destLng = cafe.coords.lng
        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destLat},${destLng}`
        window.open(url, '_blank')
      },
      (error) => {
        alert('Could not get your location. Please allow location access.')
      }
    )
  }

  return (
    <>
      {/* Snackbar for user feedback */}
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
      <section>
        {/* Cafe header with name and rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <h1>{cafe.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '20px' }}>
            {renderStars(cafe.averageRating || 0)}
          </div>
        </div>
        {/* Cafe image gallery */}
        <div className="imageContainer">
          <img className="mainImage" src={cafe.images[0]} alt={cafe.name} />
          <div className="secondaryImages">
            <img
              className="secondaryImage upperImage"
              src={cafe.images[1]}
              alt="Gallery 1"
            />
            <img
              className="secondaryImage lowerImage"
              src={cafe.images[2]}
              alt="Gallery 2"
            />
          </div>
        </div>
        {/* Action buttons container */}
        <div className="buttonContainer">
          {/* Wishlist button - toggles between add/remove */}
          <Button
            icon={Icons.heart}
            radius="small"
            fw="bold"
            fs="medium"
            bg="white"
            padding="medium"
            onClick={() =>
              isInWishlist
                ? handleRemoveFromWishlist(memberId, 'wishlistCoffeeShops')
                : handleAddToWishlist(memberId, 'wishlistCoffeeShops')
            }
          >
            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </Button>
          {/* Favorites button - toggles between add/remove */}
          <Button
            icon={Icons.favorite}
            radius="small"
            fw="bold"
            bg="white"
            padding="medium"
            onClick={() =>
              isInFavorites
                ? handleRemoveFromFavorites(memberId, 'favoriteCoffeeShops')
                : handleAddToFavorites(memberId, 'favoriteCoffeeShops')
            }
          >
            {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
          {/* Directions button - opens Google Maps */}
          <Button
            icon={Icons.map}
            radius="small"
            fw="bold"
            bg="white"
            padding="medium"
            onClick={handleGetDirection}
          >
            Get direction
          </Button>
        </div>
      </section>
    </>
  )
}

export default CafeHeaderSection
