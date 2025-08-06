"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useToast } from '@/hooks/use-toast'
import { Product } from '@/lib/types' // Assuming you have a types file for Product

interface InteractiveProductCardProps {
  product: Product
}

export function InteractiveProductCard({ product }: InteractiveProductCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigating to product detail page
    addToCart({ ...product, quantity: 1 })
    toast({
      title: "Añadido al carrito",
      description: `${product.name} ha sido añadido a tu carrito.`,
      variant: "default",
    })
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigating to product detail page
    // Implement wishlist logic here
    toast({
      title: "Añadido a la lista de deseos",
      description: `${product.name} ha sido añadido a tu lista de deseos.`,
      variant: "default",
    })
  }

  return (
    <Link href={`/productos/${product.id}`} className="group block">
      <Card className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
        <div className="relative w-full h-60 bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2">
              <Button
                size="icon"
                className="rounded-full bg-white text-gray-800 hover:bg-gray-100 transition-all duration-200 scale-0 group-hover:scale-100"
                onClick={handleAddToCart}
                aria-label="Añadir al carrito"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className="rounded-full bg-white text-gray-800 hover:bg-gray-100 transition-all duration-200 delay-100 scale-0 group-hover:scale-100"
                onClick={handleAddToWishlist}
                aria-label="Añadir a la lista de deseos"
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className="rounded-full bg-white text-gray-800 hover:bg-gray-100 transition-all duration-200 delay-200 scale-0 group-hover:scale-100"
                asChild
                aria-label="Ver detalles del producto"
              >
                <Link href={`/productos/${product.id}`}>
                  <Eye className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="p-4 text-center">
          <h3 className="text-lg font-semibold truncate">{product.name}</h3>
          <p className="text-muted-foreground text-sm">{product.category}</p>
          <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
