// Handler for 'Get direction' button
// Props:
// - cafe: Cafe object
// Returns:
// - void
export default function handleGetDirection(coords) {

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude
        const destLat = coords.lat
        const destLng = coords.lng
        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destLat},${destLng}`
        window.open(url, '_blank')
      },
      (error) => {
        alert('Could not get your location. Please allow location access.')
      }
    )
  }