import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface ImageLoaderProps {
  className?: string;
}

export function ImageLoader({ className }: ImageLoaderProps) {
  return (
    <Skeleton className={cn("w-full h-48 rounded-md", className)} />
  )
}
