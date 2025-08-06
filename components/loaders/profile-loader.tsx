import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

interface ProfileLoaderProps {
  className?: string
}

export function ProfileLoader({ className }: ProfileLoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <Loader2 className="h-12 w-12 animate-spin text-[#4A1518] dark:text-[#FFD700]" />
      <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Cargando perfil...</p>
      <div className="w-full max-w-md mt-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  )
}
