import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function MobileProductLoader() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="w-full bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 space-y-2">
            <Skeleton className="w-full h-40 rounded-md bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-8 w-full bg-gray-200 dark:bg-gray-700" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
