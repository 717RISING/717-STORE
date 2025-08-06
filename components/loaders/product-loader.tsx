"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductLoaderProps {
  message?: string
  size?: "sm" | "md" | "lg"
}

export default function ProductLoader({ message = "Cargando productos...", size = "md" }: ProductLoaderProps) {
  const getSkeletonHeight = () => {
    switch (size) {
      case "sm":
        return "h-40"
      case "md":
        return "h-64"
      case "lg":
        return "h-80"
      default:
        return "h-64"
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-950 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="w-full bg-gray-800 border-gray-700 shadow-lg">
            <CardContent className="p-4 space-y-3">
              <Skeleton className={`w-full ${getSkeletonHeight()} rounded-md bg-gray-700`} />
              <Skeleton className="h-5 w-3/4 bg-gray-700" />
              <Skeleton className="h-4 w-1/2 bg-gray-700" />
              <Skeleton className="h-10 w-full bg-gray-700" />
            </CardContent>
          </Card>
        ))}
      </div>
      {message && (
        <p className="mt-10 text-xl font-medium text-gray-300 animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}
