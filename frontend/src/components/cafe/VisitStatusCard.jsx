import { useState } from 'react'
import { useSelector } from 'react-redux'
import Icons from '../../assets/Icons.js'
import Button from '../Buttons.jsx'
import Review from '../review/Review.jsx' // 1) Import the Review modal
import { useLastVisit } from '../../hooks/useVisits.js'
import styles from'./VisitStatusCard.module.css'

function VisitStatusCardSection({ cafe, onReviewSubmitted }) {
  const member = useSelector((state) => state.auth.member)
  const memberId = member?.id

  const { lastVisit, loading, error } = useLastVisit(memberId, cafe._id)
  const [showReviewModal, setShowReviewModal] = useState(false) // 2) State for modal

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // 3) Handler to open the modal
  const handleOpenReview = () => setShowReviewModal(true)

  // 5) Handler to close the modal
  const handleCloseReview = () => setShowReviewModal(false)

  // Handler for when review is submitted
  const handleReviewSubmitted = () => {
    setShowReviewModal(false)
    if (onReviewSubmitted) {
      onReviewSubmitted() // Notify parent component
    }
  }

  if (loading) {
    return (
      <section className={styles.statusContainer}>
        <div className={styles.visitInfo}>
          <img
            src={Icons.coffeeShopColor}
            alt="Cafe Icon"
            className={styles.cafeIcon}
          />  
          <div className={styles.textContainer}>
            <h2 id="visitTitle">Letzter Besuch</h2>
            <p id="visitDate">Laden...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.statusContainer}>
        <div className={styles.visitInfo}>
          <img
            src={Icons.coffeeShopColor}
            alt="Cafe Icon"
            className={styles.cafeIcon}
          />
          <div className={styles.textContainer}>
            <h2 id="visitTitle">Letzter Besuch</h2>
            <p id="visitDate">Fehler beim Laden</p>
          </div>
        </div>
      </section>
    )
  }

  if (!lastVisit) {
    return (
      <section className={styles.statusContainer}>
        <div className={styles.visitInfo}>
          <img
            src={Icons.coffeeShopColor}
            alt="Cafe Icon"
            className={styles.cafeIcon}
          />
          <div className={styles.textContainer}>
            <h2 id="visitTitle">Letzter Besuch</h2>
            <p id="visitDate">Noch kein Besuch</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.statusContainer}>
      <div className={styles.visitInfo}>
        <img src={Icons.coffeeShopColor} alt="Cafe Icon" className={styles.cafeIcon} />
        <div className={styles.textContainer}>
          <h2 id="visitTitle">Letzter Besuch</h2>
          <p id="visitDate">{formatDate(lastVisit.visitDate)}</p>
        </div>
      </div>
      {/* 3) Open modal on click */}
      <Button
        bg="white"
        fw="bold"
        fs="medium"
        icon={Icons.starGold2}
        radius="small"
        padding="medium"
        onClick={handleOpenReview} // Add click handler
      >
        Your review
      </Button>
      {/* 4)Conditionally render the modal */}
      {showReviewModal && (
        <Review
          onClose={handleCloseReview}
          cafe={cafe}
          onReviewSubmitted={handleReviewSubmitted} // Pass callback
        />
      )}
    </section>
  )
}

export default VisitStatusCardSection
