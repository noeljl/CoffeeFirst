import { addCoffeeShopToMemberList, removeCoffeeShopFromMemberList } from '../apis/member.js'

// Handle adding cafe to favorites
export const handleAddToFavorites = async (memberId, listType, cafe, setSnackbarMessage, setSnackbarOpen, addToFavorites, removeFromFavorites) => {
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

  

  // Handle removing cafe from favorites
  export const handleRemoveFromFavorites = async (memberId, listType, cafe, setSnackbarMessage, setSnackbarOpen, addToFavorites, removeFromFavorites) => {
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