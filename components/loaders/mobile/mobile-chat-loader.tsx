import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MobileChatLoader() {
  return (
    <Card className="w-full mx-auto bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-5 w-1/3 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-700" />
      </CardHeader>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-start gap-2">
          <Skeleton className="h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-40 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="flex items-end justify-end gap-2">
          <div className="space-y-1">
            <Skeleton className="h-4 w-40 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="flex items-start gap-2">
          <Skeleton className="h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="flex items-center gap-2 pt-3">
          <Skeleton className="h-9 flex-grow bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-9 w-9 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
      </CardContent>
    </Card>
  )
}

export default MobileChatLoader
