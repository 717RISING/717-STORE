"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  onLoad?: () => void
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/placeholder.svg?height=600&width=500",
  className,
  fill,
  width,
  height,
  priority = false,
  onLoad,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    onLoad?.()
  }

  const handleError = () => {
    console.log(`Error loading image: ${imgSrc}, falling back to: ${fallbackSrc}`)
    setHasError(true)
    setIsLoading(false)
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
    }
  }

  return (
    <div className="relative">
      {/* Loading skeleton */}
      {isLoading && (
        <div
          className={cn("absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-modern-lg", className)}
        />
      )}

      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        priority={priority}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          hasError && imgSrc === fallbackSrc && "filter grayscale",
          className,
        )}
        onLoad={handleLoad}
        onError={handleError}
        unoptimized={imgSrc.includes("placeholder.svg")}
      />

      {/* Error indicator - only show if we're using fallback */}
      {hasError && imgSrc === fallbackSrc && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-modern z-10">
          Imagen no disponible
        </div>
      )}
    </div>
  )
}
