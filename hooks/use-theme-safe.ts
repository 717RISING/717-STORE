'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useThemeSafe() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return { theme: 'light', setTheme: () => {}, resolvedTheme: 'light' } as const
  }

  return { theme, setTheme, resolvedTheme }
}
