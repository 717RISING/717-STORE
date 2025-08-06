import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

interface MobileProfileLoaderProps {
  className?: string
}

export function MobileProfileLoader({ className }: MobileProfileLoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-4", className)}>
      <Loader2 className="h-10 w-10 animate-spin text-[#4A1518] dark:text-[#FFD700]" />
      <p className="mt-4 text-base font-semibold text-gray-700 dark:text-gray-300">Cargando perfil móvil...</p>
      <div className="w-full mt-6 space-y-4">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-1 flex-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  )
}
