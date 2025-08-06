import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MobileBrandLoader() {
  return (
    <Card className="w-full mx-auto bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700 p-4">
      <div className="flex flex-col items-center space-y-3">
        <Skeleton className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-7 w-2/3 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700" />
        <div className="flex gap-3 pt-3">
          <Skeleton className="h-9 w-20 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-9 w-20 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </Card>
  )
}

export default MobileBrandLoader
