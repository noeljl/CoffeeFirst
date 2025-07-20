import { AMENITY_ICONS } from './amenityIcons';
import styles from "../styles/CafeDetails.module.css";

function CafeOffersSection({ list }) {
  return <section className={styles.detailsSection}>
    <h3>Features & Extras</h3>
    <div className={styles.aspectsContainer}>
      <div className={styles.aspectGrid}>
        {list.map((aspect, index) => (
          <div className={styles.aspect} key={index}>
            <img src={AMENITY_ICONS[aspect]} alt={aspect} />
            <div className={styles.aspectDetails}>{aspect.replace(/_/g, ' ')}</div>
          </div>
        ))}
      </div>
    </div>
  </section>;
}

export default CafeOffersSection;