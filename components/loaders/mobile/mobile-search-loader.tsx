import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'

interface MobileSearchLoaderProps {
  className?: string
}

export function MobileSearchLoader({ className }: MobileSearchLoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center h-full w-full", className)}>
      <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
      <p className="mt-4 text-base text-gray-600 dark:text-gray-300">Buscando en móvil...</p>
    </div>
  )
}
