import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MobileProfileLoader() {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <Skeleton className="h-5 w-2/3 mb-2" />
        <Skeleton className="h-3 w-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Skeleton className="h-8 w-full mt-4" />
      </CardContent>
    </Card>
  )
}
