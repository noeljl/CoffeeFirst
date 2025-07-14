import { useNavigate } from 'react-router-dom'
import './SingleCafeCard.css'

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
        <p>{props.rate}</p>
        <p>{displayAddress}</p>
      </div>
    </div>
  )
}

export default SingleCafeCard
