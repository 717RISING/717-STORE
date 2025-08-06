import { Skeleton } from '@/components/ui/skeleton'

export function MobileSearchLoader() {
  return (
    <div className="flex flex-col items-center p-4">
      <Skeleton className="h-10 w-full rounded-md mb-4" />
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
