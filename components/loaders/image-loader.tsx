import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'

interface ImageLoaderProps {
  className?: string
}

export function ImageLoader({ className }: ImageLoaderProps) {
  return (
    <div className={cn("flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-md", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
    </div>
  )
}
