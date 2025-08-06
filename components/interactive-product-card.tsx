"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { formatPrice, type Product } from "@/lib/products"
import { motion } from "framer-motion"

interface InteractiveProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
  isInWishlist?: boolean
}

export function InteractiveProductCard({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist = false 
}: InteractiveProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart?.(product)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleWishlist?.(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay with actions */}
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute top-4 right-4 space-y-2">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                onClick={handleToggleWishlist}
              >
                <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-white text-black hover:bg-gray-100 transition-all duration-300"
                size="sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Agregar al Carrito
              </Button>
            </div>
          </div>

          {/* Stock badge */}
          {product.stock <= 5 && product.stock > 0 && (
            <Badge variant="destructive" className="absolute top-4 left-4">
              ¡Últimas {product.stock}!
            </Badge>
          )}
          
          {product.stock === 0 && (
            <Badge variant="secondary" className="absolute top-4 left-4">
              Agotado
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating!) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product.reviews})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              
              {/* Available sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="flex gap-1">
                  {product.sizes.slice(0, 3).map((size) => (
                    <Badge key={size} variant="outline" className="text-xs">
                      {size}
                    </Badge>
                  ))}
                  {product.sizes.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.sizes.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
