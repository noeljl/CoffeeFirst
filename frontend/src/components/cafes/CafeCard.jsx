import { useNavigate } from 'react-router-dom'
import '../../styles/CafeCard.css'

// CafeCard component
// Cafe:
// - imgSrc: URL of the café's image
// - title: Name of the café
// - rate: Rating of the café
// - address: Address of the café
// - slug: Slug of the café
export default function CafeCard(cafe) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/dashboard/partners/${cafe.slug}`)
  }

  return (
    <div
      className="coffee-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={cafe.imgSrc}
        draggable={false}
        alt={cafe.title}
        onError={(e) => {
          console.error('Image failed to load:', e.target.src)
          e.target.style.display = 'none'
        }}
        onLoad={() => {
          console.log('Image loaded successfully:', cafe.imgSrc)
        }}
      />
      <div className="text-block">
        <p className="shop-title">{cafe.title}</p>
        <div className="rating-stars">{renderStars(cafe.rate)}</div>
        <p className="address">{formatAddress(cafe.address)}</p>
      </div>
    </div>
  )
}

// Render stars based on rating
// Props:
// - rating: Rating of the café
// Returns:
// - Array of star elements
function renderStars(rating) {
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

// Format address if it's an object
// Props:
// - address: Address of the café
// Returns:
// - Formatted address string
function formatAddress(address) {
  // Format address if it's an object
  let displayAddress = ''
  if (address && typeof address === 'object') {
    displayAddress = `${address.streetNo}, ${address.PLZ} ${address.Place}`
  } else if (typeof address === 'string') {
    displayAddress = address
  }
  return displayAddress
}