"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { formatPrice } from "@/lib/products" // Assuming this utility exists

interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  size?: string
  color?: string
}

interface OrderSummaryProps {
  subtotal: number
  shipping: number
  tax: number
  total: number
  cartItems?: CartItem[] // Optional: to display items in summary
}

export default function OrderSummary({ subtotal, shipping, tax, total, cartItems }: OrderSummaryProps) {
  return (
    <Card className="shadow-lg bg-gray-800 border-gray-700 text-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold text-[#5D1A1D]">Resumen del Pedido</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {cartItems && cartItems.length > 0 && (
          <div className="mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {cartItems.map((item) => (
              <div key={item.productId + item.size + item.color} className="flex items-center mb-4 last:mb-0">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover mr-4"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-100">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    Cantidad: {item.quantity} {item.size && `| Talla: ${item.size}`}
                  </p>
                </div>
                <p className="font-semibold text-gray-100">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2 border-t border-gray-700 pt-4">
          <div className="flex justify-between text-gray-300">
            <span>Subtotal:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Envío:</span>
            <span>{formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Impuestos (IVA 19%):</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-[#5D1A1D] border-t border-gray-700 pt-4 mt-4">
            <span>Total:</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
