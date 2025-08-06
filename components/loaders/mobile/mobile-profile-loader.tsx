import { Skeleton } from '@/components/ui/skeleton'

export function MobileProfileLoader() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>

      <div className="space-y-3">
        <Skeleton className="h-7 w-[120px]" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-7 w-[140px]" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  )
}
