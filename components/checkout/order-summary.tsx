"use client"

import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface OrderSummaryProps {
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export default function OrderSummary({ subtotal, shipping, tax, total }: OrderSummaryProps) {
  const { state } = useCart()

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Resumen del Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items del carrito */}
        <div className="space-y-3">
          {state.items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex items-center gap-3">
              <div className="w-12 h-12 relative">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-gray-400 text-xs">
                  Talla: {item.size} • Cantidad: {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <Separator className="bg-gray-800" />

        {/* Totales */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Envío:</span>
            <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Impuestos:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator className="bg-gray-800" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span className="text-[#5D1A1D]">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Información adicional */}
        <div className="text-xs text-gray-400 space-y-1">
          <p>• Envío gratis en pedidos superiores a $100</p>
          <p>• Tiempo de entrega: 3-5 días hábiles</p>
          <p>• Garantía de devolución de 30 días</p>
        </div>
      </CardContent>
    </Card>
  )
}
