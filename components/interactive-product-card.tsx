'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/types'
import { ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface InteractiveProductCardProps {
  product: Product;
}

export function InteractiveProductCard({ product }: InteractiveProductCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0])
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0])

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      toast({
        title: "Selecciona una talla",
        description: `Por favor, selecciona una talla para ${product.name}.`,
        variant: "destructive",
      })
      return
    }
    if (!selectedColor && product.colors && product.colors.length > 0) {
      toast({
        title: "Selecciona un color",
        description: `Por favor, selecciona un color para ${product.name}.`,
        variant: "destructive",
      })
      return
    }

    addToCart(product, 1, selectedSize, selectedColor)
  }

  const handleAddToWishlist = () => {
    toast({
      title: "Añadido a la Lista de Deseos",
      description: `${product.name} ha sido añadido a tu lista de deseos.`,
    })
    // Implement actual wishlist logic here
  }

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <Link href={`/productos/${product.id}`} className="relative block w-full h-48 overflow-hidden rounded-t-md">
        <Image
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <CardContent className="flex-1 p-4 flex flex-col">
        <Link href={`/productos/${product.id}`}>
          <h3 className="text-lg font-semibold mb-1 hover:underline">{product.name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
        <p className="text-xl font-bold mt-auto">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 border-t flex flex-col gap-2">
        {product.sizes && product.sizes.length > 0 && (
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona Talla" />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map(size => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {product.colors && product.colors.length > 0 && (
          <Select value={selectedColor} onValueChange={setSelectedColor}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona Color" />
            </SelectTrigger>
            <SelectContent>
              {product.colors.map(color => (
                <SelectItem key={color} value={color}>{color}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="flex w-full gap-2 mt-2">
          <Button onClick={handleAddToCart} className="flex-1">
            <ShoppingCart className="h-4 w-4 mr-2" /> Añadir
          </Button>
          <Button variant="outline" size="icon" onClick={handleAddToWishlist}>
            <Heart className="h-4 w-4" />
            <span className="sr-only">Añadir a la lista de deseos</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
