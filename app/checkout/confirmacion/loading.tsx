"use client"

import { CheckoutLoader } from '@/components/loaders/checkout-loader'
import { MobileCheckoutLoader } from '@/components/loaders/mobile/mobile-checkout-loader'
import { useMobileDetection } from '@/hooks/use-mobile-detection'

export default function Loading() {
  const isMobile = useMobileDetection()
  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))] flex items-center justify-center">
      {isMobile ? <MobileCheckoutLoader /> : <CheckoutLoader />}
    </div>
  )
}
