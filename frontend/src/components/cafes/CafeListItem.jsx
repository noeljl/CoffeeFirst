import { useNavigate } from 'react-router-dom'
import styles from '../styles/CafeListItem.module.css'
import renderStars from '../../functions/renderStars'
import handleGetDirection from '../../functions/handleGetDirection'
import { FaHeart, FaRegHeart, FaRegStar, FaStar, FaDirections } from 'react-icons/fa'

export default function CafeListItem(cafe) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/dashboard/partners/${cafe.slug}`)
    }


    return (
        <div className={styles.cafeListItemContainer}
            style={{ cursor: 'pointer' }}
        >
            <div className={styles.colLeft}
                onClick={handleClick}>
                <img
                    className={styles.cafeListItemImg}
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
                <div className={styles.textBlock}>
                    <div className={styles.cafeTitle}>{cafe.title}</div>    
                    <div className={styles.ratingStars}>{renderStars(cafe.rate || 0)}</div>
                    <div className={styles.address}>
                        <div className={styles.street}>{cafe.address.streetNo}</div>
                        <div className={styles.postCode}>{cafe.address.PLZ} {cafe.address.Place}</div>
                    </div>
                </div>
            </div>
            <div className={styles.colRight}>
                <div className={styles.iconBtn}>
                    <FaRegHeart className={styles.faIcons} />
                    <FaRegStar className={styles.faIcons} />
                    <FaDirections className={styles.faIcons} onClick={() => handleGetDirection(cafe.coords)} />
                </div>
            </div>
        </div>
    )
}