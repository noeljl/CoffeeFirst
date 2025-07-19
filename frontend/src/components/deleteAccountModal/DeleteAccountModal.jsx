import React from 'react'
import './DeleteAccountModal.css'
import Button from '../buttons/Button.jsx'
import { deleteMember } from '../../apis/member.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onDeleteSuccess,
}) {
  const navigate = useNavigate()
  const member = useSelector((state) => state.auth.member)
  const memberId = member?.id

  if (!isOpen) return null

  const handleDeleteAccount = async () => {
    try {
      console.log('Executing DeleteAccountModal')
      console.log('member', member)
      console.log('memberId', memberId)
      
      // Check if member data is available
      if (!memberId) {
        console.error('Member data not available')
        return
      }

      await deleteMember(memberId)
      if (onDeleteSuccess) onDeleteSuccess()
      onClose()
      // Redirect to home page after successful deletion
      navigate('/')
    } catch (error) {
      console.error('Error deleting account:', error)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="warning-icon">
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
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h2>Are you sure you want to delete your account?</h2>
        <p>This action cannot be undone. All your data, including memberships, reviews, and preferences will be permanently deleted.</p>
        <div className="modal-buttons">
          <Button className="cancel-button" bg="black" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="delete-button"
            bg="red"
            onClick={handleDeleteAccount}
            disabled={!memberId}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
} 