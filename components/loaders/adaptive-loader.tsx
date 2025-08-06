import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'

interface AdaptiveLoaderProps {
  isLoading: boolean
  children: React.ReactNode
  className?: string
}

export function AdaptiveLoader({ isLoading, children, className }: AdaptiveLoaderProps) {
  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center h-full w-full", className)}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }
  return <>{children}</>
}
