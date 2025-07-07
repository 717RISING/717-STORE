"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import EnhancedButton from "./enhanced-button"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  isNew?: boolean
  category: string
  description: string
  sizes: string[]
}

interface InteractiveProductCardProps {
  product: Product
  delay?: number
}

export default function InteractiveProductCard({ product, delay = 0 }: InteractiveProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const { dispatch } = useCart()
  const { toast } = useToast()
  const { theme } = useTheme()
  const { isMobile, isTablet, touchSupport } = useMobileDetection()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${product.id}-M`,
        name: product.name,
        price: product.price,
        size: "M",
        quantity: 1,
        image: product.images[0],
      },
    })

    toast({
      title: "¡Agregado al carrito!",
      description: `${product.name} (Talla M) agregado exitosamente.`,
    })
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)

    toast({
      title: isLiked ? "Removido de favoritos" : "Agregado a favoritos",
      description: `${product.name} ${isLiked ? "removido de" : "agregado a"} tu lista de deseos.`,
    })
  }

  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }

  const handleImageError = () => {
    console.log(`Error loading image for product ${product.id}: ${product.images[0]}`)
    setImageLoading(false)
    setImageError(true)
  }

  // Obtener la imagen del producto
  const productImage = product.images && product.images.length > 0 ? product.images[0] : null
  const shouldShowPlaceholder = !productImage || imageError

  // Clases adaptativas según el tema y dispositivo
  const cardClasses = cn(
    "product-card group cursor-pointer transition-all duration-500 border overflow-hidden",
    // Border radius responsive
    isMobile ? "rounded-modern" : "rounded-modern-lg",
    // Hover effects solo en desktop
    !touchSupport && "hover-lift-modern",
    "animate-fade-in",
    theme === "dark"
      ? "card-dark bg-gray-900/80 border-gray-800/50 backdrop-blur-xl shadow-dark"
      : "card-light bg-white/90 border-gray-200/50 backdrop-blur-xl shadow-light",
  )

  const imageContainerClasses = cn(
    "product-card-image relative aspect-square overflow-hidden",
    isMobile ? "rounded-t-modern" : "rounded-t-modern-lg",
    theme === "dark" ? "bg-gray-800" : "bg-gray-100",
  )

  const overlayClasses = cn(
    "absolute inset-0 flex items-center justify-center gap-3 transition-all duration-500 backdrop-blur-sm",
    theme === "dark" ? "bg-black/40" : "bg-white/40",
    // En móvil, overlay siempre visible pero más sutil
    touchSupport ? "opacity-30" : isHovered ? "opacity-100" : "opacity-0",
  )

  const contentClasses = cn(
    "product-card-content space-y-3 transition-all duration-300",
    isMobile ? "p-4" : "p-6",
    theme === "dark" ? "bg-gray-900/90" : "bg-white/90",
  )

  const titleClasses = cn(
    "product-card-title font-semibold transition-colors duration-300",
    isMobile ? "text-sm" : "text-lg",
    theme === "dark"
      ? "text-white group-hover:text-[#5D1A1D] text-glow-dark"
      : "text-gray-900 group-hover:text-[#4A1518] text-glow-light",
  )

  const descriptionClasses = cn(
    "product-card-description text-sm line-clamp-2 transition-colors duration-300",
    isMobile ? "text-xs" : "text-sm",
    theme === "dark" ? "text-gray-400 group-hover:text-gray-300" : "text-gray-600 group-hover:text-gray-700",
  )

  const priceClasses = cn(
    "product-card-price font-bold transition-transform duration-300",
    isMobile ? "text-lg" : "text-xl",
    !touchSupport && "group-hover:scale-110",
    theme === "dark" ? "text-white" : "text-gray-900",
  )

  const sizeTagClasses = cn(
    "product-card-size-tag text-xs transition-colors duration-300 backdrop-blur-sm border",
    isMobile ? "px-2 py-1 text-xs" : "px-3 py-1",
    isMobile ? "rounded-md" : "rounded-modern",
    theme === "dark"
      ? "bg-gray-800/70 text-white border-gray-700 group-hover:bg-[#5D1A1D] group-hover:border-[#5D1A1D]"
      : "bg-gray-100/70 text-gray-700 border-gray-300 group-hover:bg-[#4A1518] group-hover:text-white group-hover:border-[#4A1518]",
  )

  const buttonSize = isMobile ? "sm" : "icon"
  const buttonClasses = cn(
    "transition-transform duration-500",
    isMobile ? "w-10 h-10" : "w-12 h-12",
    touchSupport ? "translate-y-0" : "translate-y-6 group-hover:translate-y-0",
  )

  return (
    <div
      className={cardClasses}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => !touchSupport && setIsHovered(true)}
      onMouseLeave={() => !touchSupport && setIsHovered(false)}
    >
      <Link href={`/productos/${product.id}`}>
        <div className={imageContainerClasses}>
          {/* Loading skeleton */}
          {imageLoading && (
            <div
              className={cn(
                "absolute inset-0 animate-pulse",
                theme === "dark" ? "image-loading-dark" : "image-loading",
              )}
            />
          )}

          {/* Product Image */}
          {productImage && !shouldShowPlaceholder ? (
            <Image
              src={productImage || "/placeholder.svg"}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-all duration-700",
                !touchSupport && "group-hover:scale-110",
                imageLoading ? "opacity-0" : "opacity-100",
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={delay < 300}
              sizes={
                isMobile
                  ? "(max-width: 480px) 50vw, (max-width: 768px) 50vw, 33vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
              quality={isMobile ? 75 : 85}
            />
          ) : (
            <div
              className={cn(
                "w-full h-full flex items-center justify-center font-bold transition-all duration-700",
                isMobile ? "text-4xl" : "text-6xl",
                !touchSupport && "group-hover:scale-110",
                theme === "dark" ? "bg-gray-800 text-gray-600" : "bg-gray-200 text-gray-400",
              )}
            >
              717
            </div>
          )}

          {/* Overlay con botones adaptativos */}
          <div className={overlayClasses}>
            <EnhancedButton
              variant={theme === "dark" ? "modern" : "outline"}
              size={buttonSize}
              onClick={handleQuickAdd}
              className={cn(buttonClasses, "delay-100")}
            >
              <ShoppingCart className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
            </EnhancedButton>

            <EnhancedButton
              variant="glassmorphism"
              size={buttonSize}
              onClick={handleLike}
              className={cn(
                buttonClasses,
                "delay-200",
                isLiked && "bg-red-500/20 border-red-500 text-red-400",
                theme === "light" && "border-gray-400 text-gray-700",
              )}
            >
              <Heart className={cn(isMobile ? "w-3 h-3" : "w-4 h-4", isLiked && "fill-current animate-pulse-glow")} />
            </EnhancedButton>

            <EnhancedButton
              variant={theme === "dark" ? "neon" : "ghost"}
              size={buttonSize}
              className={cn(buttonClasses, "delay-300")}
            >
              <Eye className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
            </EnhancedButton>
          </div>

          {/* Badge adaptativo */}
          {product.isNew && (
            <Badge
              className={cn(
                "absolute top-3 left-3 animate-pulse-glow border-0 font-semibold z-10",
                isMobile ? "text-xs px-2 py-1 rounded-md" : "rounded-modern",
                theme === "dark"
                  ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white",
              )}
            >
              NUEVO
            </Badge>
          )}

          {/* Efecto de brillo adaptativo - solo en desktop */}
          {!touchSupport && (
            <div
              className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                theme === "dark"
                  ? "bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                  : "bg-gradient-to-tr from-transparent via-gray-900/10 to-transparent",
              )}
            />
          )}

          {/* Partículas flotantes adaptativas - solo en desktop */}
          {!touchSupport && (
            <div className="absolute inset-0 pointer-events-none">
              {isHovered &&
                [...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "absolute w-1 h-1 rounded-full animate-twinkle",
                      theme === "dark" ? "bg-[#5D1A1D]" : "bg-[#4A1518]",
                    )}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
            </div>
          )}

          {/* Error indicator */}
          {imageError && productImage && (
            <div
              className={cn(
                "absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 z-10",
                isMobile ? "rounded-md" : "rounded-modern",
              )}
            >
              Error
            </div>
          )}
        </div>

        <div className={contentClasses}>
          <h3 className={titleClasses}>{product.name}</h3>
          <p className={descriptionClasses}>{product.description}</p>
          <div className="flex justify-between items-center pt-2">
            <span className={priceClasses}>${product.price}</span>
            <div className={cn("product-card-sizes flex", isMobile ? "gap-1" : "gap-2")}>
              {product.sizes.slice(0, isMobile ? 2 : 3).map((size) => (
                <span key={size} className={sizeTagClasses}>
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
