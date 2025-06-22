import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute/PrivateRoute.js'

// Public pages
import HomePage from './pages/HomePage.jsx'
import SignUp from './pages/signup/SignUp.jsx'
import RegForm from './pages/signup/RegForm.jsx'
import PlanForm from './pages/signup/PlanForm.jsx'
import Payment from './pages/signup/Payment.jsx'

// Misc
import NotFound from './pages/NotFound.jsx'
import TempBlankPage from './pages/TempBlankPage.jsx'
import Dashboard from './components/views/Dashboard.jsx'
import AccountSettings from './components/views/AccountSettings.jsx'

// Dynamic routings
import DashboardLayout from './components/layout/DashboardLayout.jsx'
import SettingsLayout from './components/layout/SettingsLayout.jsx'
import CafePage from './components/cafe/CafePage.jsx'




function App() {
  return (
    <div
      className="page-wrapper"
    >
      <Router>
        <AppRoutes />
      </Router>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      {/* Root → HomePage */}
      <Route path="/" element={<HomePage />} />

      {/* Public → Sign-Up */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/regform" element={<RegForm />} />
      <Route path="/signup/planform" element={<PlanForm />} />
      <Route path="/signup/payment" element={<Payment />} />

      {/* Testing */}
      <Route path="/testing" element={<TempBlankPage />} />

      {/* Dynamic dashboard routing */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="partners" replace />} />
        {/* List pages (partners, favorites, etc.) */}
        <Route path=":section" element={<Dashboard />} />
        {/* Single café page */}
        <Route path=":section/:cafeSlug" element={<CafePage />} />
      </Route>

      {/* Dynamic Account Settings routings */}
      <Route path="/account-settings" element={<SettingsLayout />}>
        <Route index element={<Navigate to="personal" replace />} />
        <Route path=":section" element={<AccountSettings />} />
      </Route>

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
