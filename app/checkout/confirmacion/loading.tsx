import CheckoutLoader from '@/components/loaders/checkout-loader'
import MobileCheckoutLoader from '@/components/loaders/mobile/mobile-checkout-loader'
import { useMobileDetection } from '@/hooks/use-mobile-detection'

export default function Loading() {
  const { isMobile } = useMobileDetection()

  return (
    <div className="container mx-auto px-4 py-8">
      {isMobile ? <MobileCheckoutLoader /> : <CheckoutLoader />}
    </div>
  )
}
