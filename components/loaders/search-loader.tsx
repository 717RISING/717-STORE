import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'

interface SearchLoaderProps {
  className?: string
}

export function SearchLoader({ className }: SearchLoaderProps) {
  return (
    <div className={cn("flex items-center justify-center h-full w-full", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      <span className="ml-2 text-gray-600 dark:text-gray-300">Buscando productos...</span>
    </div>
  )
}
