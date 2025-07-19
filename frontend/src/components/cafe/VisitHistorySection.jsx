import React from 'react'
import { useLastVisit } from '../../hooks/useVisits'
import { useSelector } from 'react-redux'
import './VisitHistorySection.css'

const VisitHistorySection = ({ coffeeShopId }) => {
  const member = useSelector((state) => state.auth.member)
  const memberId = member?.id
  
  const { lastVisit, loading, error } = useLastVisit(memberId, coffeeShopId)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatTimeAgo = (dateString) => {
    const now = new Date()
    const visitDate = new Date(dateString)
    const diffInMs = now - visitDate
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

    if (diffInDays > 0) {
      return `${diffInDays} Tag${diffInDays > 1 ? 'e' : ''} her`
    } else if (diffInHours > 0) {
      return `${diffInHours} Stunde${diffInHours > 1 ? 'n' : ''} her`
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} Minute${diffInMinutes > 1 ? 'n' : ''} her`
    } else {
      return 'Gerade eben'
    }
  }

  if (loading) {
    return (
      <div className="visit-history-section">
        <div className="visit-history-loading">
          <div className="loading-spinner"></div>
          <p>Lade Besuchsdaten...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="visit-history-section">
        <div className="visit-history-error">
          <p>Fehler beim Laden der Besuchsdaten: {error}</p>
        </div>
      </div>
    )
  }

  if (!lastVisit) {
    return (
      <div className="visit-history-section">
        <div className="visit-history-empty">
          <h3>Noch kein Besuch</h3>
          <p>Du hast dieses Café noch nicht besucht.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="visit-history-section">
      <h3>Letzter Besuch</h3>
      <div className="visit-details">
        <div className="visit-date">
          <strong>Besucht am:</strong> {formatDate(lastVisit.visitDate)}
        </div>
        <div className="visit-time-ago">
          <span className="time-ago-badge">
            {formatTimeAgo(lastVisit.visitDate)}
          </span>
        </div>
        
        {lastVisit.coffeeType && (
          <div className="visit-coffee-type">
            <strong>Getränk:</strong> {lastVisit.coffeeType}
          </div>
        )}
        
        {lastVisit.wasFreeCoffee !== undefined && (
          <div className="visit-payment">
            <strong>Bezahlung:</strong> 
            {lastVisit.wasFreeCoffee ? (
              <span className="free-coffee">Kostenlos (Mitgliedschaft)</span>
            ) : (
              <span className="paid-coffee">Bezahlt</span>
            )}
          </div>
        )}
        
        {lastVisit.quotaBefore !== undefined && lastVisit.quotaAfter !== undefined && (
          <div className="visit-quota">
            <strong>Quota:</strong> {lastVisit.quotaBefore} → {lastVisit.quotaAfter}
          </div>
        )}
      </div>
    </div>
  )
}

export default VisitHistorySection 