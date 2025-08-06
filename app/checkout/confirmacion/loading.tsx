import { CheckoutLoader } from '@/components/loaders/checkout-loader'
import { MobileCheckoutLoader } from '@/components/loaders/mobile/mobile-checkout-loader'
import { AdaptiveLoader } from '@/components/loaders/adaptive-loader'

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <AdaptiveLoader
        desktopLoader={<CheckoutLoader />}
        mobileLoader={<MobileCheckoutLoader />}
      />
    </div>
  )
}
