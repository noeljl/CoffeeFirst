import React, { useState } from 'react' // Import useState
import PricingTableColumn from './PricingTableColumn'
import './PricingTable.css'
import membershipData from './MembershipData'

function PricingTable({ onSelectPlan }) {
  // Receive onSelectPlan prop
  const [selectedPlanId, setSelectedPlanId] = useState(null) // State to store the ID of the selected plan

  const handleColumnClick = (plan) => {
    setSelectedPlanId(plan.id) // Set the selected plan's ID
    onSelectPlan(plan) // Pass the entire plan object back to the parent (PlanForm)
  }

  return (
    <div className="pricingTableContainer">
      {membershipData.map((val) => {
        // Removed 'key' from map, it's not needed if 'val.id' is unique
        return (
          <PricingTableColumn
            key={val.id} // Assuming each plan has a unique 'id'
            name={val.name}
            price={val.price}
            color={val.color}
            advantages={val.advantages}
            id={val.id} // Pass the plan's ID
            isSelected={val.id === selectedPlanId} // Pass a boolean indicating if this column is selected
            onClick={() => handleColumnClick(val)} // Pass a click handler
          />
        )
      })}
    </div>
  )
}

export default PricingTable
