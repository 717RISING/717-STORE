import ProductLoader from "@/components/loaders/product-loader"
import MobileProductLoader from "@/components/loaders/mobile/mobile-product-loader"
import AdaptiveLoader from "@/components/loaders/adaptive-loader"

export default function Loading() {
  return <AdaptiveLoader desktopLoader={<ProductLoader />} mobileLoader={<MobileProductLoader />} />
}
