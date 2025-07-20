import { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../Buttons.jsx'
import Review from '../review/Review.jsx' // 1) Import the Review modal
import { useLastVisit } from '../../hooks/useVisits.js'
import styles from'../styles/VisitStatusCard.module.css'
import { FaRegCalendarAlt, FaPen } from "react-icons/fa";

export default function VisitStatusCard({ cafe, onReviewSubmitted }) {
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

return (
  <div className={styles.statusContainer}>
    <div className={styles.leftContainer}>
      <FaRegCalendarAlt size={30} color='#222' />
      <div className={styles.textContainer}>
        <h3>Your last visit</h3>
        {loading ? <p>Loading...</p> : undefined}
        {error ? <p>Some coffee came on your server. Give us a moment to fix it.</p> : undefined}
        {!lastVisit ? <p>No visit yet</p> : undefined}
        {lastVisit && <p>Your last visit was on {formatDate(lastVisit.visitDate)}</p>}
      </div>
    </div>
    <div className={styles.rightContainer}>
      <Button icon={<FaPen size={15} />} bg="white" fs="medium" radius="full" padding="medium" width="full" onClick={handleOpenReview}>
        My review
      </Button>
      {showReviewModal && (
        <Review
          onClose={handleCloseReview}
          cafe={cafe}
          onReviewSubmitted={handleReviewSubmitted} // Pass callback
        />
      )}
    </div>
  </div>
  )
}



  {/* if (loading) {
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
      {/* <Button
        bg="white"
        fw="bold"
        fs="medium"
        icon={Icons.starGold2}
        radius="small"
        padding="medium"
        onClick={handleOpenReview} // Add click handler
      >
        Your review
      </Button> */}
      {/* 4)Conditionally render the modal */}
      {/* {showReviewModal && (
        <Review
          onClose={handleCloseReview}
          cafe={cafe}
          onReviewSubmitted={handleReviewSubmitted} // Pass callback
        />
      )}
    </section> */}
