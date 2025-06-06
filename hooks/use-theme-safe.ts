"use client"

import { useContext, useEffect, useState } from "react"
import { createContext } from "react"

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
  const [mounted, setMounted] = useState(false)
  const [theme, setThemeState] = useState<Theme>("dark")

  useEffect(() => {
    setMounted(true)
  }, [])

  const context = useContext(ThemeContext)

  // Si no está montado o no hay contexto, usar valores por defecto
  if (!mounted || !context) {
    return {
      theme: "dark" as Theme,
      toggleTheme: () => {},
      setTheme: () => {},
      mounted: false,
    }
  }

  return {
    ...context,
    mounted: true,
  }
}
