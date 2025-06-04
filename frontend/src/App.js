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
import Register from './routes/Register/Register.js'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js'

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
      {/* Root → Register */}
      <Route path="/" element={<Navigate to="/register" replace />} />

      {/* Public */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Geschützte */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      {/* Alles andere → Register */}
      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
  )
}

export default App
