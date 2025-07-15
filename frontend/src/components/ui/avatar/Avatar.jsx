import './Avatar.css'
import { useSelector } from 'react-redux'

function Avatar() {
  // Get member data from Redux state
  const accountSettingsMember = useSelector(
    (state) => state.accountSettings.member
  )
  const authMember = useSelector((state) => state.auth.member)

  // Use accountSettings member if available, otherwise fall back to auth member
  const member = accountSettingsMember || authMember
  const profilePicture = member?.profilePicture

  // Function to get the correct image source
  const getCurrentImageSrc = () => {
    if (
      profilePicture &&
      profilePicture !== 'https://example.com/default-profile.png' &&
      profilePicture !== ''
    ) {
      // Check if it's already a full URL (http or https)
      if (
        profilePicture.startsWith('http://') ||
        profilePicture.startsWith('https://')
      ) {
        return profilePicture
      }
      // Construct the URL for local images
      return `http://localhost:3001/profileImages/${profilePicture}`
    }
    // Return default image if no profile picture is available
    return 'http://localhost:3001/profileImages/example_picture.jpeg'
  }

  return (
    <div>
      <img
        className="avatar"
        src={getCurrentImageSrc()}
        alt="User"
        draggable={false}
        onError={(e) => {
          console.log('Avatar image failed to load:', e.target.src)
          e.target.src =
            'http://localhost:3001/profileImages/example_picture.jpeg'
        }}
      />
    </div>
  )
}

export default Avatar
