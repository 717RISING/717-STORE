import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MobileProductLoader() { // Changed to named export
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="flex flex-col items-center p-4">
          <Skeleton className="w-32 h-32 rounded-md mb-4" />
          <Skeleton className="w-3/4 h-4 mb-2" />
          <Skeleton className="w-1/2 h-4" />
        </Card>
      ))}
    </div>
  )
}
