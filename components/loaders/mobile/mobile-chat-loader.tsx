"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function MobileChatLoader() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-4">
        <div className="flex justify-start">
          <Skeleton className="h-10 w-48 rounded-2xl" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-10 w-32 rounded-2xl" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="h-10 w-56 rounded-2xl" />
        </div>
      </div>
      <div className="p-4 border-t">
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </div>
  )
}
