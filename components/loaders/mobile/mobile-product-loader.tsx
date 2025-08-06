import { Skeleton } from '@/components/ui/skeleton'

export function MobileProductLoader() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[180px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      ))}
    </div>
  )
}
