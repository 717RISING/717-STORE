import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="flex flex-col">
          <Skeleton className="w-full h-64 rounded-t-lg" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        </Card>
      ))}
    </div>
  )
}
