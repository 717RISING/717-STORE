"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface ProfileLoaderProps {
  message?: string
}

export default function ProfileLoader({ message = "Cargando perfil..." }: ProfileLoaderProps) {
  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-gray-950 p-4">
      <Card className="w-full max-w-md shadow-lg bg-gray-800 border-gray-700">
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-24 w-24 rounded-full bg-gray-700" />
            <Skeleton className="h-6 w-48 bg-gray-700" />
            <Skeleton className="h-4 w-64 bg-gray-700" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-32 bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-700" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-32 bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-700" />
          </div>

          <div className="flex justify-center gap-4">
            <Skeleton className="h-10 w-24 bg-gray-700" />
            <Skeleton className="h-10 w-24 bg-gray-700" />
          </div>

          {message && (
            <p className="mt-6 text-center text-gray-400 animate-pulse">
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
