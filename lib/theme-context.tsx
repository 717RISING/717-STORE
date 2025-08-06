'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'

interface ThemeContextType {
  theme: string | undefined
  setTheme: (theme: string) => void
  resolvedTheme: string | undefined
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined)
  const [resolvedTheme, setResolvedTheme] = useState<string | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}

// Custom hook to use theme context (if needed for specific logic outside NextThemesProvider)
export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // This hook is primarily for internal use if you need to access the theme state
    // directly from a custom context, separate from next-themes' useTheme.
    // For most cases, `next-themes`'s `useTheme` is sufficient.
    console.warn('useThemeContext must be used within a ThemeProvider. Falling back to next-themes useTheme.')
    // Fallback to next-themes' useTheme if this custom context is not provided
    // This requires `next-themes` to be imported and used directly.
    // For this example, we'll just return a dummy if not within the custom context.
    return { theme: 'light', setTheme: () => {}, resolvedTheme: 'light' }
  }
  return context
}
