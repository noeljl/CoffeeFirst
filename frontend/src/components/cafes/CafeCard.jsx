import { useNavigate } from 'react-router-dom'
import styles from '../styles/CafeCard.module.css'
import renderStars from '../../functions/renderStars'
import { FaHeart, FaRegHeart, FaRegStar, FaStar, FaDirections } from 'react-icons/fa'
import handleGetDirection from '../../functions/handleGetDirection'


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
    navigate(`/dashboard/discover/${cafe.slug}`)
  }

  return (
    <div className={styles.cafeCardContainer} onClick={handleClick}>
      <div className={styles.cafeCardImage}>
        <img src={cafe.imgSrc} alt={cafe.title} draggable={false} />
      </div>
      <div className={styles.cafeCardContent}>
        <h4 className={styles.cafeCardTitle}>{cafe.title}</h4>
        <div className={styles.cafeCardRating}>{renderStars(cafe.rate || 0)}</div>
        <div className={styles.cafeCardAddress}>
          <p>{cafe.address.streetNo}</p>
          <p>{cafe.address.PLZ} {cafe.address.Place}</p>
        </div>
      </div>
    </div>
  )
}