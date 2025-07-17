// RatingModal.jsx
import React, { useState, useEffect } from "react";
import "./Review.css";
import coffeeImage from "../../assets/png/coffee-cup.png"; // image for the review pop-up 
import Icons from "../../assets/Icons";
import axios from "axios"; // or use your API utility
import Button from "../buttons/Button"; // At the top if not already imported
import { createReview } from "../../apis/review"; // Import the API function

function Review({ onClose, cafe, onReviewSubmitted }) {
  // State for all rating options
  const [ratings, setRatings] = useState({
    taste: null,
    presentation: null,
    serviceFriendliness: null,
    pricing: null,
  });
  const [vibe, setVibe] = useState(null);
  const [aesthetics, setAesthetics] = useState(null);
  const [servedAtRightTemp, setServedAtRightTemp] = useState(null);
  const [ecoFriendly, setEcoFriendly] = useState(null);
  const [veganFriendly, setVeganFriendly] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [greatForStudying, setGreatForStudying] = useState(null);
  const [dateSpot, setDateSpot] = useState(null);
  const [petFriendly, setPetFriendly] = useState(null);
  const [comment, setComment] = useState("");

  const handleRating = (category, value) => setRatings((prev) => ({ ...prev, [category]: value }));

  const handleSave = async () => {
    try {
      await createReview({
        coffeeShop: cafe._id,
        rating: ratings.taste || 1, // Use taste as the main rating
        comment,
        subject: "Coffee Quality",
        // Coffee Quality
        taste: ratings.taste,
        presentation: ratings.presentation,
        temperature: servedAtRightTemp,
        // Café Experience
        vibe: vibe,
        aesthetics: aesthetics,
        serviceFriendliness: ratings.serviceFriendliness,
        pricing: ratings.pricing === 1 ? '€' : ratings.pricing === 2 ? '€€' : '€€€',
        // Sustainability
        ecoFriendly: ecoFriendly,
        veganFriendly: veganFriendly,
        // Community-Based Tags
        instagram: instagram,
        greatForStudying: greatForStudying,
        dateSpot: dateSpot,
        petFriendly: petFriendly,
      });
      
      // Call the callback to notify parent components
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
      
      onClose();
    } catch (err) {
      alert("Failed to submit review");
    }
  };

  useEffect(() => {
    setRatings({
      taste: null,
      presentation: null,
      serviceFriendliness: null,
      pricing: null,
    });
    setVibe(null);
    setAesthetics(null);
    setServedAtRightTemp(null);
    setEcoFriendly(null);
    setVeganFriendly(null);
    setInstagram(null);
    setGreatForStudying(null);
    setDateSpot(null);
    setPetFriendly(null);
  }, []);

  return (
    <div className="rating-overlay">
      <div className="rating-modal">
        {/* Exit 'X' button at top right */}
        <button
          className="close-modal-btn"
          onClick={onClose}
          aria-label="Close review modal"
        >
          x
        </button>
        <img src={coffeeImage} alt="Coffee" className="rating-header-img" />
        <div className="review-header">
          <div className="review-prompt">Please rate your last visit at</div>
          <div className="review-cafe-name">{cafe?.name}</div>
        </div>
        <div className="rating-content">
          {/* Coffee Quality */}
          <div className="rating-section">
            <h2>☕ Coffee Quality</h2>
            <div className="rating-row">
              <div className="rating-label">Taste</div>
              <div>
                <p className="rating-desc">How good did the coffee taste?</p>
                <div className="rating-options rating-pill-group">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      className={`rating-button ${ratings.taste === val ? "selected" : ""}`}
                      onClick={() => handleRating("taste", val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Presentation */}
            <div className="rating-row">
              <div className="rating-label">Presentation</div>
              <div>
                <p className="rating-desc">Was your drink presented well?</p>
                <div className="rating-options rating-pill-group">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      className={`rating-button ${ratings.presentation === val ? "selected" : ""}`}
                      onClick={() => handleRating("presentation", val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="rating-row">
              <div className="rating-label">Temperature</div>
              <div>
                <p className="rating-desc">Was the drink served at the right temperature?</p>
                <div className="yes-no-switch">
                  <button
                    className={servedAtRightTemp === true ? "yes selected" : "yes"}
                    onClick={() => setServedAtRightTemp(true)}
                    type="button"
                  >
                    Yes
                  </button>
                  <button
                    className={servedAtRightTemp === false ? "no selected" : "no"}
                    onClick={() => setServedAtRightTemp(false)}
                    type="button"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Café Experience */}
          <div className="rating-section">
            <h2>🏠 Café Experience</h2>
            {/* Vibe (Cozy, Loud, etc.) */}
            <div className="rating-row">
              <div className="rating-label">Vibe</div>
              <div>
                <p className="rating-desc">What's the atmosphere like?</p>
                <div className="yes-no-switch">
                  <button
                    className={vibe === "cozy" ? "yes selected" : "yes"}
                    onClick={() => setVibe("cozy")}
                    type="button"
                  >
                    Cozy
                  </button>
                  <button
                    className={vibe === "vibrant" ? "no selected" : "no"}
                    onClick={() => setVibe("vibrant")}
                    type="button"
                  >
                    Vibrant
                  </button>
                </div>
              </div>
            </div>
            {/* Aesthetics Yes/No */}
            <div className="rating-row">
              <div className="rating-label">Aesthetics</div>
              <div>
                <p className="rating-desc">Is the café visually appealing?</p>
                <div className="yes-no-switch">
                  <button
                    className={aesthetics ? "yes selected" : "yes"}
                    onClick={() => setAesthetics(true)}
                    type="button"
                  >
                    Yes
                  </button>
                  <button
                    className={aesthetics === false ? "no selected" : "no"}
                    onClick={() => setAesthetics(false)}
                    type="button"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
            {/* Service Friendliness (1-5) */}
            <div className="rating-row">
              <div className="rating-label">Service Friendliness</div>
              <div>
                <p className="rating-desc">How friendly was the service?</p>
                <div className="rating-options rating-pill-group">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      className={`rating-button ${ratings.serviceFriendliness === val ? "selected" : ""}`}
                      onClick={() => handleRating("serviceFriendliness", val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Pricing (€, €€, €€€) */}
            <div className="rating-row">
              <div className="rating-label">Pricing</div>
              <div>
                <p className="rating-desc">How was the pricing?</p>
                <div className="rating-options rating-pill-group">
                  <button
                    className={`rating-button ${ratings.pricing === 1 ? "selected" : ""}`}
                    onClick={() => handleRating("pricing", 1)}
                  >
                    €
                  </button>
                  <button
                    className={`rating-button ${ratings.pricing === 2 ? "selected" : ""}`}
                    onClick={() => handleRating("pricing", 2)}
                  >
                    €€
                  </button>
                  <button
                    className={`rating-button ${ratings.pricing === 3 ? "selected" : ""}`}
                    onClick={() => handleRating("pricing", 3)}
                  >
                    €€€
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sustainability */}
          <div className="rating-section">
            <h2>🌱 Sustainability</h2>
            {/* Eco-Friendly Packaging Yes/No */}
            <div className="rating-row">
              <div className="rating-label">Eco-Friendly<br/>Packaging</div>
              <div>
                <p className="rating-desc">Paper cups, reusable options, etc.</p>
                <div className="yes-no-switch">
                  <button
                    className={ecoFriendly ? "yes selected" : "yes"}
                    onClick={() => setEcoFriendly(true)}
                    type="button"
                  >
                    Yes
                  </button>
                  <button
                    className={ecoFriendly === false ? "no selected" : "no"}
                    onClick={() => setEcoFriendly(false)}
                    type="button"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
            {/* Vegan Friendliness Yes/No */}
            <div className="rating-row">
              <div className="rating-label">Vegan<br/>Friendliness</div>
              <div>
                <p className="rating-desc">Is the café vegan-friendly?</p>
                <div className="yes-no-switch">
                  <button
                    className={veganFriendly ? "yes selected" : "yes"}
                    onClick={() => setVeganFriendly(true)}
                    type="button"
                  >
                    Yes
                  </button>
                  <button
                    className={veganFriendly === false ? "no selected" : "no"}
                    onClick={() => setVeganFriendly(false)}
                    type="button"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Community-Based Tags */}
          <div className="rating-section">
            <h2>❤️ Community-Based Tags</h2>
            {/* Instagram Yes/No */}
            <div className="rating-row">
              <div className="rating-label">Instagram</div>
              <div>
                <p className="rating-desc">Is the café instagrammable?</p>
                <div className="yes-no-switch">
                  <button
                    className={instagram ? "yes selected" : "yes"}
                    onClick={() => setInstagram(true)}
                    type="button"
                  >
                    Yes
                  </button>
                  <button
                    className={instagram === false ? "no selected" : "no"}
                    onClick={() => setInstagram(false)}
                    type="button"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
            {/* Great for Studying Yes/No */}
            <div className="rating-row">
              <div className="rating-label">Great for<br/>Studying</div>
              <div>
                <p className="rating-desc">Is it possible to study at the café?</p>
                <div className="yes-no-switch">
                  <button
                    className={greatForStudying ? "yes selected" : "yes"}
                    onClick={() => setGreatForStudying(true)}
                    type="button"
                  >
                    Yes
                  </button>
                  <button
                    className={greatForStudying === false ? "no selected" : "no"}
                    onClick={() => setGreatForStudying(false)}
                    type="button"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
            {/* Date Spot Yes/No */}
            <div className="rating-row">
              <div className="rating-label">Date Spot</div>
              <div>
                <p className="rating-desc">Would you recommend this café for a date?</p>
                <div className="yes-no-switch">
                  <button
                    className={dateSpot ? "yes selected" : "yes"}
                    onClick={() => setDateSpot(true)}
                    type="button"
                  >
                    Yes
                  </button>
                  <button
                    className={dateSpot === false ? "no selected" : "no"}
                    onClick={() => setDateSpot(false)}
                    type="button"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
            {/* Pet Friendly Yes/No */}
            <div className="rating-row">
              <div className="rating-label">Pet Friendly</div>
              <div>
                <p className="rating-desc">Is this a pet-friendly café?</p>
                <div className="yes-no-switch">
                  <button
                    className={petFriendly ? "yes selected" : "yes"}
                    onClick={() => setPetFriendly(true)}
                    type="button"
                  >
                    Yes
                  </button>
                  <button
                    className={petFriendly === false ? "no selected" : "no"}
                    onClick={() => setPetFriendly(false)}
                    type="button"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Experience prompt and textarea */}
          <button className="save-rating" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Review;


