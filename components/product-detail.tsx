'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/lib/cart-context'
import { Product } from '@/lib/products' // Assuming Product interface is defined here

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecciona una talla.')
      return
    }
    addToCart({ ...product, size: selectedSize, quantity })
    alert(`${quantity} x ${product.name} (Talla: ${selectedSize}) añadido al carrito!`)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardContent className="grid md:grid-cols-2 gap-8 p-6">
        <div className="relative w-full h-96 md:h-auto aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-4xl font-bold text-gray-900 dark:text-white">{product.name}</CardTitle>
              <CardDescription className="text-2xl font-semibold text-[#4A1518] dark:text-[#FFD700]">
                ${product.price.toLocaleString('es-CO')} COP
              </CardDescription>
            </CardHeader>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {product.description}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Talla
                </Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger id="size" className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                    <SelectValue placeholder="Selecciona una talla" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-700 text-gray-900 dark:text-white">
                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cantidad
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white py-3 text-lg font-semibold transition-colors"
          >
            Añadir al Carrito
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
