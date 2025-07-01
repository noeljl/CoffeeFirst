// RatingModal.jsx
import { useState } from "react";
import "./Review.css";
import coffeeImage from "../../assets/png/mvm-cafe.png"; // Replace with actual image path
import Icons from "../../assets/Icons";

function Review({ onClose }) {
  const [ratings, setRatings] = useState({ taste: 1, presentation: 1 });

  const handleRating = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <div className="rating-overlay">
      <div className="rating-modal">
        <img src={coffeeImage} alt="Coffee" className="rating-header-img" />
        <div className="rating-content">
          <p>Please rate your last visit at</p>
          <h2>Man versus Machine Coffee Roasters</h2>
          <hr />

          <div className="rating-section">
            <div className="rating-title">
              <img src={Icons.cupHot} alt="coffee" />
              <span>Coffee Quality</span>
            </div>

            <div className="rating-category">
              <div className="rating-label">Taste</div>
              <p>How good does the coffee taste?</p>
              <div className="rating-options">
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

            <div className="rating-category">
              <div className="rating-label">Presentation</div>
              <p>Visual appeal: latte art, cup design, etc.</p>
              <div className="rating-options">
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
              <p className="note">Was the drink served at the right temperature?</p>
            </div>
          </div>

          <button className="save-rating" onClick={onClose}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Review;


