"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-white hover:text-gray-300 transition-colors"
    >
      {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </Button>
  )
}
