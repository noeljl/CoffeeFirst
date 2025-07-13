// src/pages/membership/Membership.jsx
import React, { useEffect, useState } from 'react' // Import useState
import CancellationModal from '../cancellationModal/CancellationModal' // Import the modal
import './Membership.css'
import Button from '../../components/ui/buttons/Button.jsx'
import { useSelector } from 'react-redux' // Import useSelector
import { getBillingPortal } from '../../apis/stripe.js' // Import the billing portal API
import { getMembershipByMemberId } from '../../apis/membership'
import { resumeMembership } from '../../apis/membership'
import Snackbar from '../ui/snackbar/Snackbar';

const advantages = [
  'Large plan advantage 1',
  'Large plan advantage 2',
  'Large plan advantage 3',
  'Large plan advantage 4',
  'Large plan advantage 5',
]

export default function Membership() {
  const [isModalOpen, setIsModalOpen] = useState(false) // State to control modal visibility
  const [isLoading, setIsLoading] = useState(false) // State for loading during API call
  const [membership, setMembership] = useState(null)
  const [isCanceled, setIsCanceled] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  
  // Get current user data from Redux state
  const currentUser = useSelector((state) => state.auth.member)
  const memberId = currentUser?._id
  const membershipId = currentUser?.membership
  const subscriptionId = currentUser?.stripeSubscriptionId

  const fetchMembership = async () => {
    try {
      const response = await getMembershipByMemberId(memberId)
      setMembership(response)
    } catch (error) {
      console.error('Error fetching membership:', error)
    }
  }

  useEffect(() => {
    if (memberId) fetchMembership()
  }, [memberId])

  // Update isCanceled whenever membership changes
  useEffect(() => {
    if (membership) {
      setIsCanceled(membership.renewalAfterExpiration === false)
    }
  }, [membership])

  const getRenewalText = () => {
   
    if (!membership) return ''
    const endDate = new Date(membership.endDate)
    let displayDate

    if (membership.renewalAfterExpiration) {
      // Add one day to endDate
      const nextDay = new Date(endDate)
      nextDay.setDate(endDate.getDate() + 1)
      displayDate = nextDay.toLocaleDateString('de-DE', { month: 'short', day: 'numeric', year: 'numeric' })
      return `Your plan auto-renews on ${displayDate}`
    } else {
      displayDate = endDate.toLocaleDateString('de-DE', { month: 'long', day: 'numeric', year: 'numeric' })
      return `Your plan will be canceled on ${displayDate}`
    }
  }

  const handleMembershipClick = async () => {
    if (!isCanceled) {
      setIsModalOpen(true) // Show the modal for cancellation
    } else {
      // Logic to update the membership collection to resume/reactivate subscription
      // Example: call a function to update MongoDB and Stripe
      await handleResumeMembership()
    }
  } 

  const handleCloseModal = () => {
    setIsModalOpen(false) // Close the modal
  }

  const handleContinueFromModal = () => {
    // Here you would typically navigate the user or perform some other action
    console.log('User chose to continue their coffee journey!')
    setIsModalOpen(false) // Close the modal
    // Example: Redirect to another page
    // window.location.href = '/some-other-page';
  }

  const handleManagePayment = async () => {
    try {
      setIsLoading(true)
      
      // Get stripeCustomerId from Redux state
      const stripeCustomerId = currentUser?.stripeCustomerId

      console.log('stripeCustomerId', currentUser.stripeCustomerId)
      
      if (!stripeCustomerId) {
        alert('No billing information found. Please contact support.')
        return
      }

      // Get the billing portal URL
      const response = await getBillingPortal(stripeCustomerId)
      
      // Redirect to Stripe billing portal
      window.location.href = response.url
    } catch (error) {
      console.error('Error accessing billing portal:', error)
      alert('Unable to access billing portal. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResumeMembership = async () => {
    try {
      await resumeMembership(membershipId, subscriptionId)
      await fetchMembership();
      setIsCanceled(false);
      showSnackbar('Your subscription has been successfully renewed.');
    } catch (error) {
      console.error('Error resuming membership:', error)
    }
  }

  const showSnackbar = (msg) => {
    setSnackbarMsg(msg);
    setSnackbarOpen(true);
  };

  return (
    <div className="membership-settings-page">
      <main className="membership-info-container">
        <h1 className="membership-info-title">Membership</h1>
        <section className="ms-section auto-renew">
          <h2 className="ms-heading">CoffeeFirst Silver</h2>
          <div className="two-col-container">
          <p className="ms-text">{membership ? getRenewalText() : 'Loading...'}</p>
          {isCanceled ? (
            <Button bg="black" radius="small" padding="small" fw="bold" onClick={handleMembershipClick}>
              Continue Subscription
            </Button>
          ) : (
            <Button bg="red" radius="small" padding="small" fw="bold" onClick={handleMembershipClick}>
              Cancel Subscription
            </Button>
          )}
        </div>
        </section>
        <hr className="ms-divider" />
        <section className="ms-section plan-details">
          <p className="ms-text" style={{ fontWeight: 'bold' }}>
            Thank you for subscribing to CoffeeFirst Silver! <br /> 
            Your Silver subscription includes the following:
          </p>
          <ul className="plan-advantages">
            {advantages.map((item, i) => (
              <li key={i}>
                <svg
                  className="check-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <polyline
                    points="20 6 9 17 4 12"
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </section>
        <hr className="ms-divider" />
        <div className="two-col-container">
          <p className="ms-text">Manage Payment</p>
          <Button 
            bg="red" 
            radius="small" 
            padding="small" 
            fw="bold"
            onClick={handleManagePayment}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Manage'}
          </Button>
        </div>
       

      </main>

      {/* Render the CancellationModal, passing props to control its visibility and actions */}
      <CancellationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onContinue={handleContinueFromModal}
        onCancelSuccess={async () => {
          await fetchMembership();
          setIsCanceled(true);
          showSnackbar('Your subscription has been successfully canceled.');
        }}
      />
      <Snackbar open={snackbarOpen} message={snackbarMsg} onClose={() => setSnackbarOpen(false)} />
    </div>
  )
}
