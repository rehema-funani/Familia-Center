'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

// Types
interface User {
  id: string
  name: string
  email: string
  role: 'client' | 'counselor' | 'admin'
  isVerified: boolean
  subscriptionStatus?: 'active' | 'inactive' | 'trial'
  profilePicture?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  isAuthenticated: boolean
  hasRole: (role: string | string[]) => boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
  role?: 'client' | 'counselor'
  userType?: 'individual' | 'couple'
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Initialize auth state
  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (token) {
        await validateToken(token)
      }
    } catch (error) {
      console.error('Auth initialization failed:', error)
      localStorage.removeItem('auth_token')
    } finally {
      setLoading(false)
    }
  }

  const validateToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/validate', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      } else {
        throw new Error('Token validation failed')
      }
    } catch (error) {
      localStorage.removeItem('auth_token')
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Store token
      localStorage.setItem('auth_token', data.token)
      setUser(data.user)

      // Redirect based on role
      const redirectPath = getRedirectPath(data.user.role)
      router.push(redirectPath)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      setLoading(true)
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      // Auto-login after registration
      if (data.token) {
        localStorage.setItem('auth_token', data.token)
        setUser(data.user)
        router.push('/verify-email')
      }
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setUser(null)
    router.push('/login')
  }

  const refreshToken = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) throw new Error('No token found')

      const response = await fetch('/api/auth/refresh-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      localStorage.setItem('auth_token', data.token)
      setUser(data.user)
    } catch (error) {
      console.error('Token refresh error:', error)
      logout()
      throw error
    }
  }

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Profile update failed')
      }

      setUser(data.user)
    } catch (error) {
      console.error('Profile update error:', error)
      throw error
    }
  }

  const getRedirectPath = (role: string): string => {
    switch (role) {
      case 'admin':
        return '/admin-dashboard'
      case 'counselor':
        return '/counselor-dashboard'
      case 'client':
      default:
        return '/dashboard'
    }
  }

  const hasRole = (roles: string | string[]): boolean => {
    if (!user) return false
    const roleArray = Array.isArray(roles) ? roles : [roles]
    return roleArray.includes(user.role)
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    refreshToken,
    updateProfile,
    isAuthenticated: !!user,
    hasRole
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Export types for use in other components
export type { User, AuthContextType, RegisterData }