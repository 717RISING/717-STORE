import { Skeleton } from "@/components/ui/skeleton"

export function ProfileLoader() {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <Skeleton className="h-24 w-24 rounded-full" />
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-32" />
      <div className="grid w-full grid-cols-2 gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-4 w-24" />
    </div>
  )
}
