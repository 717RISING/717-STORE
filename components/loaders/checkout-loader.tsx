import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function CheckoutLoader() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
            <Skeleton className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></Skeleton>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-10 bg-gray-200 rounded w-full mb-4 animate-pulse"></Skeleton>
            <div className="space-y-6">
              <Skeleton className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></Skeleton>
              <Skeleton className="h-10 bg-gray-200 rounded w-full animate-pulse"></Skeleton>
              <Skeleton className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></Skeleton>
              <Skeleton className="h-10 bg-gray-200 rounded w-full animate-pulse"></Skeleton>
              <Skeleton className="h-10 bg-gray-200 rounded w-full animate-pulse"></Skeleton>
              <Skeleton className="h-10 bg-gray-200 rounded w-full animate-pulse"></Skeleton>
              <Skeleton className="h-12 bg-gray-200 rounded w-full animate-pulse"></Skeleton>
            </div>
          </div>
          <div className="lg:col-span-1">
            <Card className="bg-gray-50 dark:bg-gray-900 shadow-none border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  <Skeleton className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></Skeleton>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="w-16 h-16 bg-gray-200 rounded-md animate-pulse"></Skeleton>
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 bg-gray-200 rounded w-full animate-pulse"></Skeleton>
                        <Skeleton className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></Skeleton>
                      </div>
                      <Skeleton className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></Skeleton>
                    </div>
                  ))}
                </div>
                <Separator className="bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></Skeleton>
                    <Skeleton className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></Skeleton>
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></Skeleton>
                    <Skeleton className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></Skeleton>
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></Skeleton>
                    <Skeleton className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></Skeleton>
                  </div>
                  <Separator className="bg-gray-200 dark:bg-gray-700" />
                  <div className="flex justify-between font-bold text-lg">
                    <Skeleton className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></Skeleton>
                    <Skeleton className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></Skeleton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
