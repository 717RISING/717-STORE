"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/products"

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()

  const handleRemoveItem = (id: string, size: string) => {
    removeFromCart(id, size)
  }

  const handleUpdateQuantity = (id: string, size: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, size, newQuantity)
    } else {
      removeFromCart(id, size)
    }
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-4 right-20 z-50 md:hidden rounded-full bg-[#4A1518] hover:bg-[#6B1E22] text-white shadow-lg"
          aria-label="Open cart"
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col bg-gray-900 text-white">
        <SheetHeader className="p-4 border-b border-gray-700 flex flex-row items-center justify-between">
          <SheetTitle className="text-white text-2xl font-bold">
            Tu Carrito ({totalItems})
          </SheetTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6 text-gray-400 hover:text-white" />
          </Button>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingCart className="w-16 h-16 mb-4" />
              <p className="text-center text-lg">Tu carrito está vacío.</p>
              <Button asChild className="mt-4 bg-[#4A1518] hover:bg-[#6B1E22] text-white">
                <Link href="/productos" onClick={() => setIsOpen(false)}>
                  Ir a Comprar
                </Link>
              </Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex items-center gap-4 border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-white">{item.name}</h3>
                  <p className="text-sm text-gray-400">Talla: {item.size}</p>
                  <p className="text-sm font-medium text-[#5D1A1D]">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                      onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-white font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                      onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto text-red-500 hover:bg-gray-700"
                      onClick={() => handleRemoveItem(item.id, item.size)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-gray-700 p-4 space-y-4">
          <div className="flex justify-between items-center text-xl font-bold text-white">
            <span>Subtotal:</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <Button asChild className="w-full bg-[#5D1A1D] hover:bg-[#4A1518] text-white py-3 text-lg">
            <Link href="/checkout" onClick={() => setIsOpen(false)}>
              Proceder al Pago
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
