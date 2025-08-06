import { Skeleton } from '@/components/ui/skeleton'

export function MobileChatLoader() {
  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <div className="flex justify-start">
        <Skeleton className="h-10 w-3/4 rounded-lg" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-10 w-2/3 rounded-lg" />
      </div>
      <div className="flex justify-start">
        <Skeleton className="h-10 w-1/2 rounded-lg" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-10 w-3/4 rounded-lg" />
      </div>
      <div className="flex-1" /> {/* Spacer */}
      <Skeleton className="h-12 w-full rounded-md" />
    </div>
  )
}
