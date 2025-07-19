import { useState, useEffect } from 'react'
import { getMembershipTypes } from '../apis/membership.js'

export const useMembershipTypes = () => {
  const [membershipTypes, setMembershipTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMembershipTypes = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getMembershipTypes()
        
        // Transform the data to match the expected format
        const transformedData = data.map(type => ({
          id: type.name.toLowerCase(),
          name: type.name,
          color: type.name.toLowerCase(),
          price: `€ ${type.membershipPrice}`,
          advantages: type.features,
          selectedLabel: 'Selected',
        }))
        
        setMembershipTypes(transformedData)
      } catch (err) {
        setError(err.message || 'Failed to load membership types')
        console.error('Error loading membership types:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMembershipTypes()
  }, [])

  return { membershipTypes, loading, error }
} 