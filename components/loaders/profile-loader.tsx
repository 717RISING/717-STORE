import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function DesktopProfileLoader() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700 h-64">
        <CardHeader>
          <Skeleton className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-8 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-8 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-8 w-full bg-gray-200 dark:bg-gray-700" />
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700 h-[500px]">
        <CardHeader>
          <Skeleton className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-12 w-1/2 bg-gray-200 dark:bg-gray-700" />
        </CardContent>
      </Card>
    </div>
  )
}

export default DesktopProfileLoader
