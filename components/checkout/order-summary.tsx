'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"

interface OrderSummaryProps {
  cartItems: CartItem[];
  cartTotal: number;
}

export function OrderSummary({ cartItems, cartTotal }: OrderSummaryProps) {
  const shippingCost = cartTotal > 0 ? 5.00 : 0 // Example: $5 shipping if there are items
  const taxRate = 0.10 // 10% tax
  const taxAmount = cartTotal * taxRate
  const finalTotal = cartTotal + shippingCost + taxAmount

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen del Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Tu carrito está vacío.</p>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.product.id}-${item.size || ''}-${item.color || ''}`} className="flex items-center gap-4">
                <Image
                  src={item.product.imageUrl || "/placeholder.svg?height=64&width=64&text=Product"}
                  alt={item.product.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <p className="text-sm text-gray-500">
                    Cantidad: {item.quantity}
                    {item.size && ` | Talla: ${item.size}`}
                    {item.color && ` | Color: ${item.color}`}
                  </p>
                </div>
                <div className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Impuestos ({taxRate * 100}%)</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
