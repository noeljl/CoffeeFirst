// index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import './index.css'
import App from './App.js'
import reportWebVitals from './reportWebVitals.js'

// Importiere deine Reducer
import authReducer from './store/auth/Auth.reducers.js'
import memberReducer from './store/member/Member.reducers.js'
import signupReducer from './store/auth/signupSlice.js' // <-- NEU: Importiere deinen signupReducer

// Konfiguriere den Redux Store
const store = configureStore({
  reducer: {
    auth: authReducer,
    member: memberReducer,
    signup: signupReducer, // <-- NEU: Füge den signupReducer hinzu
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
