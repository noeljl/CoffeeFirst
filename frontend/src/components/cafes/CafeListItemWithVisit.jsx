import { useNavigate } from 'react-router-dom'
import './CafeListItem.css'
import renderStars from '../../functions/renderStars'
import handleGetDirection from '../../functions/handleGetDirection'
import {
  FaHeart,
  FaRegHeart,
  FaRegStar,
  FaStar,
  FaDirections,
  FaClock,
} from 'react-icons/fa'

export default function CafeListItemWithVisit({ cafe, lastVisit, visitStats }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/dashboard/partners/${cafe.slug}`)
  }

  const formatVisitDate = (visitDate) => {
    if (!visitDate) return null

    return new Date(visitDate).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="cafe-list-item-container" style={{ cursor: 'pointer' }}>
      <div className="col-left" onClick={handleClick}>
        <img
          className="cafe-list-item-img"
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
          <div className="shop-title">{cafe.title}</div>
          <div className="rating-stars">{renderStars(cafe.rate || 0)}</div>
          <div className="address">
            <div className="street">{cafe.address.streetNo}</div>
            <div className="postCode">
              {cafe.address.PLZ} {cafe.address.Place}
            </div>
          </div>
        </div>
      </div>
      <div className="col-right">
        {/* Last Visit Information - Only Date */}
        {lastVisit && (
          <div className="last-visit-info">
            <div className="last-visit-date-only">
              {formatVisitDate(lastVisit.visitDate)}
            </div>
          </div>
        )}

        <div className="icon-btn">
          <FaRegHeart style={{ height: '30px', width: '30px' }} />
          <FaRegStar style={{ height: '30px', width: '30px' }} />
          <FaDirections
            style={{ height: '30px', width: '30px' }}
            onClick={() => handleGetDirection(cafe.coords)}
          />
        </div>
      </div>
    </div>
  )
} 