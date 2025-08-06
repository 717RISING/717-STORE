import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function MobileProductLoader() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="flex flex-col items-center p-4">
          <Skeleton className="w-32 h-32 rounded-md mb-4" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </Card>
      ))}
    </div>
  )
}
