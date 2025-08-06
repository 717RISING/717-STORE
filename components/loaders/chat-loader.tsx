import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ChatLoader() {
  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="flex items-start gap-3">
          <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-40 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="flex items-end justify-end gap-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-40 bg-gray-200 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="flex items-start gap-3">
          <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="flex items-center gap-2 pt-4">
          <Skeleton className="h-10 flex-grow bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-10 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
      </CardContent>
    </Card>
  )
}

export default ChatLoader
