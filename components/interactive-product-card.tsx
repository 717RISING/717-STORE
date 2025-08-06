"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import { motion } from "framer-motion"
import Image from "next/image"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isNew?: boolean
  isSale?: boolean
}

interface InteractiveProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void
  onQuickView?: (product: Product) => void
}

export function InteractiveProductCard({ 
  product, 
  onAddToCart, 
  onAddToWishlist, 
  onQuickView 
}: InteractiveProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist)
    onAddToWishlist?.(product)
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge variant="secondary" className="bg-green-500 text-white">
                Nuevo
              </Badge>
            )}
            {product.isSale && discount > 0 && (
              <Badge variant="destructive">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            size="icon"
            variant="ghost"
            className={`absolute top-2 right-2 transition-all duration-200 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            onClick={handleAddToWishlist}
          >
            <Heart 
              className={`h-4 w-4 ${
                isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`} 
            />
          </Button>

          {/* Quick Actions */}
          <div className={`absolute bottom-2 left-2 right-2 flex gap-2 transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onAddToCart?.(product)}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Agregar
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => onQuickView?.(product)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
