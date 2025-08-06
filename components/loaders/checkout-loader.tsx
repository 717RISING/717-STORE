import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function CheckoutLoader() {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700 p-6">
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700" /> {/* Title */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <Skeleton className="h-10 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Shipping Form Loader */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/4 bg-gray-200 dark:bg-gray-700" /> {/* Section Title */}
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 col-span-2 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 col-span-2 bg-gray-200 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-12 w-full bg-gray-200 dark:bg-gray-700" /> {/* Button */}
        </div>

        {/* Order Summary Placeholder */}
        <div className="mt-8 space-y-4">
          <Skeleton className="h-6 w-1/4 bg-gray-200 dark:bg-gray-700" /> {/* Section Title */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-20 w-full bg-gray-200 dark:bg-gray-700" /> {/* Items table */}
          <Skeleton className="h-6 w-1/3 ml-auto bg-gray-200 dark:bg-gray-700" /> {/* Total */}
        </div>
      </div>
    </Card>
  )
}
