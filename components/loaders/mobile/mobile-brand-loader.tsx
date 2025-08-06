import { Skeleton } from '@/components/ui/skeleton'

export function MobileBrandLoader() {
  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      <Skeleton className="h-24 w-24 rounded-full" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[90%]" />
      <Skeleton className="h-4 w-[80%]" />
      <div className="grid grid-cols-2 gap-4 w-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <Skeleton className="h-[150px] w-full rounded-md" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        ))}
      </div>
    </div>
  )
}
