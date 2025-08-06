import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MobileSearchLoader() {
  return (
    <Card className="w-full mx-auto bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700 p-4">
      <div className="relative mb-4">
        <Skeleton className="h-9 w-full bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="grid gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-md">
            <Skeleton className="w-14 h-14 rounded-md bg-gray-200 dark:bg-gray-700" />
            <div className="flex-grow space-y-1">
              <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default MobileSearchLoader
