import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MobileProfileLoader() {
  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-10 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-10 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-10 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-10 bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Main Content */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700 h-[400px]">
        <CardHeader>
          <Skeleton className="h-7 w-1/2 bg-gray-200 dark:bg-gray-700" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-9 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-9 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-9 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-9 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
        </CardContent>
      </Card>
    </div>
  )
}

export default MobileProfileLoader
