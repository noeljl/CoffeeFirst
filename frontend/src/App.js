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

// Dashboard pages
import Partners from './pages/dashboards/Partners.jsx'
import Wishlist from './pages/dashboards/Wishlist.jsx'
import Favorites from './pages/dashboards/Favorites.jsx'
import Visited from './pages/dashboards/Visited.jsx'

// Account settings
import PersonalInfo from './pages/account-settings/PersonalInfo.jsx'
import Membership from './pages/account-settings/Membership.jsx'

// Misc
import NotFound from './pages/NotFound.jsx'
import TempBlankPage from './pages/TempBlankPage.jsx'

function App() {
  return (
    <div
      className="page-wrapper"
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
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

      <Route path="/dashboard/partners" element={<Partners />} />
      <Route path="/dashboard/wishlist" element={<Wishlist />} />
      <Route path="/dashboard/favorites" element={<Favorites />} />
      <Route path="/dashboard/visited" element={<Visited />} />

      {/* Account Settings */}
      <Route
        path="/account-settings"
        element={<Navigate to="/account-settings/personal-info" replace />}
      />
      <Route
        path="/account-settings/personal-info"
        element={<PersonalInfo />}
      />
      <Route path="/account-settings/membership" element={<Membership />} />

      <Route
        path="/dashboard"
        element={<Navigate to="/dashboard/partners" replace />}
      />
      <Route path="/dashboard/partners" element={<Partners />} />
      <Route path="/dashboard/wishlist" element={<Wishlist />} />
      <Route path="/dashboard/favorites" element={<Favorites />} />
      <Route path="/dashboard/visited" element={<Visited />} />

      <Route
        path="/account-settings"
        element={<Navigate to="/account-settings/personal-info" replace />}
      />
      <Route
        path="/account-settings/personal-info"
        element={<PersonalInfo />}
      />
      <Route path="/account-settings/membership" element={<Membership />} />

      {/* 
      Protected Dashboard & Settings
      <Route
        element={
          <PrivateRoute>
            <React.Fragment />
          </PrivateRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<Navigate to="/dashboard/partners" replace />}
        />
        <Route path="/dashboard/partners" element={<Partners />} />
        <Route path="/dashboard/wishlist" element={<Wishlist />} />
        <Route path="/dashboard/favorites" element={<Favorites />} />
        <Route path="/dashboard/visited" element={<Visited />} />

        <Route
          path="/account-settings"
          element={<Navigate to="/account-settings/personal-info" replace />}
        />
        <Route
          path="/account-settings/personal-info"
          element={<PersonalInfo />}
        />
        <Route path="/account-settings/membership" element={<Membership />} />
      </Route>  */}

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
