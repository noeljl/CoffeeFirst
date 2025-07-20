import styles from '../styles/PricingTable.module.css'
import { FaCheck } from 'react-icons/fa';

export default function PricingColumn({
  name,
  color = '',
  price,
  advantages = ['Test1', 'Test2'],
  id, // Receive the id prop (though not strictly used for styling here, good for context)
  isSelected, // Receive the isSelected prop
  onClick, // Receive the onClick handler
}) {
  return (
    <div className={`${styles.pricingColumn} ${isSelected ? styles.selectedPlan : ''}`} onClick={onClick}>
      <div className={`${styles.pricingColumnHeader} ${styles[`bg-${color}`]}`}>
        <span className={styles.membershipName}>{name}</span>
      </div>
      <div className={styles.pricingColumnHeader} style={{ borderBottom: '1px solid #F2F2F2' }}>
        <span className={styles.membershipPrice}>{price}</span>
        <span> /month</span>
      </div>
      <div className={styles.pricingTableAdvantagesList}>
        {advantages.map((val, key) => (
          <div className={styles.pricingTableAdvantagesListItem} key={key}>
            <FaCheck color= "#DA0A00" size={20} style={{ marginTop: '2px', flexShrink: 0 }} />
            <span className={styles.pricingTableAdvantagesListItemText}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
