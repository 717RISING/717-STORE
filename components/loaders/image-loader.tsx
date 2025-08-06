"use client"

import { useState, useEffect } from "react"
import { Image, Eye, Sparkles } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

interface ImageLoaderProps {
  message?: string
  width?: string
  height?: string
}

export default function ImageLoader({ message = "Cargando imagen...", width = "w-full", height = "h-64" }: ImageLoaderProps) {
  const [loadedPixels, setLoadedPixels] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const pixelInterval = setInterval(() => {
      setLoadedPixels((prev) => (prev >= 100 ? 0 : prev + 3))
    }, 50)

    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 1) // Assuming count is always 1 for simplicity
    }, 1500)

    return () => {
      clearInterval(pixelInterval)
      clearInterval(imageInterval)
    }
  }, [])

  return (
    <div className={`flex flex-col items-center justify-center ${width} ${height} bg-gray-950 rounded-lg overflow-hidden`}>
      <Skeleton className={`w-full h-full bg-gray-800 flex items-center justify-center`}>
        <Image className="w-16 h-16 text-gray-600 animate-pulse" />
      </Skeleton>
      {message && (
        <p className="mt-4 text-lg font-medium text-gray-300 animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}
