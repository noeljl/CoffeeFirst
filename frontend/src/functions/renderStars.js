// Render stars based on rating
// Props:
// - rating: Rating of the café
// Returns:
// - Array of star elements
export default function renderStars(rating) {
    // Clamp rating between 0 and 5
    const value = Math.max(0, Math.min(5, Number(rating) || 0));
    const fullStars = Math.floor(value);
    const halfStar = value % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={"full-" + i} className="star filled">★</span>);
    }
    if (halfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={"empty-" + i} className="star empty">★</span>);
    }
    return stars;
  }