import './PricingTable.css'
import Icons from '../../assets/Icons'
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
    <div className={`pricing-column ${isSelected ? 'selected-plan' : ''}`} onClick={onClick}>
      <div className={`pricing-column-header bg-${color}`}>
        <span className="membership-name">{name}</span>
      </div>
      <div className="pricing-column-header" style={{ borderBottom: '1px solid #F2F2F2' }}>
        <span className="membership-price">{price}</span>
        <span> /month</span>
      </div>
      <div className="pricing-table-advantages-list">
        {advantages.map((val, key) => (
          <div className="pricing-table-advantages-list-item" key={key}>
            <FaCheck color= "#DA0A00" size={20} style={{ marginTop: '2px', flexShrink: 0 }} />
            <span className="pricing-table-advantages-list-item-text">{val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}