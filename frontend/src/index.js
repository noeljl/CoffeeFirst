// index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App.js'
import reportWebVitals from './reportWebVitals.js'

// Importiere deine Reducer
import authReducer from './store/auth/Auth.reducers.js'
import accountSettingsReducer from './store/accountSettings/AccountSettings.reducers.js' // Besserer Name
import signupReducer from './store/auth/signupSlice.js'
// Importiere neuen Provider
import { SearchProvider } from './contexts/SearchContext.jsx'

// Konfiguriere den Redux Store
const store = configureStore({
  reducer: {
    auth: authReducer,
    accountSettings: accountSettingsReducer, // ← Ändere "member" zu "accountSettings"
    signup: signupReducer,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* Wrap your entire app in SearchProvider */}
    <SearchProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SearchProvider>
  </React.StrictMode>
)

reportWebVitals()
