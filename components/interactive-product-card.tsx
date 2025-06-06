"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import EnhancedButton from "./enhanced-button"
import AnimatedCard from "./animated-card"
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
    <AnimatedCard
      hoverEffect="lift"
      delay={delay}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/productos/${product.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          {/* Skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-shimmer">
              <div className="h-full w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200px_100%] bg-no-repeat"></div>
            </div>
          )}

          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-all duration-700 group-hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Overlay con botones */}
          <div
            className={cn(
              "absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-all duration-300",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            <EnhancedButton
              variant="glow"
              size="icon"
              onClick={handleQuickAdd}
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100"
            >
              <ShoppingCart className="w-4 h-4" />
            </EnhancedButton>

            <EnhancedButton
              variant="outline"
              size="icon"
              onClick={handleLike}
              className={cn(
                "transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-200",
                isLiked && "bg-red-500 border-red-500 text-white",
              )}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
            </EnhancedButton>

            <EnhancedButton
              variant="ghost"
              size="icon"
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-300"
            >
              <Eye className="w-4 h-4" />
            </EnhancedButton>
          </div>

          {/* Badges */}
          {product.isNew && (
            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 animate-pulse">NUEVO</Badge>
          )}

          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg group-hover:text-[#4A1518] transition-colors duration-300 text-glow">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold group-hover:scale-110 transition-transform duration-300">
              ${product.price}
            </span>
            <div className="flex gap-1">
              {product.sizes.slice(0, 3).map((size) => (
                <span
                  key={size}
                  className="text-xs px-2 py-1 bg-gray-800 rounded group-hover:bg-[#4A1518] transition-colors duration-300"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </AnimatedCard>
  )
}
