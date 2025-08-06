import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MobileSearchLoader() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <Skeleton className="w-full h-24 rounded-md mb-4" />
            <Skeleton className="w-3/4 h-4 mb-2" />
            <Skeleton className="w-1/2 h-3" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
