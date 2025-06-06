"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "white" | "wine" | "gray"
  className?: string
}

export default function LoadingSpinner({ size = "md", color = "wine", className }: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const colors = {
    white: "border-white border-t-transparent",
    wine: "border-[#4A1518] border-t-transparent",
    gray: "border-gray-400 border-t-transparent",
  }

  return (
    <div className="flex items-center justify-center">
      <div className={cn("border-2 rounded-full animate-spin", sizes[size], colors[color], className)} />
    </div>
  )
}
