import React from 'react'
import PricingTableColumn from './PricingTableColumn'
import './PricingTable.css'
import membershipData from './MembershipData'

function PricingTable() {
  return (
    <div className="pricingTableContainer">
      {membershipData.map((val, key) => {
        return (
          <PricingTableColumn
            key={key}
            name={val.name}
            price={val.price}
            color={val.color}
            advantages={val.advantages}
          />
        )
      })}
    </div>
  )
}

export default PricingTable
