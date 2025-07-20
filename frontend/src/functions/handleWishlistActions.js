import { addCoffeeShopToMemberList, removeCoffeeShopFromMemberList } from '../apis/member.js'

// Handle adding cafe to wishlist
export const handleAddToWishlist = async (memberId, listType, cafe, setSnackbarMessage, setSnackbarOpen, addToWishlist, removeFromWishlist) => {
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

  // Handle removing cafe from wishlist
  export const handleRemoveFromWishlist = async (memberId, listType, cafe, setSnackbarMessage, setSnackbarOpen, addToWishlist, removeFromWishlist) => {
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