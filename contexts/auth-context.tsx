"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define user type
export type User = {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  verified: boolean
}

// Define auth context type
type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

// Sample user data
const sampleUser: User = {
  id: "1",
  name: "Sarah Phillips",
  email: "sarah.phillips@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
  role: "Certified Wanderer",
  verified: true,
}

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext)
}

// Hook to get sample user (for demo purposes)
export function useSampleUser() {
  return sampleUser
}
