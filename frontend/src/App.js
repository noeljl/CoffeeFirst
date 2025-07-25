import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider.js'
// Guards / Layouts
import PrivateRoute from './routes/PrivateRoute.js'
import DashboardLayout from './layout/DashboardLayout.jsx'
import SettingsLayout from './layout/SettingsLayout.jsx'
import CheckOut from './components/check-out/CheckOut.jsx'

// Public Pages
import HomePage from './pages/HomePage.jsx'
// import RegForm from './pages/RegForm.jsx'
import PlanForm from './pages/PlanForm.jsx'
import PaymentResult from './pages/PaymentResult.jsx'
import { Login, Signup } from './pages/FormPages.jsx'

// Dynamic Pages
import Dashboard from './pages/DashboardPage.jsx'
import AccountSettings from './pages/AccountSettingPage.jsx'
import CafePage from './pages/CafePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

// Misc
import Page404 from './pages/404.jsx'
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
    <div className="AppWrapper">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Standard-Redirect auf /login */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            {/* Öffentliche Routen */}
            <Route path="/signup/regform" element={<Signup />} />
            <Route path="/signup/planform" element={<PlanForm />} />
            <Route path="/signup/completed" element={<PaymentResult />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/signup" element={<Signup />} />
            <Route path="/check-out" element={<CheckOut />} />

            {/* Geschützte Bereiche */}
            <Route element={<PrivateRoute />}>
              {/* Dashboard */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route
                  index
                  element={<Navigate to="/dashboard/discover" replace />}
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

              {/* Profile Page */}
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Fallback 404 */}
            <Route path="/not-found" element={<Page404 />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
