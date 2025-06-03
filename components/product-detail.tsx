"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Plus, Minus, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { dispatch } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Selecciona una talla",
        description: "Por favor selecciona una talla antes de agregar al carrito.",
        variant: "destructive",
      })
      return
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${product.id}-${selectedSize}`,
        name: product.name,
        price: product.price,
        size: selectedSize,
        quantity,
        image: product.images[0],
      },
    })

    toast({
      title: "Producto agregado",
      description: `${product.name} (${selectedSize}) agregado al carrito.`,
    })
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="px-4 py-6 bg-transparent border-b border-gray-800">
        <nav className="max-w-7xl mx-auto">
          {/* Top Row - Icons Only */}
          <div className="flex justify-end items-center mb-4">
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-white hover:text-gray-300 transition-colors">
                <User className="w-6 h-6" />
              </Link>
              <CartSidebar />
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center">
              <div className="w-16 h-16 relative">
                <Image
                  src="/logo.png"
                  alt="717 Logo"
                  width={64}
                  height={64}
                  className="object-contain filter invert"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Bottom Row - Navigation Links */}
          <div className="flex justify-center">
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-gray-300 transition-colors font-medium">
                INICIO
              </Link>
              <Link href="/productos" className="text-white hover:text-gray-300 transition-colors font-medium">
                PRODUCTOS
              </Link>
              <Link href="/contacto" className="text-white hover:text-gray-300 transition-colors font-medium">
                CONTACTO
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </nav>
      </header>

      {/* Breadcrumb */}
      <div className="px-4 py-4">
        <Link href="/productos" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a productos
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.isNew && <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700">NUEVO</Badge>}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative w-20 h-20 bg-gray-900 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index ? "border-white" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-3xl font-bold text-white">${product.price}</p>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Talla</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 border rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? "border-white bg-white text-black"
                        : "border-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Cantidad</h3>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full bg-[#8B2635] text-white hover:bg-[#9A3444] font-semibold py-4 text-lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              AGREGAR AL CARRITO
            </Button>

            {/* Product Details */}
            <div className="border-t border-gray-800 pt-6 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Detalles del producto</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>• Material: 100% Algodón premium</li>
                  <li>• Cuidado: Lavar a máquina en agua fría</li>
                  <li>• Origen: Diseñado y confeccionado localmente</li>
                  <li>• Ajuste: Regular fit</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Envío y devoluciones</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>• Envío gratis en pedidos superiores a $50</li>
                  <li>• Entrega en 3-5 días hábiles</li>
                  <li>• Devoluciones gratuitas en 30 días</li>
                  <li>• Cambios de talla sin costo adicional</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
