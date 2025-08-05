import AdaptiveLoader from "@/components/loaders/adaptive-loader"
import CheckoutLoader from "@/components/loaders/checkout-loader"
import MobileCheckoutLoader from "@/components/loaders/mobile/mobile-checkout-loader"

export default function Loading() {
  return <AdaptiveLoader desktopLoader={CheckoutLoader} mobileLoader={MobileCheckoutLoader} />
}
