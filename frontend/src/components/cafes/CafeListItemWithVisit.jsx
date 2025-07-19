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

  const formatLastVisit = (visitDate) => {
    if (!visitDate) return null

    const visit = new Date(visitDate)
    const now = new Date()
    const diffInMs = now - visit
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

    if (diffInDays > 0) {
      return `${diffInDays} Tag${diffInDays > 1 ? 'e' : ''} her`
    } else if (diffInHours > 0) {
      return `${diffInHours} Stunde${diffInHours > 1 ? 'n' : ''} her`
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} Minute${diffInMinutes > 1 ? 'n' : ''} her`
    } else {
      return 'Gerade eben'
    }
  }

  const formatVisitDate = (visitDate) => {
    if (!visitDate) return null

    return new Date(visitDate).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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
        {/* Last Visit Information */}
        {lastVisit && (
          <div className="last-visit-info">
            <div className="last-visit-icon">
              <FaClock
                style={{ height: '16px', width: '16px', color: '#3b82f6' }}
              />
            </div>
            <div className="last-visit-details">
              <div className="last-visit-time">
                {formatLastVisit(lastVisit.visitDate)}
              </div>
              <div className="last-visit-date">
                {formatVisitDate(lastVisit.visitDate)}
              </div>
              {lastVisit.coffeeType && (
                <div className="last-visit-coffee">{lastVisit.coffeeType}</div>
              )}
              {visitStats && visitStats.visitCount && (
                <div className="visit-count">
                  {visitStats.visitCount} Besuch
                  {visitStats.visitCount > 1 ? 'e' : ''}
                </div>
              )}
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
