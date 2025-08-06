import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function MobileChatLoader() {
  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <div className="flex justify-start">
        <Skeleton className="h-12 w-3/4 rounded-lg" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-12 w-3/4 rounded-lg" />
      </div>
      <div className="flex justify-start">
        <Skeleton className="h-12 w-2/3 rounded-lg" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-12 w-1/2 rounded-lg" />
      </div>
      <div className="mt-auto flex gap-2">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </div>
  )
}
