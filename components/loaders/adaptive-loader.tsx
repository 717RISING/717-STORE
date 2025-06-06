"use client"

import { useMobileDetection } from "@/hooks/use-mobile-detection"
import ProductLoader from "./product-loader"
import CheckoutLoader from "./checkout-loader"
import ProfileLoader from "./profile-loader"
import SearchLoader from "./search-loader"
import ChatLoader from "./chat-loader"
import BrandLoader from "./brand-loader"

// Mobile versions
import MobileProductLoader from "./mobile/mobile-product-loader"
import MobileCheckoutLoader from "./mobile/mobile-checkout-loader"
import MobileProfileLoader from "./mobile/mobile-profile-loader"
import MobileSearchLoader from "./mobile/mobile-search-loader"
import MobileChatLoader from "./mobile/mobile-chat-loader"
import MobileBrandLoader from "./mobile/mobile-brand-loader"

interface AdaptiveLoaderProps {
  type: "product" | "checkout" | "profile" | "search" | "chat" | "brand"
  size?: "sm" | "md" | "lg"
  context?: Record<string, any>
}

export default function AdaptiveLoader({ type, size = "md", context = {} }: AdaptiveLoaderProps) {
  const { isMobile, touchSupport } = useMobileDetection()

  // Use mobile versions for mobile devices or touch-enabled devices
  const useMobileVersion = isMobile || touchSupport

  if (useMobileVersion) {
    switch (type) {
      case "product":
        return <MobileProductLoader size={size} {...context} />
      case "checkout":
        return <MobileCheckoutLoader size={size} {...context} />
      case "profile":
        return <MobileProfileLoader size={size} {...context} />
      case "search":
        return <MobileSearchLoader size={size} {...context} />
      case "chat":
        return <MobileChatLoader size={size} {...context} />
      case "brand":
        return <MobileBrandLoader size={size} {...context} />
      default:
        return <MobileProductLoader size={size} {...context} />
    }
  }

  // Desktop versions
  switch (type) {
    case "product":
      return <ProductLoader size={size} {...context} />
    case "checkout":
      return <CheckoutLoader size={size} {...context} />
    case "profile":
      return <ProfileLoader size={size} {...context} />
    case "search":
      return <SearchLoader size={size} {...context} />
    case "chat":
      return <ChatLoader size={size} {...context} />
    case "brand":
      return <BrandLoader size={size} {...context} />
    default:
      return <ProductLoader size={size} {...context} />
  }
}
