import React from 'react'
import './PricingTableColumn.css'
import checkImg from '../../assets/check.svg'

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
          return (
            <li key={key}>
              <div>
                <img src={checkImg} className="list-icon" alt="Checkmark" />
              </div>
              <div>{val}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PricingTableColumn
