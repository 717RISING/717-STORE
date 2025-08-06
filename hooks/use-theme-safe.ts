"use client"

import { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import { useTheme } from "next-themes"

type Theme = "dark" | "light"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

// Crear el contexto fuera del hook para evitar problemas de SSR
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export { ThemeContext }

export function useThemeSafe() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const context = useContext(ThemeContext)

  // Si no está montado o no hay contexto, usar valores por defecto
  if (!mounted || !context) {
    return {
      theme: "dark" as Theme,
      setTheme: () => {},
      resolvedTheme: "dark" as Theme,
      mounted: false,
    }
  }

  return {
    ...context,
    resolvedTheme,
    mounted: true,
  }
}
