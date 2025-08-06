import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'

interface SearchLoaderProps {
  className?: string
}

export function SearchLoader({ className }: SearchLoaderProps) {
  return (
    <div className={cn("flex items-center justify-center h-24 w-full", className)}>
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <span className="ml-2 text-muted-foreground">Buscando...</span>
    </div>
  )
}
