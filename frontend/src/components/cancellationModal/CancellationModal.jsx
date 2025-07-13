import React from 'react'
import './CancellationModal.css' // You'll need to create this CSS file
import Button from '../../components/ui/buttons/Button.jsx'
import { cancelMembership } from '../../apis/membership.js'
import { useSelector } from 'react-redux'

export default function CancellationModal({ isOpen, onClose, onContinue, onCancelSuccess }) {
  const membeshipId = useSelector((state) => state.auth.member.membership)
  const subscriptionId = useSelector((state) => state.auth.member.stripeSubscriptionId)
 
  if (!isOpen) return null

  const handleCancelMembership = async () => {
    try {
      await cancelMembership(membeshipId, subscriptionId)
      if (onCancelSuccess) onCancelSuccess() // <-- refetch membership
      onClose()
    } catch (error) {
      console.error('Error canceling membership:', error)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="heart-icon">
          {/* You can use an SVG icon or an image for the broken heart */}
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19.34 11.23a4.78 4.78 0 0 0-4.63-3.66c-1.39 0-2.73.53-3.72 1.5l-4.59 4.6a4.78 4.78 0 0 0-.01 6.75l.18.18a4.78 4.78 0 0 0 6.76-.01l4.59-4.6c.99-.98 1.52-2.32 1.52-3.71z" />
            <line x1="14.34" y1="12.23" x2="19.34" y2="17.23" />
            <line x1="9.34" y1="7.23" x2="4.34" y2="2.23" />
          </svg>
        </div>
        <h2>We're sorry to see you go!</h2>
        <p>Your coffee journey doesn't have to end here."</p>
        <div className="modal-buttons">
          <Button className="continue-button" bg="black" onClick={onContinue}>
            Continue
          </Button>
          <Button className="cancel-button" bg="red" onClick={handleCancelMembership}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
