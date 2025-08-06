'use client'

import Image from 'next/image'
import React, { useState } from 'react'

interface ImageWithFallbackProps extends React.ComponentProps<typeof Image> {
  fallbackSrc?: string;
}

export function ImageWithFallback({ src, fallbackSrc = "/placeholder.svg", alt, ...props }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc || fallbackSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc)
        }
      }}
      {...props}
    />
  )
}
