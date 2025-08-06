"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Star, Heart, ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useToast } from '@/hooks/use-toast'
import { Product } from '@/lib/types' // Assuming you have a types file for Product

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      toast({
        title: "Selecciona una talla",
        description: "Por favor, elige una talla antes de añadir al carrito.",
        variant: "destructive",
      })
      return
    }
    addToCart({ ...product, quantity, selectedSize })
    toast({
      title: "Añadido al carrito",
      description: `${quantity} x ${product.name} (${selectedSize || 'N/A'}) ha sido añadido a tu carrito.`,
      variant: "default",
    })
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
      <div className="grid gap-4">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={600}
          height={600}
          className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
        />
        {/* You can add a gallery of smaller images here if product has multiple images */}
        {/* <div className="grid grid-cols-4 gap-2">
          <Image
            src="/placeholder.svg"
            alt="Product image"
            width={150}
            height={150}
            className="aspect-square object-cover rounded-lg overflow-hidden"
          />
        </div> */}
      </div>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < product.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-700'}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews} reseñas)</span>
          </div>
          <p className="text-4xl font-bold mt-4">${product.price.toFixed(2)}</p>
        </div>
        <Separator />
        <div className="grid gap-4">
          {product.sizes && product.sizes.length > 0 && (
            <div className="grid gap-2">
              <Label htmlFor="size">Talla</Label>
              <Select onValueChange={setSelectedSize} value={selectedSize}>
                <SelectTrigger id="size" className="w-[180px]">
                  <SelectValue placeholder="Selecciona una talla" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="quantity">Cantidad</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-[100px]"
            />
          </div>
          <div className="flex gap-4">
            <Button size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Añadir al Carrito
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="mr-2 h-5 w-5" /> Añadir a Lista de Deseos
            </Button>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-bold mb-2">Descripción</h3>
          <p className="text-muted-foreground">{product.description}</p>
        </div>
        {product.details && (
          <div>
            <h3 className="text-lg font-bold mb-2">Detalles del Producto</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
