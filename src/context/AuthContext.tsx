import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AdminUser {
  name: string
  email: string
  avatar: string
  role: string
}

interface AuthContextValue {
  user: AdminUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const DEFAULT_USER: AdminUser = {
  name: 'Super Admin',
  email: 'admin@goodniva.com',
  avatar: 'https://i.pravatar.cc/80?img=60',
  role: 'Global Access',
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null)

  const login = async (_email: string, _password: string): Promise<void> => {
    // Mock authentication — accepts any email/password
    await new Promise((resolve) => setTimeout(resolve, 600))
    setUser(DEFAULT_USER)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
