"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
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
  const [imageLoaded, setImageLoaded] = useState(false)
  const { dispatch } = useCart()
  const { toast } = useToast()

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

  return (
    <div
      className="group cursor-pointer card-modern hover-lift-modern animate-fade-in bg-mesh-modern"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/productos/${product.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-modern-lg">
          {/* Skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-shimmer rounded-modern-lg">
              <div className="h-full w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200px_100%] bg-no-repeat rounded-modern-lg"></div>
            </div>
          )}

          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-all duration-700 group-hover:scale-110 rounded-modern-lg",
              imageLoaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Overlay con botones */}
          <div
            className={cn(
              "absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-all duration-500 rounded-modern-lg backdrop-blur-sm",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            <EnhancedButton
              variant="modern"
              size="icon"
              onClick={handleQuickAdd}
              className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-100"
            >
              <ShoppingCart className="w-4 h-4" />
            </EnhancedButton>

            <EnhancedButton
              variant="glassmorphism"
              size="icon"
              onClick={handleLike}
              className={cn(
                "transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-200",
                isLiked && "bg-red-500/20 border-red-500 text-red-400",
              )}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current animate-heartbeat")} />
            </EnhancedButton>

            <EnhancedButton
              variant="neon"
              size="icon"
              className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-300"
            >
              <Eye className="w-4 h-4" />
            </EnhancedButton>
          </div>

          {/* Badges */}
          {product.isNew && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 animate-pulse-glow rounded-modern">
              NUEVO
            </Badge>
          )}

          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-modern-lg"></div>

          {/* Partículas flotantes */}
          <div className="particles-modern">
            {isHovered &&
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="particle-modern animate-particle-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
          </div>
        </div>

        <div className="p-6 space-y-3">
          <h3 className="font-semibold text-lg group-hover:text-[#4A1518] transition-colors duration-300 text-glow-modern">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold group-hover:scale-110 transition-transform duration-300 text-gradient-modern">
              ${product.price}
            </span>
            <div className="flex gap-2">
              {product.sizes.slice(0, 3).map((size) => (
                <span
                  key={size}
                  className="text-xs px-3 py-1 bg-gray-800/50 rounded-modern group-hover:bg-[#4A1518] transition-colors duration-300 backdrop-blur-sm"
                >
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
