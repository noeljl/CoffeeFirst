import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider.js'
// Guards / Layouts
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js'
import DashboardLayout from './components/layout/DashboardLayout.jsx'
import SettingsLayout from './components/layout/SettingsLayout.jsx'
import CheckOut from './components/check-out/CheckOut.jsx'

// Public Pages
import HomePage from './pages/HomePage.jsx'
import RegForm from './pages/signup/RegForm.jsx'
import PlanForm from './pages/signup/PlanForm.jsx'
import PaymentSuccessful from './pages/signup/PaymentSuccessful.jsx'
import Login from './pages/signin/SignIn.jsx'

// Dynamic Views
import Dashboard from './components/views/Dashboard.jsx'
import AccountSettings from './components/views/AccountSettings.jsx'
import CafePage from './components/cafe/CafePage.jsx'

// Misc
import NotFound from './pages/NotFound.jsx'
import TempBlankPage from './pages/TempBlankPage.jsx'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkLoginStatus } from './store/auth/Auth.actions.js'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // holt Session-Status und setzt isInitialized = true
    dispatch(checkLoginStatus())
  }, [dispatch])

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Standard-Redirect auf /login */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          {/* Öffentliche Routen */}
          <Route path="/signup/regform" element={<RegForm />} />
          <Route path="/signup/planform" element={<PlanForm />} />
          <Route path="/signup/completed" element={<PaymentSuccessful />} />
          <Route path="/login" element={<Login />} />
          <Route path="/testing" element={<TempBlankPage />} />
          <Route path="/check-out" element={<CheckOut />} />

          {/* Geschützte Bereiche */}
          <Route element={<PrivateRoute />}>
            {/* Dashboard */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route
                index
                element={<Navigate to="/dashboard/partners" replace />}
              />
              <Route path=":section" element={<Dashboard />} />
              <Route path=":section/:cafeSlug" element={<CafePage />} />
            </Route>

            {/* Account Settings */}
            <Route path="/account-settings" element={<SettingsLayout />}>
              <Route
                index
                element={<Navigate to="/account-settings/personal" replace />}
              />
              <Route path=":section" element={<AccountSettings />} />
            </Route>
          </Route>

          {/* Fallback 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
