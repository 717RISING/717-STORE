'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { User, AuthState, AuthContextType, ServerActionResponse } from './types'
import { validateUserSession, handleLogout } from '@/app/actions' // Import server actions
import { toast } from 'sonner'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  const checkSession = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }))
    try {
      const response: ServerActionResponse<User> = await validateUserSession()
      if (response.success && response.data) {
        setAuthState({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
        })
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    } catch (error) {
      console.error('Error checking session:', error)
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  }, [])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  const login = useCallback((user: User) => {
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    })
    toast.success(`Bienvenido, ${user.name || user.email}!`)
  }, [])

  const logout = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }))
    try {
      const response = await handleLogout()
      if (response.success) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
        toast.info('Sesión cerrada exitosamente.')
      } else {
        toast.error(response.message || 'Error al cerrar sesión.')
        setAuthState(prev => ({ ...prev, isLoading: false })) // Keep current state if logout fails
      }
    } catch (error) {
      console.error('Error during logout:', error)
      toast.error('Error inesperado al cerrar sesión.')
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }
  }, [])

  const value = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
