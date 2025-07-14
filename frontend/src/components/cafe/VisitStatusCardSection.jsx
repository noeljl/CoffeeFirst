import { useState } from "react";
import Icons from "../../assets/Icons";
import Button from "../ui/buttons/Button";
import Review from "../review/Review"; // 1) Import the Review modal
import "./VisitStatusCardSection.css";

function VisitStatusCardSection({ lastVisit, cafe }) {
  const [showReviewModal, setShowReviewModal] = useState(false); // 2) State for modal

  // 3) Handler to open the modal
  const handleOpenReview = () => setShowReviewModal(true);

  // 5) Handler to close the modal
  const handleCloseReview = () => setShowReviewModal(false);

  return (
    <section className="statusContainer">
      <div className="visitInfo">
        <img src={Icons.coffeeShopColor} alt="Cafe Icon" className="cafeIcon" />
        <div className="textContainer">
          <h2 id="visitTitle">Last visit</h2>
          <p id="visitDate">Last visit on {lastVisit.date}.</p>
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
        <Review onClose={handleCloseReview} cafe={cafe} />
      )}
    </section>
  );
}

export default VisitStatusCardSection;