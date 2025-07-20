import styles from "../styles/CafeDetails.module.css";
import { FaTree } from "react-icons/fa";
import Icons from "../../assets/Icons";

export default function SustainabilitySection({ list }) {
  return (
    <section className={styles.detailsSection}>
      <div className={styles.titleContainer}>
        <h3>Green Impact</h3>
        <img className={styles.fairtradeLogo} src={Icons.fairtradeLogo} alt="Fairtrade logo" />
      </div>
      <div className={styles.aspectsContainer}>
        <div className={styles.aspectGrid}>
          {list.map((aspect, index) => (
            <div className={styles.aspect} key={index}>
              <FaTree size={25} />
              <div className={styles.aspectDetails}>{aspect}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}