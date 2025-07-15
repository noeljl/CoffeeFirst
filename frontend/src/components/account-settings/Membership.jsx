// src/pages/membership/Membership.jsx
import React, { useEffect, useState } from 'react'
import CancellationModal from '../cancellationModal/CancellationModal'
import './Membership.css'
import Button from '../../components/ui/buttons/Button.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { getBillingPortal } from '../../apis/stripe.js'
import { getMembershipByMemberId } from '../../apis/membership'
import { resumeMembership } from '../../apis/membership'
import Snackbar from '../ui/snackbar/Snackbar'
import { getMembershipByMemberIDAction } from '../../store/accountSettings/AccountSettings.actions.js'

const advantages = [
  'Large plan advantage 1',
  'Large plan advantage 2',
  'Large plan advantage 3',
  'Large plan advantage 4',
  'Large plan advantage 5',
]

export default function Membership() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [membership, setMembership] = useState(null)
  const [isCanceled, setIsCanceled] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMsg, setSnackbarMsg] = useState('')

  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.member)
  const memberId = currentUser?._id
  const membershipName = useSelector(
    (state) => state.accountSettings.membership?.chosenMembership?.name
  )
  const membershipId = currentUser?.membership
  const subscriptionId = currentUser?.stripeSubscriptionId

  // Membership-Daten beim Mounten laden
  useEffect(() => {
    if (memberId) {
      dispatch(getMembershipByMemberIDAction(memberId))
    }
  }, [memberId, dispatch])

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
      const nextDay = new Date(endDate)
      nextDay.setDate(endDate.getDate() + 1)
      displayDate = nextDay.toLocaleDateString('de-DE', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      return `Your plan auto-renews on ${displayDate}`
    } else {
      displayDate = endDate.toLocaleDateString('de-DE', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
      return `Your plan will be canceled on ${displayDate}`
    }
  }

  const handleMembershipClick = async () => {
    if (!isCanceled) {
      setIsModalOpen(true)
    } else {
      await handleResumeMembership()
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleContinueFromModal = () => {
    console.log('User chose to continue their coffee journey!')
    setIsModalOpen(false)
  }

  const handleManagePayment = async () => {
    try {
      setIsLoading(true)
      const stripeCustomerId = currentUser?.stripeCustomerId

      if (!stripeCustomerId) {
        alert('No billing information found. Please contact support.')
        return
      }

      const response = await getBillingPortal(stripeCustomerId)
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
      await fetchMembership()
      setIsCanceled(false)
      showSnackbar('Your subscription has been successfully renewed.')
    } catch (error) {
      console.error('Error resuming membership:', error)
    }
  }

  const showSnackbar = (msg) => {
    setSnackbarMsg(msg)
    setSnackbarOpen(true)
  }

  const features = useSelector(
    (state) => state.accountSettings.membership?.chosenMembership?.features
  )

  return (
    <div className="membership-container">
      <h1 className="membership-title">Membership</h1>

      <section className="membership-section auto-renew">
        <h2 className="membership-heading">
          CoffeeFirst {membershipName || '...'}
        </h2>
        <div className="membership-two-col">
          <p className="membership-text">
            {membership ? getRenewalText() : 'Loading...'}
          </p>
          {isCanceled ? (
            <Button
              bg="black"
              radius="small"
              padding="small"
              fw="bold"
              onClick={handleMembershipClick}
            >
              Continue Subscription
            </Button>
          ) : (
            <Button
              bg="red"
              radius="small"
              padding="small"
              fw="bold"
              onClick={handleMembershipClick}
            >
              Cancel Subscription
            </Button>
          )}
        </div>
      </section>

      <hr className="membership-divider" />

      <section className="membership-section plan-details">
        <p className="membership-text" style={{ fontWeight: 'bold' }}>
          Thank you for subscribing to CoffeeFirst {membershipName}! <br />
          Your {membershipName} subscription includes the following:
        </p>
        <ul className="plan-advantages">
          {features && features.length > 0 ? (
            features.map((feature, i) => (
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
                {feature}
              </li>
            ))
          ) : (
            <li>No features found.</li>
          )}
        </ul>
      </section>

      <hr className="membership-divider" />

      <div className="membership-two-col">
        <p className="membership-text">Manage Payment</p>
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

      <CancellationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onContinue={handleContinueFromModal}
        onCancelSuccess={async () => {
          await fetchMembership()
          setIsCanceled(true)
          showSnackbar('Your subscription has been successfully canceled.')
        }}
      />
      <Snackbar
        open={snackbarOpen}
        message={snackbarMsg}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  )
}
