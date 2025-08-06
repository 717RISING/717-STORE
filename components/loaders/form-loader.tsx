import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'

interface FormLoaderProps {
  className?: string
}

export function FormLoader({ className }: FormLoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center h-full w-full p-4", className)}>
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="mt-4 text-lg text-muted-foreground">Cargando formulario...</p>
    </div>
  )
}
