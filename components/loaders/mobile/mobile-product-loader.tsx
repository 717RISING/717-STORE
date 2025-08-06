"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function MobileProductLoader() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}
