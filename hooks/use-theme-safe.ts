import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function useThemeSafe() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  return { mounted, theme, setTheme, resolvedTheme }
}
