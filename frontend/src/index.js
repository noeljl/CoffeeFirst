import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import './index.css'
import App from './App.js'
import reportWebVitals from './reportWebVitals.js'
import authReducer from './store/auth/Auth.reducers.js' // Passe den Pfad zum Auth-Reducer an

// Konfiguriere den Redux Store
const store = configureStore({
  reducer: {
    auth: authReducer, // Dein Auth-Reducer
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
