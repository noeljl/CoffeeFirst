import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getLastVisit } from '../apis/visit.js'

export const useLastVisits = (coffeeShops = []) => {
  const [lastVisits, setLastVisits] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const member = useSelector((state) => state.auth.member)
  const memberId = member?.id

  useEffect(() => {
    if (!memberId || coffeeShops.length === 0) {
      setLastVisits({})
      setLoading(false)
      return
    }

    const fetchLastVisits = async () => {
      setLoading(true)
      setError(null)

      try {
        const visitsData = {}

        // Fetch last visits for all coffee shops in parallel
        const visitPromises = coffeeShops.map(async (coffeeShop) => {
          try {
            const visit = await getLastVisit(memberId, coffeeShop._id)
            return { coffeeShopId: coffeeShop._id, visit }
          } catch (err) {
            console.error(
              `Error fetching last visit for ${coffeeShop.name}:`,
              err
            )
            return { coffeeShopId: coffeeShop._id, visit: null }
          }
        })

        const results = await Promise.all(visitPromises)

        // Convert to object for easy lookup
        results.forEach(({ coffeeShopId, visit }) => {
          visitsData[coffeeShopId] = visit
        })

        setLastVisits(visitsData)
      } catch (err) {
        setError(err.message || 'Failed to fetch last visits')
      } finally {
        setLoading(false)
      }
    }

    fetchLastVisits()
  }, [memberId, coffeeShops])

  return { lastVisits, loading, error }
}
