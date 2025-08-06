"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { X, Trash2, MinusCircle, PlusCircle, ShoppingCart } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, cartTotal, removeFromCart, updateCartItemQuantity } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="p-4 border-b flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold">
            Tu Carrito ({cartItems.length})
          </SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close cart">
            <X className="h-5 w-5" />
          </Button>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingCart className="h-16 w-16 mb-4" />
              <p className="text-lg">Tu carrito está vacío.</p>
              <Button asChild className="mt-4 bg-[#4A1518] hover:bg-[#6B1E22] text-white">
                <Link href="/productos" onClick={onClose}>
                  Explorar Productos
                </Link>
              </Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                <div className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex-1 grid gap-1">
                  <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Talla: {item.selectedSize} | Color: {item.selectedColor}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ${item.price.toLocaleString("es-CO")} COP
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateCartItemQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateCartItemQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                      onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="p-4 border-t space-y-4">
            <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
              <span>Subtotal:</span>
              <span>${cartTotal.toLocaleString("es-CO")} COP</span>
            </div>
            <Button asChild className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white text-lg py-3" onClick={onClose}>
              <Link href="/checkout">Proceder al Pago</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
