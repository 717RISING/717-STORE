import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export function useThemeSafe() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return { theme: 'system', setTheme: () => {} } // Return a safe default until mounted
  }

  return { theme, setTheme }
}
