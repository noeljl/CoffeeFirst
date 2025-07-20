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

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  // Use hooks to get up-to-date wishlist and favorites
  const { data: wishlist = [], loading: wishlistLoading } = useGetWishlist(memberId)
  const { data: favorites = [], loading: favoritesLoading } = useGetFavorites(memberId)

  // Check if the cafe is in the lists
  const isInWishlist = wishlist.some(cafeObj => cafeObj._id === cafe._id)
  const isInFavorites = favorites.some(cafeObj => cafeObj._id === cafe._id)

  // Handler for 'Add to Wishlist' button
  const handleAddToWishlist = async (memberId, listType) => {
    try {
      await addCoffeeShopToMemberList(memberId, cafe._id, listType)
      setSnackbarMessage('Added to wishlist!')
      setSnackbarOpen(true)
    } catch (err) {
      setSnackbarMessage('Failed to add to wishlist.')
      setSnackbarOpen(true)
    }
  }

  // Handler for 'Add to Favorites' button
  const handleAddToFavorites = async (memberId, listType) => {
    try {
      await addCoffeeShopToMemberList(memberId, cafe._id, listType)
      setSnackbarMessage('Added to favorites!')
      setSnackbarOpen(true)
    } catch (err) {
      setSnackbarMessage('Failed to add to favorites.')
      setSnackbarOpen(true)
    }
  }

  const handleRemoveFromWishlist = async (memberId, listType) => {
    try {
      await removeCoffeeShopFromMemberList(memberId, cafe._id, listType)
      setSnackbarMessage('Removed from wishlist!')
      setSnackbarOpen(true)
    } catch (err) {
      setSnackbarMessage('Failed to remove from wishlist.')
      setSnackbarOpen(true)
    }
  }

  const handleRemoveFromFavorites = async (memberId, listType) => {
    try {
      await removeCoffeeShopFromMemberList(memberId, cafe._id, listType)
      setSnackbarMessage('Removed from favorites!')
      setSnackbarOpen(true)
    } catch (err) {
      setSnackbarMessage('Failed to remove from favorites.')
      setSnackbarOpen(true)
    }
  }

  if (wishlistLoading || favoritesLoading) return <div>Loading...</div>

  // Handler for 'Get direction' button
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
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <h1>{cafe.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '20px' }}>
            {renderStars(cafe.averageRating || 0)}
          </div>
        </div>
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
        <div className="buttonContainer">
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
