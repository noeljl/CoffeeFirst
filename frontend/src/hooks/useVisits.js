import { useState, useEffect } from 'react'
import { getMemberVisits, getLastVisit, getVisitStats, getRecentVisits } from '../apis/visit.js'

export const useVisits = (memberId) => {
  const [visits, setVisits] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchVisits = async () => {
    if (!memberId) return
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await getMemberVisits(memberId)
      setVisits(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch visits')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVisits()
  }, [memberId])

  return { visits, loading, error, refetch: fetchVisits }
}

export const useLastVisit = (memberId, coffeeShopId) => {
  const [lastVisit, setLastVisit] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchLastVisit = async () => {
    if (!memberId || !coffeeShopId) return
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await getLastVisit(memberId, coffeeShopId)
      setLastVisit(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch last visit')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLastVisit()
  }, [memberId, coffeeShopId])

  return { lastVisit, loading, error, refetch: fetchLastVisit }
}

export const useVisitStats = (memberId) => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchStats = async () => {
    if (!memberId) return
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await getVisitStats(memberId)
      setStats(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch visit stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [memberId])

  return { stats, loading, error, refetch: fetchStats }
}

export const useRecentVisits = (memberId, days = 30) => {
  const [recentVisits, setRecentVisits] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRecentVisits = async () => {
    if (!memberId) return
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await getRecentVisits(memberId, days)
      setRecentVisits(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch recent visits')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecentVisits()
  }, [memberId, days])

  return { recentVisits, loading, error, refetch: fetchRecentVisits }
} 