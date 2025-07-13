// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react'
import { loginMember, isMemberLoggedIn, logoutMember } from '../apis/auth.js'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    isMemberLoggedIn()
      .then((res) => {
        setUser(res.user)
        setIsAuthenticated(res.isAuthenticated)
      })
      .catch(() => {
        setUser(null)
        setIsAuthenticated(false)
      })
  }, [])

  const login = async (creds) => {
    const res = await loginMember(creds)
    setUser(res.member)
    setIsAuthenticated(res.isAuthenticated)
    return res
  }

  const logout = async () => {
    await logoutMember()
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
