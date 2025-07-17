import { useNavigate } from 'react-router-dom'
import '../../styles/CafeCard.css'
import renderStars from '../../functions/renderStars'

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
        <div className="rating-stars">{renderStars(cafe.rate || 0)}</div>
        <div className="address">
          <div className="street">{cafe.address.streetNo}</div>
          <div className="postCode">{cafe.address.PLZ} {cafe.address.Place}</div>
        </div>
      </div>
    </div>
  )
}