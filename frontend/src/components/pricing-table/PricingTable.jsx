import React, { useState, useEffect } from 'react' // Import useState
import PricingColumn from './PricingColumn'
import styles from '../styles/PricingTable.module.css'
import membershipData from './MembershipData'
import { getProducts, getSubscribeSession } from '../../apis/stripe'
import { useNavigate } from 'react-router-dom'
import { useMembershipTypes } from '../../hooks/useMembershipTypes'

export default function PricingTable({ onSelectPlan, onSessionCreated, page }) {
  // Receive onSelectPlan prop
  const [selectedPlanId, setSelectedPlanId] = useState(null) // State to store the ID of the selected plan
  const [products, setProducts] = useState([])
  const [hasUserSelectedPlan, setHasUserSelectedPlan] = useState(false) // Track if user has made a selection
  const navigate = useNavigate()
  
  // Use the custom hook to load membership types
  const { membershipTypes, loading, error } = useMembershipTypes()

  // Set default plan only if no plan is currently selected and user hasn't made a selection
  useEffect(() => {
    console.log('selectedPlanId in PricingTable', selectedPlanId)
    console.log('hasUserSelectedPlan in PricingTable', hasUserSelectedPlan)
    if (!selectedPlanId && !hasUserSelectedPlan && onSelectPlan && membershipTypes.length > 0) {
      const defaultPlan = membershipTypes.find((plan) => plan.id === 'gold')
      if (defaultPlan) {
        setSelectedPlanId(defaultPlan.id)
        onSelectPlan(defaultPlan)
      }
    }
  }, [selectedPlanId, hasUserSelectedPlan, onSelectPlan, membershipTypes])

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
      console.log('plan in PricingTable', plan)
      setSelectedPlanId(plan.id) // Set the selected plan's ID
      setHasUserSelectedPlan(true) // Mark that user has made a selection
      onSelectPlan(plan) // Pass the entire plan object back to the parent (PlanForm)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="pricing-table">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Loading membership plans...
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="pricing-table">
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          Error loading membership plans: {error}
        </div>
      </div>
    )
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
