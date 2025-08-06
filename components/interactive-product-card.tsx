'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from 'lucide-react'
import { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import { toast } from "sonner"

interface InteractiveProductCardProps {
  product: Product;
}

export function InteractiveProductCard({ product }: InteractiveProductCardProps) {
  const { addToCart } = useCart()
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    addToCart(product, 1)
  }

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    if (!isWishlisted) {
      toast.success(`${product.name} añadido a tu lista de deseos!`)
    } else {
      toast.info(`${product.name} eliminado de tu lista de deseos.`)
    }
  }

  return (
    <Card className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
      <Link href={`/productos/${product.id}`} className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">Ver producto: {product.name}</span>
      </Link>
      <Image
        src={product.imageUrl || "/placeholder.svg?height=300&width=300&text=Product"}
        alt={product.name}
        width={300}
        height={300}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <CardContent className="p-4 bg-background">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
        <p className="text-xl font-bold text-gray-900 dark:text-gray-50 mt-2">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 bg-background flex justify-between items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={handleToggleWishlist}
          className={isWishlisted ? "text-red-500 border-red-500 hover:text-red-600 hover:border-red-600" : ""}
        >
          <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
          <span className="sr-only">Añadir a lista de deseos</span>
        </Button>
        <Button onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Añadir al Carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
