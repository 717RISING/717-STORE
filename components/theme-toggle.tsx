"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon } from 'lucide-react'
import { useTheme } from "@/lib/theme-context" // Named import for useTheme

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme() // Use named import

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="hidden md:flex text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  )
}
