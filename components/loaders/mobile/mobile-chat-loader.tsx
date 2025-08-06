import { Skeleton } from "@/components/ui/skeleton"

export function MobileChatLoader() {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex items-center space-x-2 pb-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto">
        <div className="flex justify-start">
          <Skeleton className="h-12 w-3/4 rounded-lg" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-12 w-3/4 rounded-lg" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="h-12 w-3/4 rounded-lg" />
        </div>
      </div>
      <div className="flex items-center space-x-2 pt-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  )
}
