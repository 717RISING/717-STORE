"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Star } from 'lucide-react'

interface BrandLoaderProps {
  message?: string
}

export function BrandLoader({ message = "Cargando marcas destacadas..." }: BrandLoaderProps) {
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-gray-950 p-4">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-[#4A1518] to-[#6B1E22] rounded-full flex items-center justify-center shadow-lg">
          <Star className="w-12 h-12 text-white animate-spin" />
        </div>
        <div className="absolute inset-0 border-4 border-[#4A1518] rounded-full animate-ping opacity-40" />
      </div>

      <div className="text-center max-w-md">
        <p className="text-2xl font-semibold mb-2 text-white">{message}</p>
        <p className="text-gray-400 text-base">Descubriendo las últimas colecciones y tendencias.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 w-full max-w-4xl">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="w-full bg-gray-800 border-gray-700 shadow-lg">
            <CardContent className="p-4 flex flex-col items-center space-y-3">
              <Skeleton className="h-20 w-20 rounded-full bg-gray-700" />
              <Skeleton className="h-5 w-3/4 bg-gray-700" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
