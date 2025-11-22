"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { simpleAuth } from "./simple-auth"

interface UserData {
  uid?: string
  email?: string | null
  name?: string
  phone?: string
  role?: "admin" | "client"
}

interface AuthContextType {
  user: UserData | null
  loading: boolean
  role: "admin" | "client" | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  role: null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<"admin" | "client" | null>(null)

  useEffect(() => {
    // Load user from localStorage on mount
    const currentUser = simpleAuth.getCurrentUser()
    const currentRole = simpleAuth.getCurrentRole()
    
    if (currentUser) {
      setUser(currentUser)
      setRole(currentRole)
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, role }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
