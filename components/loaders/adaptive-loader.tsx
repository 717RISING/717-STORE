import { useMobileDetection } from '@/hooks/use-mobile-detection'
import ProductLoader from './product-loader'
import MobileProductLoader from './mobile/mobile-product-loader'
import CheckoutLoader from './checkout-loader'
import MobileCheckoutLoader from './mobile/mobile-checkout-loader'
import ProfileLoader from './profile-loader'
import MobileProfileLoader from './mobile/mobile-profile-loader'
import SearchLoader from './search-loader'
import MobileSearchLoader from './mobile/mobile-search-loader'
import ChatLoader from './chat-loader'
import MobileChatLoader from './mobile/mobile-chat-loader'
import BrandLoader from './brand-loader'
import MobileBrandLoader from './mobile/mobile-brand-loader'
import ImageLoader from './image-loader'
import FormLoader from './form-loader'
import LoadingSpinner from './loading-spinner'

interface AdaptiveLoaderProps {
  type: 'product' | 'checkout' | 'profile' | 'search' | 'chat' | 'brand' | 'image' | 'form' | 'spinner'
}

export default function AdaptiveLoader({ type }: AdaptiveLoaderProps) {
  const { isMobile } = useMobileDetection()

  switch (type) {
    case 'product':
      return isMobile ? <MobileProductLoader /> : <ProductLoader />
    case 'checkout':
      return isMobile ? <MobileCheckoutLoader /> : <CheckoutLoader />
    case 'profile':
      return isMobile ? <MobileProfileLoader /> : <ProfileLoader />
    case 'search':
      return isMobile ? <MobileSearchLoader /> : <SearchLoader />
    case 'chat':
      return isMobile ? <MobileChatLoader /> : <ChatLoader />
    case 'brand':
      return isMobile ? <MobileBrandLoader /> : <BrandLoader />
    case 'image':
      return <ImageLoader />
    case 'form':
      return <FormLoader />
    case 'spinner':
      return <LoadingSpinner />
    default:
      return <LoadingSpinner />
  }
}
