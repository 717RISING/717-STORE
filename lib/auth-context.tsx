'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from './users' // Assuming User type is defined here
import { SessionProvider, useSession, signOut } from 'next-auth/react'
import { toast } from 'sonner'

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const authOptions = {
  // This would be your actual NextAuth.js configuration
  // For demonstration, we'll use a mock session
  providers: [], // e.g., GoogleProvider, CredentialsProvider
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        // Add any other user properties you want in the token
      }
      return token
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          // Map other token properties to session.user
        }
      }
      return session
    },
  },
  secret: process.env.AUTH0_SECRET, // Use a strong secret in production
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <InnerAuthProvider>{children}</InnerAuthProvider>
    </SessionProvider>
  )
}

function InnerAuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const loading = status === 'loading'
  const isAuthenticated = status === 'authenticated'

  useEffect(() => {
    if (session?.user) {
      // Map NextAuth session user to your User type
      setUser({
        id: session.user.id as string,
        name: session.user.name || 'Usuario',
        email: session.user.email || '',
        // Add other properties if available in session.user
        orderCount: 0, // Default or fetch from DB
        totalSpent: 0, // Default or fetch from DB
        isActive: true, // Default or fetch from DB
        phone: '', // Default or fetch from DB
      })
    } else {
      setUser(null)
    }
  }, [session])

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
