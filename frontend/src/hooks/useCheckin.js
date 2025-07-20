import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getMembershipByMemberIDAction,
  getMemberByIdAction,
} from '../store/accountSettings/AccountSettings.actions.js'

export function useCheckin() {
  const [membershipName, setMembershipName] = useState('')
  const [qrCodeContent, setQrCodeContent] = useState('')
  const dispatch = useDispatch()

  const accountSettingsMember = useSelector(
    (state) => state.accountSettings.member
  )
  const authMember = useSelector((state) => state.auth.member)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const isInitialized = useSelector((state) => state.auth.isInitialized)
  const membership = useSelector((state) => state.accountSettings.membership)

  // Use accountSettings member if available, otherwise fall back to auth member
  const member = accountSettingsMember || authMember
  const memberId = member?.id // Use UUID instead of MongoDB ObjectId

  // Effect to handle authentication and fetch member data
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

  // Function to handle check-in click and fetch membership data
  const handleCheckInClick = () => {
    // Dispatch to get full membership details if needed for the modal
    // This action should use the UUID for the member
    if (member?.id) {
      // Use member.id here, which is the UUID
      dispatch(getMembershipByMemberIDAction(member.id))
    }
  }

  // Function to get current image source
  const getCurrentImageSrc = () => {
    const profilePicture = member?.profilePicture
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

  return {
    member,
    membershipName,
    qrCodeContent,
    handleCheckInClick,
    getCurrentImageSrc,
    isAuthenticated,
    isInitialized
  }
}
