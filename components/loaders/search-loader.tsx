import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function SearchLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <Skeleton className="w-full h-32 rounded-md mb-4" />
            <Skeleton className="w-3/4 h-5 mb-2" />
            <Skeleton className="w-1/2 h-4" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
