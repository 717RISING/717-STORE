import { Skeleton } from '@/components/ui/skeleton'

export function ImageLoader() {
  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg">
      <Skeleton className="h-full w-full bg-gray-200 dark:bg-gray-700" />
    </div>
  )
}

export default ImageLoader
