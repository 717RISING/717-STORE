"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function MobileSearchLoader() {
  return (
    <div className="px-4 py-4 space-y-4">
      <Skeleton className="h-10 w-full rounded-lg" />
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}
