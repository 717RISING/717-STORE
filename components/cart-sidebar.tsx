'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/lib/cart-context'
import Image from 'next/image'
import { MinusCircle, PlusCircle, Trash2, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function CartSidebar() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, cartItemCount } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} aria-label="Abrir carrito de compras">
        <ShoppingCart className="h-5 w-5" />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center text-xs">
            {cartItemCount}
          </span>
        )}
        <span className="sr-only">Carrito de compras</span>
      </Button>
      <SheetContent side="right" className="flex flex-col w-full max-w-md">
        <SheetHeader>
          <SheetTitle>Tu Carrito ({cartItemCount})</SheetTitle>
        </SheetHeader>
        <Separator />
        <ScrollArea className="flex-1 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingCart className="h-16 w-16 mb-4" />
              <p className="text-lg">Tu carrito está vacío.</p>
              <Button variant="link" onClick={() => setIsOpen(false)} asChild>
                <Link href="/productos">Explorar productos</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`} className="flex items-center gap-4">
                  <Image
                    src={item.product.imageUrl || "/placeholder.svg?height=80&width=80&text=Product"}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1 grid gap-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.selectedSize && `Talla: ${item.selectedSize}`}
                      {item.selectedColor && ` | Color: ${item.selectedColor}`}
                    </p>
                    <p className="text-sm font-semibold">${item.product.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                        disabled={item.quantity <= 1}
                      >
                        <MinusCircle className="h-4 w-4" />
                        <span className="sr-only">Disminuir cantidad</span>
                      </Button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span className="sr-only">Aumentar cantidad</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                      aria-label="Eliminar producto del carrito"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        <Separator />
        <SheetFooter className="mt-auto pt-4 border-t">
          <div className="flex justify-between items-center w-full mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-bold">${cartTotal.toFixed(2)}</span>
          </div>
          <Button asChild className="w-full" disabled={cartItems.length === 0}>
            <Link href="/checkout" onClick={() => setIsOpen(false)}>
              Proceder al Pago
            </Link>
          </Button>
          <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
            Continuar Comprando
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
