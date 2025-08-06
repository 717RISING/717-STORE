"use client"

import { Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  message?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ message, size = "md", className }: LoadingSpinnerProps) {
  const spinnerSizeClass = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }[size]

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Loader2 className={cn("animate-spin text-[#5D1A1D]", spinnerSizeClass)} />
      {message && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {message}
        </p>
      )}
    </div>
  )
}
