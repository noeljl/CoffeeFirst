import React, { useState, useEffect } from 'react' // Import useState
import PricingTableColumn from './PricingTableColumn'
import './PricingTable.css'
import membershipData from './MembershipData'
import { getProducts, getSubscribeSession } from '../../apis/stripe'

function PricingTable({ onSelectPlan, onSessionCreated }) {
  // Receive onSelectPlan prop
  const [selectedPlanId, setSelectedPlanId] = useState('gold') // State to store the ID of the selected plan
  const [products, setProducts] = useState([])

  // Set default plan when component mounts
  useEffect(() => {
    const defaultPlan = membershipData.find((plan) => plan.id === 'gold')
    if (defaultPlan && onSelectPlan) {
      onSelectPlan(defaultPlan)
    }
  }, [onSelectPlan])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts()
        console.log('List of products', products)
        setProducts(products)
      } catch (error) {
        console.error('Error fetching products', error)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchSubscribeSession = async () => {
      if (!selectedPlanId) return
      const session = await getSubscribeSession(selectedPlanId)
      console.log('The session is', session)
      if (onSessionCreated) {
        onSessionCreated(session)
      }
    }
    fetchSubscribeSession()
  }, [selectedPlanId, onSessionCreated])

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
            // advantages={val.advantages}
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
