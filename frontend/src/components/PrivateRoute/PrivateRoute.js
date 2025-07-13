import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Loading-Komponente für bessere UX
const LoadingSpinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '18px',
    }}
  >
    <div>Loading...</div>
  </div>
)

export default function PrivateRoute() {
  const { isAuthenticated, isFetching, isInitialized } = useSelector(
    (state) => state.auth
  )
  const location = useLocation()

  // Während der Auth-Status-Prüfung → Loading anzeigen
  if (!isInitialized || isFetching) {
    return <LoadingSpinner />
  }

  // Wenn nicht eingeloggt → zum Login umleiten und Ziel merken
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  // Eingeloggt → alle Kind-Routen (Outlet) rendern
  return <Outlet />
}
