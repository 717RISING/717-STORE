'use client'

import { useMobileDetection } from "@/hooks/use-mobile-detection"
import { ProductLoader } from "./product-loader"
import { MobileProductLoader } from "./mobile/mobile-product-loader"
import { ChatLoader } from "./chat-loader"
import { MobileChatLoader } from "./mobile/mobile-chat-loader"
import { BrandLoader } from "./brand-loader"
import { MobileBrandLoader } from "./mobile/mobile-brand-loader"
import { SearchLoader } from "./search-loader"
import { MobileSearchLoader } from "./mobile/mobile-search-loader"
import { ProfileLoader } from "./profile-loader"
import { MobileProfileLoader } from "./mobile/mobile-profile-loader"
import { CheckoutLoader } from "./checkout-loader"
import { MobileCheckoutLoader } from "./mobile/mobile-checkout-loader"

interface AdaptiveLoaderProps {
  type: "product" | "chat" | "brand" | "search" | "profile" | "checkout";
}

export function AdaptiveLoader({ type }: AdaptiveLoaderProps) {
  const isMobile = useMobileDetection()

  switch (type) {
    case "product":
      return isMobile ? <MobileProductLoader /> : <ProductLoader />
    case "chat":
      return isMobile ? <MobileChatLoader /> : <ChatLoader />
    case "brand":
      return isMobile ? <MobileBrandLoader /> : <BrandLoader />
    case "search":
      return isMobile ? <MobileSearchLoader /> : <SearchLoader />
    case "profile":
      return isMobile ? <MobileProfileLoader /> : <ProfileLoader />
    case "checkout":
      return isMobile ? <MobileCheckoutLoader /> : <CheckoutLoader />
    default:
      return null
  }
}
