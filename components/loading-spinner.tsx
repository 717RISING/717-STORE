"use client"

import { useEffect, useState } from "react"
import ProductLoader from "./loaders/product-loader"
import CheckoutLoader from "./loaders/checkout-loader"
import ProfileLoader from "./loaders/profile-loader"
import SearchLoader from "./loaders/search-loader"
import ChatLoader from "./loaders/chat-loader"
import BrandLoader from "./loaders/brand-loader"
import ImageLoader from "./loaders/image-loader"
import FormLoader from "./loaders/form-loader"

type LoaderType = "product" | "checkout" | "profile" | "search" | "chat" | "brand" | "image" | "form" | "default"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "wine" | "white" | "gray"
  type?: LoaderType
  message?: string
  context?: any
}

export default function LoadingSpinner({
  size = "md",
  color = "wine",
  type = "default",
  message,
  context = {},
}: LoadingSpinnerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Render specific loader based on type
  switch (type) {
    case "product":
      return <ProductLoader size={size} message={message} />
    case "checkout":
      return <CheckoutLoader size={size} step={context.step} />
    case "profile":
      return <ProfileLoader size={size} userName={context.userName} />
    case "search":
      return <SearchLoader size={size} searchTerm={context.searchTerm} />
    case "chat":
      return <ChatLoader size={size} status={context.status} />
    case "brand":
      return <BrandLoader size={size} message={message} />
    case "image":
      return <ImageLoader size={size} count={context.count} />
    case "form":
      return <FormLoader size={size} type={context.formType} message={message} />
    default:
      return <BrandLoader size={size} message={message} />
  }
}
