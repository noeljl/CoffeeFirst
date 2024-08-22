import './App.css'
import React from 'react'
// npm install react-router-dom
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

function App() {
  return (
    <div style={{ flex: 1 }}>
      <Router>
        <Header style />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/guestRegistry" element={<GuestRegistry />} />
          <Route path="/attendenceRegistry" element={<AttendenceRegistry />} />
          <Route path="/statisticsTable" element={<StatisticsTable />} />
          {/* Private Routes */}
          {/* <Route path="/account" element={<Account />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
