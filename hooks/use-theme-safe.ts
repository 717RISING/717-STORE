import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export function useThemeSafe() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return { theme: undefined, setTheme, resolvedTheme: undefined, mounted: false }
  }

  return { theme, setTheme, resolvedTheme, mounted: true }
}
