"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"

interface OrderSummaryProps {
  shippingCost: number
}

export default function OrderSummary({ shippingCost }: OrderSummaryProps) {
  const { cart, totalPrice } = useCart()

  const subtotal = totalPrice
  const taxRate = 0.08 // 8% de impuesto
  const tax = subtotal * taxRate
  const total = subtotal + shippingCost + tax

  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Resumen del Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center">Tu carrito está vacío.</p>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-400">
                      Cantidad: {item.quantity} {item.size && `| Talla: ${item.size}`}
                      {item.color && `| Color: ${item.color}`}
                    </p>
                  </div>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>

        <Separator className="bg-gray-700" />

        <div className="space-y-2">
          <div className="flex justify-between text-gray-300">
            <span>Subtotal:</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Envío:</span>
            <span>${shippingCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Impuestos (8%):</span>
            <span>${tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-white border-t border-gray-700 pt-2 mt-2">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
