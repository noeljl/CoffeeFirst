import "./ReviewSummarySection.css";
import Icons from "../../assets/Icons";

// Helper function to convert boolean values to "Yes"/"No" strings
const formatBooleanValue = (value) => {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return value; // Return the original value if it's not a boolean
};

// Helper function to format review count with proper pluralization
const formatReviewCount = (count) => {
  if (count === 0) return "No reviews yet!";
  if (count === 1) return "1 review";
  return `${count} reviews`;
};

function ReviewSummarySection({ ratings }) {
  return (
    <section className="reviewContainer">
      <div className="titleContainer">
        <img src={Icons.ratingStar} className="icon" alt="" />
        <h2 className="title">{ratings.average} - {formatReviewCount(ratings.total)}</h2>
      </div>
      <div>
        <div className="titleContainer">
          <img src={Icons.cupHot} className="icon" alt="" />
          <h3>Coffee Quality</h3>
        </div>
        <div className="ratingsContainer">
           <div className="ratingItem">
            <p className="ratingLabel">☕ Taste</p>
            <p className="ratingValue">{ratings.coffeeQuality.taste}</p>
          </div>
          <div className="ratingItem">
            <p className="ratingLabel">🎨 Presentation</p>
            <p className="ratingValue">{ratings.coffeeQuality.presentation}</p>
          </div>
          <div className="ratingItem">
            <p className="ratingLabel">🌡️ Temperature</p>
            <p className="ratingValue">{formatBooleanValue(ratings.coffeeQuality.temperature)}</p>
          </div>
        </div>
        <div className="titleContainer">
          <img src={Icons.coffeeShop} className="icon" alt="" />
          <h3>Café Experience</h3>
        </div>
        <div className="ratingsContainer">
          <div className="ratingItem">
            <p className="ratingLabel">💫 Vibe</p>
            <p className="ratingValue">{ratings.experience.vibe}</p>
          </div>
          <div className="ratingItem">
            <p className="ratingLabel">✨ Aesthetics</p>
            <p className="ratingValue">{formatBooleanValue(ratings.experience.aesthetics)}</p>
          </div>
           <div className="ratingItem">
            <p className="ratingLabel">😊 Service Friendliness</p>
            <p className="ratingValue">{ratings.experience.friendliness}</p>
          </div>
           <div className="ratingItem">
            <p className="ratingLabel">💰 Pricing</p>
            <p className="ratingValue">{ratings.experience.pricing}</p>
          </div>
        </div>
        <div className="titleContainer">
          <img src={Icons.tree} className="icon" alt="" />
          <h3>Sustainability</h3>
        </div>
        <div className="ratingsContainer">
          <div className="ratingItem">
            <p className="ratingLabel">♻️ Eco-Friendly Packaging</p>
            <p className="ratingValue">{formatBooleanValue(ratings.sustainability.ecoPackaging)}</p>
          </div>
          <div className="ratingItem">
            <p className="ratingLabel">🌱 Vegan Friendliness</p>
            <p className="ratingValue">{formatBooleanValue(ratings.sustainability.veganFriendly)}</p>
          </div>
        </div>
         <div className="titleContainer">
          <img src={Icons.communityGroup} className="icon" alt="" />
          <h3>Community-Based Tags</h3>
        </div>
        <div className="ratingsContainer">
          <div className="ratingItem">
            <p className="ratingLabel">📱 Social Media</p>
            <p className="ratingValue">{formatBooleanValue(ratings.tags.socialMedia)}</p>
          </div>
          <div className="ratingItem">
            <p className="ratingLabel">📚 Great for Studying</p>
            <p className="ratingValue">{formatBooleanValue(ratings.tags.goodForStudying)}</p>
          </div>
          <div className="ratingItem">
            <p className="ratingLabel">💕 Date Spot</p>
            <p className="ratingValue">{formatBooleanValue(ratings.tags.dateSpot)}</p>
          </div>
          <div className="ratingItem">
            <p className="ratingLabel">🐕 Pet Friendly</p>
            <p className="ratingValue">{formatBooleanValue(ratings.tags.petFriendly)}</p>
          </div>
        </div>
      </div>
    </section >
  )
}

export default ReviewSummarySection;