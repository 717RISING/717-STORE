"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/lib/theme-context"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden group hover:bg-[#4A1518]/20 transition-all duration-300"
      aria-label={`Cambiar a tema ${theme === "dark" ? "claro" : "oscuro"}`}
    >
      <div className="relative w-5 h-5">
        {/* Sol */}
        <Sun
          className={`absolute inset-0 w-5 h-5 text-white transition-all duration-500 transform ${
            theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        {/* Luna */}
        <Moon
          className={`absolute inset-0 w-5 h-5 text-white transition-all duration-500 transform ${
            theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>

      {/* Efecto de brillo al hacer hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </Button>
  )
}
