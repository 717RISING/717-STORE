import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'

interface BrandLoaderProps {
  className?: string
}

export function BrandLoader({ className }: BrandLoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center h-full w-full", className)}>
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-lg font-semibold text-primary">Cargando Marca...</p>
    </div>
  )
}
