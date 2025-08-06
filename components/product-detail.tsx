'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Star, ShoppingCart } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/lib/cart-context'
import { toast } from 'sonner'

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '')
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || '')
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Por favor, selecciona una talla y un color.")
      return
    }
    addToCart({
      productId: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
    })
    toast.success(`${quantity} x ${product.name} añadido al carrito!`)
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Product Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden">
        <Image
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-gray-600 dark:text-gray-400 text-sm">({product.reviews} reseñas)</span>
        </div>
        <p className="text-3xl font-bold text-[#4A1518] dark:text-[#FFD700]">
          ${product.price.toLocaleString('es-CO')} COP
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {product.description}
        </p>

        {/* Size and Color Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Talla
            </label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una talla" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color
            </label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un color" />
              </SelectTrigger>
              <SelectContent>
                {product.colors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-md">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Disminuir cantidad"
            >
              -
            </Button>
            <span className="px-4 text-lg font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Aumentar cantidad"
            >
              +
            </Button>
          </div>
          <Button
            className="flex-1 bg-[#4A1518] hover:bg-[#6B1E22] text-white py-3 text-lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Añadir al Carrito
          </Button>
        </div>

        {/* Product Details List */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Detalles del Producto</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Material: 100% Algodón Premium</li>
            <li>Corte: {product.category === 'Camisetas' ? 'Oversized' : 'Regular'}</li>
            <li>Estampado: Serigrafía de alta durabilidad</li>
            <li>Instrucciones de cuidado: Lavar a máquina en frío, no usar blanqueador, secar a baja temperatura.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
