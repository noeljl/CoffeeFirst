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
// import Home from '../routes/Home/Home'
import Login from './routes/Login/Login.js'

function App() {
  return (
    <div style={{ flex: 1 }}>
      <Router>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          {/* Private Routes */}
          {/* <Route path="/account" element={<Account />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
