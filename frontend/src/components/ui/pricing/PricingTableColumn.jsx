import './PricingTableColumn.css'
import Icons from '../../../assets/Icons'

function PricingTableColumn({
  name,
  color = '',
  price,
  advantages = ['Test1', 'Test2'],
  id, // Receive the id prop (though not strictly used for styling here, good for context)
  isSelected, // Receive the isSelected prop
  onClick, // Receive the onClick handler
}) {
  const boxStyle = ['nameBox', `bg-${color}`].join(' ')

  const columnClasses = [
    'PricingTableColumnContainer',
    isSelected ? 'selected-plan' : '', // Add 'selected-plan' class if isSelected is true
  ].join(' ')

  return (
    <div className={columnClasses} onClick={onClick}>
      {' '}
      {/* Apply classes and onClick */}
      <div className={boxStyle}>
        <p>{name}</p>
      </div>
      <div className="priceBox">
        <p className="price">{price}</p>
        <p>/month</p>
      </div>
      <ul className="advantages-list">
        {advantages.map((val, key) => {
          // If the string contains line breaks, split and render as lines
          const lines = val.split('\n');
          return (
            <li key={key}>
              <div>
                <img src={Icons.check} className="list-icon" alt="Checkmark" />
              </div>
              <div>
                {lines.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </li>
          )
        })}
      </ul>
      {isSelected && (
        <div className="selected-label">
          <span role="img" aria-label="star" className="selected-star">★</span> Selected
        </div>
      )}
    </div>
  )
}

export default PricingTableColumn