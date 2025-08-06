"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface MobileProductLoaderProps {
  message?: string
  size?: "sm" | "md" | "lg"
  pullToRefresh?: boolean
}

export default function MobileProductLoader({ message = "Cargando productos...", size = "md", pullToRefresh = false }: MobileProductLoaderProps) {
  const getSkeletonHeight = () => {
    switch (size) {
      case "sm":
        return "h-32"
      case "md":
        return "h-48"
      case "lg":
        return "h-64"
      default:
        return "h-48"
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-950 p-4">
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="w-full bg-gray-800 border-gray-700 shadow-lg">
            <CardContent className="p-3 space-y-2">
              <Skeleton className={`w-full ${getSkeletonHeight()} rounded-md bg-gray-700`} />
              <Skeleton className="h-4 w-3/4 bg-gray-700" />
              <Skeleton className="h-4 w-1/2 bg-gray-700" />
            </CardContent>
          </Card>
        ))}
      </div>
      {message && (
        <p className="mt-8 text-lg font-medium text-gray-300 animate-pulse">
          {message}
        </p>
      )}
      {pullToRefresh && (
        <p className="mt-4 text-sm text-gray-500">Desliza hacia abajo para actualizar</p>
      )}
    </div>
  )
}
