"use client"

import { useMobileDetection } from "@/hooks/use-mobile-detection"
import DesktopProductLoader from "./product-loader" // Changed to default import
import MobileProductLoader from "./mobile/mobile-product-loader" // Changed to default import
import DesktopProfileLoader from "./profile-loader" // Changed to default import
import MobileProfileLoader from "./mobile/mobile-profile-loader" // Already default
import { SearchLoader as DesktopSearchLoader } from "./search-loader" // Keep named
import MobileSearchLoader from "./mobile/mobile-search-loader" // Already default
import { ChatLoader as DesktopChatLoader } from "./chat-loader" // Keep named
import MobileChatLoader from "./mobile/mobile-chat-loader" // Already default
import { BrandLoader as DesktopBrandLoader } from "./brand-loader" // Keep named
import MobileBrandLoader from "./mobile/mobile-brand-loader" // Already default
import { CheckoutLoader as DesktopCheckoutLoader } from "./checkout-loader" // Keep named
import MobileCheckoutLoader from "./mobile/mobile-checkout-loader" // Already default
import { ImageLoader as DesktopImageLoader } from "./image-loader" // Keep named
import { FormLoader as DesktopFormLoader } from "./form-loader" // Keep named
import { LoadingSpinner as DesktopLoadingSpinner } from "./loading-spinner" // Keep named

interface AdaptiveLoaderProps {
  type: "product" | "profile" | "search" | "chat" | "brand" | "checkout" | "image" | "form" | "spinner"
  message?: string
  size?: "sm" | "md" | "lg"
  pullToRefresh?: boolean // Only for product loader
}

export default function AdaptiveLoader({ type, message, size, pullToRefresh }: AdaptiveLoaderProps) {
  const { isMobile } = useMobileDetection()

  switch (type) {
    case "product":
      return isMobile ? (
        <MobileProductLoader message={message} size={size} pullToRefresh={pullToRefresh} />
      ) : (
        <DesktopProductLoader message={message} size={size} />
      )
    case "profile":
      return isMobile ? (
        <MobileProfileLoader message={message} />
      ) : (
        <DesktopProfileLoader message={message} />
      )
    case "search":
      return isMobile ? (
        <MobileSearchLoader message={message} />
      ) : (
        <DesktopSearchLoader message={message} />
      )
    case "chat":
      return isMobile ? (
        <MobileChatLoader message={message} />
      ) : (
        <DesktopChatLoader message={message} />
      )
    case "brand":
      return isMobile ? (
        <MobileBrandLoader message={message} />
      ) : (
        <DesktopBrandLoader message={message} />
      )
    case "checkout":
      return isMobile ? (
        <MobileCheckoutLoader message={message} />
      ) : (
        <DesktopCheckoutLoader message={message} />
      )
    case "image":
      return <DesktopImageLoader message={message} />
    case "form":
      return <DesktopFormLoader message={message} />
    case "spinner":
      return <DesktopLoadingSpinner message={message} />
    default:
      return null
  }
}
