"use client"

import { ProductLoader } from '@/components/loaders/product-loader'
import { MobileProductLoader } from '@/components/loaders/mobile/mobile-product-loader'
import { useMobileDetection } from '@/hooks/use-mobile-detection'

export default function Loading() {
  const isMobile = useMobileDetection()
  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))] flex items-center justify-center">
      {isMobile ? <MobileProductLoader /> : <ProductLoader />}
    </div>
  )
}
