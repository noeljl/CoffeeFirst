import React, { useState, useEffect } from 'react'
import Snackbar from '../snackbar/Snackbar'
import Button from '../ui/buttons/Button'
import Icons from '../../assets/Icons'
import './CafeHeaderSection.css'
import { addCoffeeShopToMemberList, removeCoffeeShopFromMemberList } from '../../apis/member'
import { useSelector } from 'react-redux'

function CafeHeaderSection({ cafe }) {
  const member = useSelector((state) => state.auth.member)
  const memberId = member?.id

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  // Local state for wishlist and favorites
  const [wishlist, setWishlist] = useState(member?.wishlistCoffeeShops || [])
  const [favorites, setFavorites] = useState(member?.favoriteCoffeeShops || [])

  // Keep local state in sync with Redux member (e.g. on login/logout)
  useEffect(() => {
    setWishlist(member?.wishlistCoffeeShops || [])
    setFavorites(member?.favoriteCoffeeShops || [])
  }, [member])

  const isInWishlist = wishlist.includes(cafe._id)
  const isInFavorites = favorites.includes(cafe._id)

  // Handler for 'Add to Wishlist' button
  const handleAddToWishlist = async (memberId, cafeId, listType) => {
    try {
      await addCoffeeShopToMemberList(memberId, cafeId, listType)
      setSnackbarMessage('Added to wishlist!')
      setSnackbarOpen(true)
    } catch (err) {
      setSnackbarMessage('Failed to add to wishlist.')
      setSnackbarOpen(true)
    }
  }

  // Handler for 'Add to Favorites' button
  const handleAddToFavorites = async (memberId, cafeId, listType) => {
    try {
      await addCoffeeShopToMemberList(memberId, cafeId, listType)
      setSnackbarMessage('Added to favorites!')
      setSnackbarOpen(true)
    } catch (err) {
      setSnackbarMessage('Failed to add to favorites.')
      setSnackbarOpen(true)
    }
  }

  const handleRemoveFromWishlist = async (memberId, cafeId, listType) => {
    try {
      await removeCoffeeShopFromMemberList(memberId, cafeId, listType)
      setSnackbarMessage('Removed from wishlist!')
      setSnackbarOpen(true)
      setWishlist((prev) => prev.filter((id) => id !== cafeId))
    } catch (err) {
      setSnackbarMessage('Failed to remove from wishlist.')
      setSnackbarOpen(true)
    }
  }

  const handleRemoveFromFavorites = async (memberId, cafeId, listType) => {
    try {
      await removeCoffeeShopFromMemberList(memberId, cafeId, listType)
      setSnackbarMessage('Removed from favorites!')
      setSnackbarOpen(true)
      setFavorites((prev) => prev.filter((id) => id !== cafeId))
    } catch (err) {
      setSnackbarMessage('Failed to remove from favorites.')
      setSnackbarOpen(true)
    }
  }

  // Handler for 'Get direction' bdutton
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
        <h1>{cafe.name}</h1>
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
                ? handleRemoveFromWishlist(memberId, cafe._id, 'wishlistCoffeeShops')
                : handleAddToWishlist(memberId, cafe._id, 'wishlistCoffeeShops')
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
                ? handleRemoveFromFavorites(memberId, cafe._id, 'favoriteCoffeeShops')
                : handleAddToFavorites(memberId, cafe._id, 'favoriteCoffeeShops')
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
