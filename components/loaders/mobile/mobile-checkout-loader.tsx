import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function MobileCheckoutLoader() {
  return (
    <Card className="w-full mx-auto bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700 p-4">
      <div className="space-y-5">
        <Skeleton className="h-7 w-2/3 bg-gray-200 dark:bg-gray-700" /> {/* Title */}
        <div className="grid grid-cols-3 gap-1 mb-4">
          <Skeleton className="h-9 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-9 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-9 bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Shipping Form Loader */}
        <div className="space-y-3">
          <Skeleton className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700" /> {/* Section Title */}
          <Skeleton className="h-9 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-9 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-9 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-9 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-9 w-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" /> {/* Button */}
        </div>

        {/* Order Summary Placeholder */}
        <div className="mt-6 space-y-3">
          <Skeleton className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700" /> {/* Section Title */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-16 w-full bg-gray-200 dark:bg-gray-700" /> {/* Items list */}
          <Skeleton className="h-5 w-1/3 ml-auto bg-gray-200 dark:bg-gray-700" /> {/* Total */}
        </div>
      </div>
    </Card>
  )
}
