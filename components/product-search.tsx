"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import { cn } from "@/lib/utils"

interface ProductSearchProps {
  onSearch?: (term: string) => void
  searchTerm?: string
  onSearchChange?: (term: string) => void
  className?: string
}

export default function ProductSearch({ onSearch, searchTerm = "", onSearchChange, className }: ProductSearchProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)
  const { theme } = useTheme()
  const { isMobile } = useMobileDetection()

  const handleSearch = (term: string) => {
    setLocalSearchTerm(term)
    if (onSearch) {
      onSearch(term)
    }
    if (onSearchChange) {
      onSearchChange(term)
    }
  }

  const handleClear = () => {
    setLocalSearchTerm("")
    if (onSearch) {
      onSearch("")
    }
    if (onSearchChange) {
      onSearchChange("")
    }
  }

  const containerClasses = cn("relative flex items-center", className)

  const inputClasses = cn(
    "pl-10 pr-10 transition-all duration-300 focus-ring",
    isMobile ? "h-10 text-sm" : "h-12 text-base",
    theme === "dark"
      ? "bg-gray-900/50 border-gray-700 text-white placeholder-gray-400"
      : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500",
  )

  const iconClasses = cn(
    "absolute left-3 transition-colors duration-300",
    theme === "dark" ? "text-gray-400" : "text-gray-500",
  )

  const clearButtonClasses = cn(
    "absolute right-2 p-1 rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700",
    localSearchTerm ? "opacity-100" : "opacity-0 pointer-events-none",
  )

  return (
    <div className={containerClasses}>
      <Search className={cn(iconClasses, isMobile ? "w-4 h-4" : "w-5 h-5")} />
      <Input
        type="text"
        placeholder={isMobile ? "Buscar..." : "Buscar productos..."}
        value={localSearchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className={inputClasses}
      />
      {localSearchTerm && (
        <Button variant="ghost" size="sm" onClick={handleClear} className={clearButtonClasses}>
          <X className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
        </Button>
      )}
    </div>
  )
}
