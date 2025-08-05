"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Minus, Plus } from "lucide-react"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-gray-900 text-white flex flex-col">
        <SheetHeader className="border-b border-gray-800 pb-4">
          <SheetTitle className="text-2xl font-bold text-white">Tu Carrito</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-6 space-y-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-400">
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-white">{item.name}</h3>
                  <p className="text-sm text-gray-400">
                    Talla: {item.size} {item.color && `| Color: ${item.color}`}
                  </p>
                  <p className="text-base font-medium text-white">${item.price.toLocaleString()}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1, item.color)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-white font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1, item.color)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:bg-gray-800 ml-auto"
                      onClick={() => removeFromCart(item.id, item.size, item.color)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-gray-800 pt-6 space-y-4">
          <div className="flex justify-between text-xl font-bold text-white">
            <span>Total:</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
          <Button asChild className="w-full bg-[#5D1A1D] text-white hover:bg-[#6B1E22] text-lg py-6">
            <Link href="/checkout" onClick={onClose}>
              Proceder al Pago
            </Link>
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-700 text-white hover:bg-gray-800 bg-transparent"
            onClick={onClose}
          >
            Continuar Comprando
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
