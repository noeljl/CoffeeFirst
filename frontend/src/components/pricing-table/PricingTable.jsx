import React, { useState, useEffect } from 'react' // Import useState
import PricingColumn from './PricingColumn'
import styles from '../styles/PricingTable.module.css'
import membershipData from './MembershipData'
import { getProducts, getSubscribeSession } from '../../apis/stripe'
import { useNavigate } from 'react-router-dom'

export default function PricingTable({ onSelectPlan, onSessionCreated, page }) {
  // Receive onSelectPlan prop
  const [selectedPlanId, setSelectedPlanId] = useState(null) // State to store the ID of the selected plan
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
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
    if (page === 'home') {
      navigate('/signup/regform')
    } else {
      setSelectedPlanId(plan.id) // Set the selected plan's ID
      onSelectPlan(plan) // Pass the entire plan object back to the parent (PlanForm)
    }
  }

  return (
    <div className={styles.pricingTable}>
      {membershipData.map((val) => {
        // Removed 'key' from map, it's not needed if 'val.id' is unique
        return (
          <PricingColumn
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
