import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  const spinnerSizeClass = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }[size]

  return (
    <Loader2 className={cn("animate-spin text-gray-500 dark:text-gray-400", spinnerSizeClass, className)} />
  )
}
