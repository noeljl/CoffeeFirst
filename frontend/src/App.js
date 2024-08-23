import './App.css'
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

import PrivateRoute from './components/PrivateRoute/PrivateRoute.js'

function App() {
  return (
    <div style={{ flex: 1 }}>
      <Router>
        <Header style />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

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
      </Router>
    </div>
  )
}

export default App
