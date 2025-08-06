'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'

interface ThemeContextType {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  resolvedTheme: string | undefined;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const value = {
    theme: mounted ? theme : undefined,
    setTheme: mounted ? setTheme : () => {},
    resolvedTheme: mounted ? resolvedTheme : undefined,
  }

  return (
    <NextThemesProvider {...props}>
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
    </NextThemesProvider>
  )
}

export function useAppTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider')
  }
  return context
}
