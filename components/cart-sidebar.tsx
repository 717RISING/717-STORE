"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Plus, Minus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { state, dispatch } = useCart()

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)

  function updateQuantity(id: string, size: string, qty: number) {
    if (qty <= 0) {
      dispatch({ type: "REMOVE_ITEM", payload: id })
      return
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: qty } })
  }

  function removeFromCart(id: string) {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white hover:text-gray-300">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="bg-black text-white border-gray-800 w-full sm:max-w-md">
        <SheetHeader className="border-b border-gray-800 pb-4">
          <SheetTitle className="text-white">Carrito de compras</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full pt-4">
          {state.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <ShoppingCart className="w-16 h-16 text-gray-600" />
              <p className="text-gray-400">Tu carrito está vacío</p>
              <Link href="/productos" onClick={() => setIsOpen(false)}>
                <Button className="bg-[#5D1A1D] hover:bg-[#6B1E22]">Ver productos</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* LISTADO DE PRODUCTOS */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {state.items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex items-center space-x-3 p-3 bg-gray-900 rounded-lg"
                  >
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-400">Talla: {item.size}</p>
                      <p className="text-sm font-medium">${item.price}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-white hover:bg-gray-800"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-white hover:bg-gray-800"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-red-400 hover:bg-red-900/20"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* RESUMEN */}
              <div className="border-t border-gray-800 pt-4 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
                <Link href="/checkout" onClick={() => setIsOpen(false)} className="block">
                  <Button className="w-full bg-[#5D1A1D] hover:bg-[#6B1E22]">Proceder al pago</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
