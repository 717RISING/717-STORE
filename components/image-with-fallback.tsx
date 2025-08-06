'use client'

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps extends React.ComponentProps<typeof Image> {
  fallbackSrc?: string;
}

export function ImageWithFallback({ src, fallbackSrc = "/placeholder.svg", alt, className, ...props }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc)
        }
      }}
      className={cn("object-cover", className)}
      {...props}
    />
  )
}
