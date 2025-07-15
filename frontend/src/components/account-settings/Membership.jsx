// src/pages/membership/Membership.jsx
import React, { useState } from 'react' // Import useState
import CancellationModal from '../cancellationModal/CancellationModal' // Import the modal
import './Membership.css'
import Button from '../../components/ui/buttons/Button.jsx'

const advantages = [
  'Large plan advantage 1',
  'Large plan advantage 2',
  'Large plan advantage 3',
  'Large plan advantage 4',
  'Large plan advantage 5',
]

export default function Membership() {
  const [isModalOpen, setIsModalOpen] = useState(false) // State to control modal visibility

  const handleCancelMembershipClick = () => {
    setIsModalOpen(true) // Open the modal when the button is clicked
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

  return (
    <div className="membership-settings-page">
      <main className="membership-info-container">
        <h1 className="membership-info-title">Membership Settings</h1>
        <section className="ms-section auto-renew">
          <h2 className="ms-heading">Next auto-renew</h2>
          <p className="ms-text">Your plan auto-renews on Jun 18, 2025</p>
        </section>
        <section className="ms-section plan-details">
          <h2 className="ms-heading">CoffeeFirst Silver</h2>
          <p className="ms-text">
            Thanks for subscribing to CoffeeFirst Silver! Your Silver plan
            includes:
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
        <Button bg="red" radius="small" padding="medium" fw="bold">
          Cancel membership
        </Button>
      </main>

      {/* Render the CancellationModal, passing props to control its visibility and actions */}
      <CancellationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onContinue={handleContinueFromModal}
      />
    </div>
  )
}
