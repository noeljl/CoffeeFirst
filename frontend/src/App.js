import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Header from './components/Header/Header.js'
import Home from './routes/Home/Home.js'
import Login from './routes/Login/Login.js'
import GuestRegistry from './routes/GuestRegistry/GuestRegistry.js'
import AttendenceRegistry from './routes/AttendenceRegistry/AttendenceRegistry.js'
import StatisticsTable from './routes/Statistics/StatisticsTable.js'
import EventsRegistry from './routes/Events/EventsRegistry.js'
import EventLogin from './routes/EventLogin/EventLogin.js' // Import EventLogin
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js'
import EventHome from './routes/EventHome/EventHome.js'
import EventSuccess from './routes/EventSuccess/EventSucces.js' // Import EventSuccess

function App() {
  return (
    <div style={{ flex: 1 }}>
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/event/:id" element={<EventLogin />} /> {/* Public Route */}
      {/* Success Page Route */}
      {/* Private Routes */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/eventHome/:id"
        element={
          <PrivateRoute>
            <EventHome />
          </PrivateRoute>
        }
      />
      <Route
        path="/event/:id/success"
        element={
          <PrivateRoute>
            <EventSuccess />
          </PrivateRoute>
        }
      />{' '}
      <Route
        path="/guestRegistry"
        element={
          <PrivateRoute>
            <GuestRegistry />
          </PrivateRoute>
        }
      />
      <Route
        path="/attendenceRegistry"
        element={
          <PrivateRoute>
            <AttendenceRegistry />
          </PrivateRoute>
        }
      />
      <Route path="/eventsRegistry" element={<EventsRegistry />} />
      <Route
        path="/statisticsTable"
        element={
          <PrivateRoute>
            <StatisticsTable />
          </PrivateRoute>
        }
      />
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
}

export default App
