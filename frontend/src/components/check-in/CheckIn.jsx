import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './CheckIn.css'
import Button from '../buttons/Button'
import Icons from '../../assets/Icons'
import {
  getMembershipByMemberIDAction,
  getMemberByIdAction,
} from '../../store/accountSettings/AccountSettings.actions'
// Corrected import: Use named export QRCodeCanvas
import { QRCodeCanvas } from 'qrcode.react'

function CheckInButton() {
  const [isCheckInOpen, setCheckInOpen] = useState(false)
  const [membershipName, setMembershipName] = useState('')
  const [qrCodeContent, setQrCodeContent] = useState('')
  const dispatch = useDispatch()

  const accountSettingsMember = useSelector(
    (state) => state.accountSettings.member
  )
  const authMember = useSelector((state) => state.auth.member)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const isInitialized = useSelector((state) => state.auth.isInitialized)

  // Use accountSettings member if available, otherwise fall back to auth member
  const member = accountSettingsMember || authMember
  const firstNameVar = member?.firstName
  const memberId = member?.id // Use UUID instead of MongoDB ObjectId
  const lastNameVar = member?.lastName
  const profilePicture = member?.profilePicture

  const membership = useSelector((state) => state.accountSettings.membership)

  useEffect(() => {
    if (isAuthenticated && isInitialized) {
      console.log('membership in useEffect:', membership)
      // Try to get memberId from either accountSettings or auth member
      const currentMemberId = authMember?.id // Use UUID instead of MongoDB ObjectId
      if (currentMemberId) {
        dispatch(getMemberByIdAction(currentMemberId))
      } else {
        console.log('No memberId available, cannot dispatch actions')
      }
    } else {
      console.log('CheckIn useEffect - not authenticated or not initialized:', {
        isAuthenticated,
        isInitialized,
      })
    }
  }, [isAuthenticated, isInitialized, memberId, authMember, dispatch])

  // Effect to set membership name and generate QR code content
  useEffect(() => {
    if (member && membership) {
      const membershipName = membership.chosenMembership?.name || 'N/A'
      setMembershipName(membershipName)

      const content = JSON.stringify({
        cardCode: membership?.chosenMembership?.cardCode,
        memberId: member.id ? member.id.toString() : null, // Use UUID instead of MongoDB ObjectId
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        coffeeQuotaLeft: membership.coffeeQuotaLeft,
        startDate: membership.startDate,
        endDate: membership.endDate,
        paymentStatus: member.paymentStatus,
        membership: membership.chosenMembership?.name,
      })
      setQrCodeContent(content)
    } else {
      setQrCodeContent('')
      setMembershipName('N/A')
    }
  }, [member, membership])

  const handleCheckInClick = () => {
    setCheckInOpen(true)
    // Dispatch to get full membership details if needed for the modal
    // This action should use the UUID for the member
    if (member?.id) {
      // Use member.id here, which is the UUID
      dispatch(getMembershipByMemberIDAction(member.id))
    }
  }

  const handleCloseModal = () => {
    setCheckInOpen(false)
  }

  // This function stays here as it requires 'profilePicture' from this component's scope
  const getCurrentImageSrc = () => {
    console.log(
      'getCurrentImageSrc called with profilePicture:',
      profilePicture
    )
    console.log('member object:', member)

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
        console.log('Using full URL:', profilePicture)
        return profilePicture
      }
      // Construct the URL for local images
      const localUrl = `http://localhost:3001/profileImages/${profilePicture}`
      console.log('Using local URL:', localUrl)
      return localUrl
    }
    // Return the example picture as default if no profile picture is available
    console.log('Using default image')
    return 'http://localhost:3001/profileImages/example_picture.jpeg'
  }

  return (
    <div>
      <Button
        bg="red"
        fs="small"
        radius="full"
        icon={Icons.scanBarcode}
        padding="medium"
        fw="bold"
        onClick={handleCheckInClick}
      >
        Check-in
      </Button>

      {isCheckInOpen && (
        <CheckInModal
          onClose={handleCloseModal}
          firstName={firstNameVar}
          lastName={lastNameVar}
          profilePicture={profilePicture}
          getCurrentImageSrc={getCurrentImageSrc}
          membershipName={membershipName}
          qrCodeContent={qrCodeContent}
        />
      )}
    </div>
  )
}

function CheckInModal({
  onClose,
  firstName,
  lastName,
  profilePicture,
  getCurrentImageSrc,
  membershipName,
  qrCodeContent, // Receive the QR code content here
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="member-card">
          <div className="member-avatar">
            <img
              src={getCurrentImageSrc()}
              alt="Profilbild"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                console.log('Image failed to load:', e.target.src)
                e.target.src =
                  'http://localhost:3001/profileImages/example_picture.jpeg'
              }}
            />
          </div>

          <h2 className="member-card-title">Member card from</h2>
          <h3 className="member-name">
            {firstName} {lastName}
          </h3>
          <p className="member-status">{membershipName} Member</p>

          <p className="member-instructions">
            Please show your member card at the
            <br />
            store to get your coffee.
          </p>

          <div className="qr-code">
            {qrCodeContent ? (
              // Use QRCodeCanvas instead of QRCode
              <QRCodeCanvas
                value={qrCodeContent}
                size={200} // Adjust size as needed
                level="H" // Error correction level (L, M, Q, H)
                includeMargin={false}
              />
            ) : (
              <div className="qr-placeholder">
                <div className="qr-pattern"></div>
                <p>Loading QR Code...</p>
              </div>
            )}
          </div>

          <button className="done-button" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckInButton
