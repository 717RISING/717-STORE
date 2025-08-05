"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/products"
import { ShoppingBag } from "lucide-react"
import Image from "next/image"

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
        <CardTitle className="text-white flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-[#5D1A1D]" />
          Resumen del Pedido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-3">
          {state.items.map((item) => (
            <div key={item.productId} className="flex items-center space-x-3">
              <div className="relative w-12 h-12 bg-gray-800 rounded-lg overflow-hidden">
                <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{item.name}</p>
                <p className="text-gray-400 text-xs">
                  Talla: {item.size} • Cantidad: {item.quantity}
                </p>
              </div>
              <p className="text-white text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <Separator className="bg-gray-700" />

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-gray-300">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Envío</span>
            <span>{shipping === 0 ? "GRATIS" : formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>IVA (19%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <Separator className="bg-gray-700" />
          <div className="flex justify-between text-white text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-gray-800 p-3 rounded-lg">
          <h4 className="text-white text-sm font-semibold mb-2">Información de Envío</h4>
          <div className="text-gray-300 text-xs space-y-1">
            <p>• Medellín: 2-3 días hábiles</p>
            <p>• Ciudades principales: 3-5 días hábiles</p>
            <p>• Resto del país: 5-7 días hábiles</p>
            <p className="text-[#5D1A1D] font-semibold">• Envío GRATIS en pedidos sobre {formatPrice(300000)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
