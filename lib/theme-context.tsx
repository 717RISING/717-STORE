"use client"

import React from "react"
import { useEffect, useState } from "react"
import { ThemeContext } from "@/hooks/use-theme-safe"

type Theme = "dark" | "light"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Obtener tema guardado o usar preferencia del sistema
    const savedTheme = localStorage.getItem("theme") as Theme
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const initialTheme = savedTheme || systemTheme
    setThemeState(initialTheme)
    document.documentElement.setAttribute("data-theme", initialTheme)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Hook de compatibilidad para componentes existentes
export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    // En lugar de lanzar error, devolver valores por defecto
    return {
      theme: "dark" as Theme,
      toggleTheme: () => {},
      setTheme: () => {},
    }
  }
  return context
}
