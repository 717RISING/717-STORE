"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { type Product, formatPrice } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Error",
        description: "Por favor, selecciona una talla.",
        variant: "destructive",
      })
      return
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      selectedSize: selectedSize,
      quantity: quantity,
    })
    toast({
      title: "Producto añadido",
      description: `${quantity}x ${product.name} (${selectedSize}) añadido al carrito.`,
    })
  }

  const availableStock = selectedSize ? product.stock[selectedSize] || 0 : 0

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 p-4 md:p-8 bg-gray-950 text-white min-h-[calc(100vh-100px)]">
      <div className="relative h-[400px] md:h-[550px] rounded-lg overflow-hidden shadow-lg">
        <Image
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#5D1A1D] mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-200 mb-4">{formatPrice(product.price)}</p>

          <div className="flex items-center gap-2 mb-4 text-gray-300">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm">({product.reviews} reseñas)</span>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-300 mb-1">
                Talla
              </label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger id="size" className="w-full bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Selecciona una talla" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size} disabled={product.stock[size] === 0}>
                      {size} {product.stock[size] === 0 && "(Agotado)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">
                Cantidad
              </label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={availableStock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(availableStock, Number(e.target.value))))}
                className="w-full bg-gray-800 border-gray-700 text-white"
                disabled={availableStock === 0}
              />
            </div>
          </div>

          {availableStock === 0 && (
            <p className="text-red-500 text-sm mb-4">Producto agotado en la talla seleccionada.</p>
          )}
          {availableStock > 0 && availableStock < 5 && (
            <p className="text-yellow-500 text-sm mb-4">¡Solo quedan {availableStock} unidades!</p>
          )}
        </div>

        <div className="flex gap-4 mt-8">
          <Button
            className="flex-1 bg-[#5D1A1D] hover:bg-[#4a1518] text-white py-3 text-lg font-semibold"
            onClick={handleAddToCart}
            disabled={!selectedSize || quantity <= 0 || availableStock === 0}
          >
            <ShoppingCart className="mr-2 h-5 w-5" /> Añadir al Carrito
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-[#5D1A1D] text-[#5D1A1D] hover:bg-[#5D1A1D] hover:text-white bg-transparent"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
