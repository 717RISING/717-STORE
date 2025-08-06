import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MobileBrandLoader() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="flex flex-col items-center p-4">
          <Skeleton className="w-24 h-24 rounded-full mb-4" />
          <Skeleton className="w-3/4 h-4" />
        </Card>
      ))}
    </div>
  )
}
