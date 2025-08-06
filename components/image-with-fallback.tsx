'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string
}

export default function ImageWithFallback({
  src,
  fallbackSrc = '/placeholder.svg?height=200&width=200',
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
      {...props}
    />
  )
}
