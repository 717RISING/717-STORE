import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductLoader() { // Changed to named export
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <Skeleton className="w-full h-48 rounded-md mb-4" />
            <Skeleton className="w-3/4 h-6 mb-2" />
            <Skeleton className="w-1/2 h-4" />
            <div className="flex justify-between items-center mt-4">
              <Skeleton className="w-1/4 h-6" />
              <Skeleton className="w-1/3 h-10 rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
