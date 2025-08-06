import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'

interface ImageLoaderProps {
  className?: string
}

export function ImageLoader({ className }: ImageLoaderProps) {
  return (
    <div className={cn("flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <span className="sr-only">Cargando imagen...</span>
    </div>
  )
}
