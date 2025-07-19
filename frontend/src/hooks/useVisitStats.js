import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getVisitStats } from '../apis/visit.js'

export const useVisitStatsForShops = (coffeeShops = []) => {
  const [visitStats, setVisitStats] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const member = useSelector((state) => state.auth.member)
  const memberId = member?.id

  useEffect(() => {
    if (!memberId || coffeeShops.length === 0) {
      setVisitStats({})
      setLoading(false)
      return
    }

    const fetchVisitStats = async () => {
      setLoading(true)
      setError(null)

      try {
        const stats = await getVisitStats(memberId)

        // Convert array to object for easy lookup
        const statsObject = {}
        stats.forEach((stat) => {
          statsObject[stat._id] = stat
        })

        setVisitStats(statsObject)
      } catch (err) {
        setError(err.message || 'Failed to fetch visit stats')
      } finally {
        setLoading(false)
      }
    }

    fetchVisitStats()
  }, [memberId, coffeeShops])

  return { visitStats, loading, error }
}
