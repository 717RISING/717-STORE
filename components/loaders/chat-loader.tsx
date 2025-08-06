import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'

interface ChatLoaderProps {
  className?: string
}

export function ChatLoader({ className }: ChatLoaderProps) {
  return (
    <div className={cn("flex items-center justify-center h-full w-full", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="sr-only">Cargando chat...</span>
    </div>
  )
}
