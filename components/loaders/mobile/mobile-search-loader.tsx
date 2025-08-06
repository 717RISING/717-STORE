import { Skeleton } from "@/components/ui/skeleton"

export function MobileSearchLoader() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <Skeleton className="h-10 w-full" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-8 w-3/4" />
      <div className="grid grid-cols-1 gap-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  )
}
