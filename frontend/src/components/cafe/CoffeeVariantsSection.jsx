import styles from "../styles/CafeDetails.module.css";
import Icons from '../../assets/Icons';

function CoffeeVariantsSection({list}) {
 return <section className={styles.detailsSection}>
    <h3>Coffee You Can Order</h3>
    <div className={styles.aspectsContainer}>
      <div className={styles.aspectGrid}>
        {list.map((aspect, index) => (
          <div className={styles.aspect} key={index}>
            <img src={Icons.coffeeBean} />
            <div className={styles.aspectDetails}>{aspect}</div>
          </div>
        ))}
      </div>
    </div>
  </section>;
}

export default CoffeeVariantsSection;