import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProductLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Card key={i} className="w-full bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 space-y-3">
            <Skeleton className="w-full h-48 rounded-md bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
