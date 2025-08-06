"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ImageOff } from 'lucide-react'

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string
  fallbackComponent?: React.ReactNode
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/placeholder.svg", // Default placeholder
  fallbackComponent,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
    }
    setHasError(true)
  }

  if (hasError && fallbackComponent) {
    return (
      <div className={cn("flex items-center justify-center bg-gray-200 dark:bg-gray-700", className)}>
        {fallbackComponent}
      </div>
    )
  }

  return (
    <Image
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      onError={handleError}
      className={cn(className, hasError && "object-contain p-4")} // Adjust styling for fallback
      {...props}
    />
  )
}
