import React from 'react'
import { useVisitStats, useRecentVisits } from '../../hooks/useVisits'
import { useSelector } from 'react-redux'
import './VisitStatsSection.css'

const VisitStatsSection = () => {
  const member = useSelector((state) => state.auth.member)
  const memberId = member?.id

  const {
    stats,
    loading: statsLoading,
    error: statsError,
  } = useVisitStats(memberId)
  const {
    recentVisits,
    loading: recentLoading,
    error: recentError,
  } = useRecentVisits(memberId, 30)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatTimeAgo = (dateString) => {
    const now = new Date()
    const visitDate = new Date(dateString)
    const diffInMs = now - visitDate
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))

    if (diffInDays > 0) {
      return `${diffInDays} Tag${diffInDays > 1 ? 'e' : ''} her`
    } else if (diffInHours > 0) {
      return `${diffInHours} Stunde${diffInHours > 1 ? 'n' : ''} her`
    } else {
      return 'Heute'
    }
  }

  if (statsLoading || recentLoading) {
    return (
      <div className="visit-stats-section">
        <div className="visit-stats-loading">
          <div className="loading-spinner"></div>
          <p>Lade Besuchsstatistiken...</p>
        </div>
      </div>
    )
  }

  if (statsError || recentError) {
    return (
      <div className="visit-stats-section">
        <div className="visit-stats-error">
          <p>Fehler beim Laden der Statistiken: {statsError || recentError}</p>
        </div>
      </div>
    )
  }

  const totalVisits = stats.reduce((sum, stat) => sum + stat.visitCount, 0)
  const uniqueCafes = stats.length

  return (
    <div className="visit-stats-section">
      <h2>Deine Besuchsstatistiken</h2>

      {/* Summary Cards */}
      <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-number">{totalVisits}</div>
          <div className="stat-label">Gesamtbesuche</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{uniqueCafes}</div>
          <div className="stat-label">Besuchte Cafés</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{recentVisits.length}</div>
          <div className="stat-label">Besuche (30 Tage)</div>
        </div>
      </div>

      {/* Most Visited Cafés */}
      {stats.length > 0 && (
        <div className="most-visited-section">
          <h3>Häufig besuchte Cafés</h3>
          <div className="cafe-stats-list">
            {stats.slice(0, 5).map((stat, index) => (
              <div key={stat._id} className="cafe-stat-item">
                <div className="cafe-stat-rank">#{index + 1}</div>
                <div className="cafe-stat-info">
                  <div className="cafe-stat-name">{stat.coffeeShop.name}</div>
                  <div className="cafe-stat-details">
                    {stat.visitCount} Besuch{stat.visitCount > 1 ? 'e' : ''} •
                    Last visit on {formatDate(stat.lastVisit)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Visits */}
      {recentVisits.length > 0 && (
        <div className="recent-visits-section">
          <h3>Letzte Besuche</h3>
          <div className="recent-visits-list">
            {recentVisits.slice(0, 5).map((visit) => (
              <div key={visit._id} className="recent-visit-item">
                <div className="visit-cafe-name">{visit.coffeeShop.name}</div>
                <div className="visit-details">
                  <span className="visit-date">
                    {formatDate(visit.visitDate)}
                  </span>
                  <span className="visit-time-ago">
                    {formatTimeAgo(visit.visitDate)}
                  </span>
                </div>
                {visit.coffeeType && (
                  <div className="visit-coffee-type">{visit.coffeeType}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.length === 0 && recentVisits.length === 0 && (
        <div className="no-visits-message">
          <h3>Noch keine Besuche</h3>
          <p>
            Du hast noch keine Cafés besucht. Starte deine Reise durch die
            Münchner Kaffeeszene!
          </p>
        </div>
      )}
    </div>
  )
}

export default VisitStatsSection
