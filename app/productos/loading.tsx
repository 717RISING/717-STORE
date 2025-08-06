import ProductLoader from '@/components/loaders/product-loader'
import MobileProductLoader from '@/components/loaders/mobile/mobile-product-loader'
import { useMobileDetection } from '@/hooks/use-mobile-detection'

export default function Loading() {
  const { isMobile } = useMobileDetection()

  return (
    <div className="container mx-auto px-4 py-8">
      {isMobile ? <MobileProductLoader /> : <ProductLoader />}
    </div>
  )
}
