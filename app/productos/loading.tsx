import { ProductLoader } from '@/components/loaders/product-loader'
import { MobileProductLoader } from '@/components/loaders/mobile/mobile-product-loader'
import { AdaptiveLoader } from '@/components/loaders/adaptive-loader'

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <AdaptiveLoader
        desktopLoader={<ProductLoader />}
        mobileLoader={<MobileProductLoader />}
      />
    </div>
  )
}
