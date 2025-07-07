import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const location = useLocation()

  // Wenn nicht eingeloggt, zum Login umleiten und Ziel merken
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  // Eingeloggt → alle Kind‑Routen (Outlet) rendern
  return <Outlet />
}
