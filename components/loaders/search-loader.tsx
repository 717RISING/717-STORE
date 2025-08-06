import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function SearchLoader() {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700 p-6">
      <div className="relative mb-6">
        <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="grid gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-md">
            <Skeleton className="w-16 h-16 rounded-md bg-gray-200 dark:bg-gray-700" />
            <div className="flex-grow space-y-2">
              <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default SearchLoader
