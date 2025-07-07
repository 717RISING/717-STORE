"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import EnhancedButton from "./enhanced-button"
import ImageWithFallback from "./image-with-fallback"
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
  const [imageLoaded, setImageLoaded] = useState(false)
  const { dispatch } = useCart()
  const { toast } = useToast()
  const { theme } = useTheme()

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

  // Clases adaptativas según el tema
  const cardClasses = cn(
    "group cursor-pointer hover-lift-modern animate-fade-in rounded-modern-lg overflow-hidden transition-all duration-500",
    theme === "dark"
      ? "card-dark bg-gray-900/80 border-gray-800/50 backdrop-blur-xl shadow-dark"
      : "card-light bg-white/90 border-gray-200/50 backdrop-blur-xl shadow-light",
  )

  const imageContainerClasses = cn(
    "relative aspect-square overflow-hidden rounded-t-modern-lg",
    theme === "dark" ? "bg-gray-800" : "bg-gray-100",
  )

  const overlayClasses = cn(
    "absolute inset-0 flex items-center justify-center gap-3 transition-all duration-500 rounded-t-modern-lg backdrop-blur-sm",
    theme === "dark" ? "bg-black/40 hover:bg-black/60" : "bg-white/40 hover:bg-white/60",
    isHovered ? "opacity-100" : "opacity-0",
  )

  const contentClasses = cn(
    "p-6 space-y-3 transition-all duration-300",
    theme === "dark" ? "bg-gray-900/90" : "bg-white/90",
  )

  const titleClasses = cn(
    "font-semibold text-lg transition-colors duration-300",
    theme === "dark"
      ? "text-white group-hover:text-[#5D1A1D] text-glow-dark"
      : "text-gray-900 group-hover:text-[#4A1518] text-glow-light",
  )

  const descriptionClasses = cn(
    "text-sm line-clamp-2 transition-colors duration-300",
    theme === "dark" ? "text-gray-400 group-hover:text-gray-300" : "text-gray-600 group-hover:text-gray-700",
  )

  const priceClasses = cn(
    "text-xl font-bold group-hover:scale-110 transition-transform duration-300",
    theme === "dark" ? "text-white" : "text-gray-900",
  )

  const sizeTagClasses = cn(
    "text-xs px-3 py-1 rounded-modern transition-colors duration-300 backdrop-blur-sm border",
    theme === "dark"
      ? "bg-gray-800/70 text-white border-gray-700 group-hover:bg-[#5D1A1D] group-hover:border-[#5D1A1D]"
      : "bg-gray-100/70 text-gray-700 border-gray-300 group-hover:bg-[#4A1518] group-hover:text-white group-hover:border-[#4A1518]",
  )

  return (
    <div
      className={cardClasses}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/productos/${product.id}`}>
        <div className={imageContainerClasses}>
          <ImageWithFallback
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 rounded-t-modern-lg"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Overlay con botones adaptativos */}
          <div className={overlayClasses}>
            <EnhancedButton
              variant={theme === "dark" ? "modern" : "outline"}
              size="icon"
              onClick={handleQuickAdd}
              className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-100 rounded-modern-lg"
            >
              <ShoppingCart className="w-4 h-4" />
            </EnhancedButton>

            <EnhancedButton
              variant="glassmorphism"
              size="icon"
              onClick={handleLike}
              className={cn(
                "transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-200 rounded-modern-lg",
                isLiked && "bg-red-500/20 border-red-500 text-red-400",
                theme === "light" && "border-gray-400 text-gray-700",
              )}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current animate-pulse-glow")} />
            </EnhancedButton>

            <EnhancedButton
              variant={theme === "dark" ? "neon" : "ghost"}
              size="icon"
              className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-300 rounded-modern-lg"
            >
              <Eye className="w-4 h-4" />
            </EnhancedButton>
          </div>

          {/* Badge adaptativo */}
          {product.isNew && (
            <Badge
              className={cn(
                "absolute top-3 left-3 animate-pulse-glow rounded-modern border-0 font-semibold",
                theme === "dark"
                  ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white",
              )}
            >
              NUEVO
            </Badge>
          )}

          {/* Efecto de brillo adaptativo */}
          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-t-modern-lg",
              theme === "dark"
                ? "bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                : "bg-gradient-to-tr from-transparent via-gray-900/10 to-transparent",
            )}
          ></div>

          {/* Partículas flotantes adaptativas */}
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
        </div>

        <div className={contentClasses}>
          <h3 className={titleClasses}>{product.name}</h3>
          <p className={descriptionClasses}>{product.description}</p>
          <div className="flex justify-between items-center pt-2">
            <span className={priceClasses}>${product.price}</span>
            <div className="flex gap-2">
              {product.sizes.slice(0, 3).map((size) => (
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
