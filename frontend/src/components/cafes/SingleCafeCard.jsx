import { useNavigate } from 'react-router-dom'
import './SingleCafeCard.css'

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

function SingleCafeCard(props) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/dashboard/partners/${props.slug}`)
  }

  // Format address if it's an object
  let displayAddress = ''
  if (props.address && typeof props.address === 'object') {
    displayAddress = `${props.address.streetNo}, ${props.address.PLZ} ${props.address.Place}`
  } else if (typeof props.address === 'string') {
    displayAddress = props.address
  }

  return (
    <div
      className="coffee-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={props.imgSrc}
        draggable={false}
        alt={props.title}
        onError={(e) => {
          console.error('Image failed to load:', e.target.src)
          e.target.style.display = 'none'
        }}
        onLoad={() => {
          console.log('Image loaded successfully:', props.imgSrc)
        }}
      />
      <div className="text-block">
        <p className="shop-title">{props.title}</p>
        <div className="rating-stars">{renderStars(props.rate)}</div>
        <p className="address">{displayAddress}</p>
      </div>
    </div>
  )
}

export default SingleCafeCard
