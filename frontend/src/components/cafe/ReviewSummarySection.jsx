import styles from "../styles/ReviewSummarySection.module.css";
import { FaStar, FaCoffee, FaStore, FaTree, FaUsers } from "react-icons/fa";
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

export default function ReviewSummarySection({ ratings }) {
  return (
    <div className={styles.reviewContainer}>
      <div className={styles.titleContainer}>
        <FaStar className={styles.icon} />
        <h3>{ratings.average} - {formatReviewCount(ratings.total)}</h3>
      </div>

      {/* Coffee Quality */}
      <div className={styles.ratingsContainer}>
        <div className={styles.ratingsCategory}>
          <FaCoffee className={styles.categoryIcon} />
          <h4>Coffee Quality</h4>
        </div>
        <div className={styles.itemContainer}>
          <div className={styles.ratingItem}>
            <h4>Taste</h4>
            <p>{ratings.coffeeQuality.taste}</p>
          </div>
          <div className={styles.ratingItem}>
            <h4>Presentation</h4>
            <p>{ratings.coffeeQuality.presentation}</p>
          </div>
          <div className={styles.ratingItem}>
            <h4>Temperature</h4>
            <p>{formatBooleanValue(ratings.coffeeQuality.temperature)}</p>
          </div>
        </div>
      </div>

      {/* Café Experience */}
      <div className={styles.ratingsContainer}>
        <div className={styles.ratingsCategory}>
          <FaStore className={styles.categoryIcon} />
          <h4>Café Experience</h4>
        </div>
        <div className={styles.itemContainer}>
          <div className={styles.ratingItem}>
            <h4>Vibe</h4>
            <p>{ratings.experience.vibe}</p>
          </div>
          <div className={styles.ratingItem}>
            <h4>Aesthetics</h4>
            <p>{formatBooleanValue(ratings.experience.aesthetics)}</p>
          </div>
          <div className={styles.ratingItem}>
            <h4>Service Friendliness</h4>
            <p>{ratings.experience.friendliness}</p>
          </div>
          <div className={styles.ratingItem}>
            <h4>Pricing</h4>
            <p>{ratings.experience.pricing}</p>
          </div>
        </div>
      </div>

      {/*Green Impact*/}
      <div className={styles.ratingsContainer}>
        <div className={styles.ratingsCategory}>
          <FaTree className={styles.categoryIcon} />
          <h4>Green Impact</h4>
        </div>
        <div className={styles.itemContainer}>
          <div className={styles.ratingItem}>
            <h4>Eco-Friendly Packaging</h4>
            <p>{formatBooleanValue(ratings.sustainability.ecoPackaging)}</p>
          </div>
          <div className={styles.ratingItem}>
            <h4>Vegan Friendliness</h4>
            <p>{formatBooleanValue(ratings.sustainability.veganFriendly)}</p>
          </div>
        </div>
      </div>

      {/* Community-Based Tags */}
      <div className={styles.ratingsContainer}>
        <div className={styles.ratingsCategory}>
          <FaUsers className={styles.categoryIcon} />
          <h4>Community-Based Tags</h4>
        </div>  
        <div className={styles.itemContainer}>
        <div className={styles.ratingItem}>
            <h4>Social Media</h4>
            <p>{formatBooleanValue(ratings.tags.socialMedia)}</p>
          </div>
          <div className={styles.ratingItem}>
            <h4>Great for Studying</h4>
            <p>{formatBooleanValue(ratings.tags.goodForStudying)}</p>
          </div>  
          <div className={styles.ratingItem}>
            <h4>Date Spot</h4>
            <p>{formatBooleanValue(ratings.tags.dateSpot)}</p>
          </div>
          <div className={styles.ratingItem}>
            <h4>Pet Friendly</h4>
            <p>{formatBooleanValue(ratings.tags.petFriendly)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}