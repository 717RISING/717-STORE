import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function BrandLoader() {
  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700 p-6">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-8 w-2/3 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-10 w-24 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-24 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </Card>
  )
}

export default BrandLoader
