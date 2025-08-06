import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'

interface FormLoaderProps {
  className?: string
}

export function FormLoader({ className }: FormLoaderProps) {
  return (
    <div className={cn("flex items-center justify-center w-full py-4", className)}>
      <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
      <span className="ml-2 text-gray-600 dark:text-gray-300">Procesando...</span>
    </div>
  )
}
