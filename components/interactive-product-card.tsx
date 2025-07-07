"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { formatPrice, type Product } from "@/lib/products"
import { useThemeSafe } from "@/hooks/use-theme-safe"

interface InteractiveProductCardProps {
  product: Product
}

export default function InteractiveProductCard({ product }: InteractiveProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()
  const { theme } = useThemeSafe()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: 1,
    })

    toast({
      title: "Producto agregado",
      description: `${product.name} (${selectedSize}) agregado al carrito`,
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)

    toast({
      title: isWishlisted ? "Eliminado de favoritos" : "Agregado a favoritos",
      description: `${product.name} ${isWishlisted ? "eliminado de" : "agregado a"} tu lista de deseos`,
    })
  }

  return (
    <div
      className={`group relative bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        theme === "dark" ? "hover:shadow-red-900/20" : "hover:shadow-gray-900/20"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/productos/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">NUEVO</Badge>}
          </div>

          {/* Action Buttons */}
          <div
            className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <Button
              size="icon"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-black"
              onClick={handleWishlist}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white text-black">
              <Eye className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Add to Cart */}
          <div
            className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex gap-2 mb-2">
              {product.sizes.slice(0, 4).map((size) => (
                <Button
                  key={size}
                  size="sm"
                  variant={selectedSize === size ? "default" : "secondary"}
                  className={`text-xs ${
                    selectedSize === size
                      ? "bg-[#5D1A1D] text-white hover:bg-[#6B1E22]"
                      : "bg-white/90 hover:bg-white text-black"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedSize(size)
                  }}
                >
                  {size}
                </Button>
              ))}
            </div>
            <Button className="w-full bg-[#5D1A1D] text-white hover:bg-[#6B1E22]" onClick={handleAddToCart}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Agregar al Carrito
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#5D1A1D] transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-[#5D1A1D]">{formatPrice(product.price)}</span>
            <div className="flex gap-1">
              {product.sizes.slice(0, 3).map((size) => (
                <span key={size} className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                  {size}
                </span>
              ))}
              {product.sizes.length > 3 && (
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">+{product.sizes.length - 3}</span>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}
