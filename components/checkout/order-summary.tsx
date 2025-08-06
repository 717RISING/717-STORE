'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CartItem } from '@/lib/types'
import Image from 'next/image'

interface OrderSummaryProps {
  cartItems: CartItem[];
  cartTotal: number;
}

export function OrderSummary({ cartItems, cartTotal }: OrderSummaryProps) {
  const shippingCost = cartTotal > 100 ? 0 : 10 // Example: Free shipping over $100
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
          {cartItems.map((item) => (
            <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={item.product.imageUrl || "/placeholder.svg"}
                  alt={item.product.name}
                  width={48}
                  height={48}
                  className="rounded-md object-cover"
                />
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Cantidad: {item.quantity}
                    {item.selectedSize && ` | Talla: ${item.selectedSize}`}
                    {item.selectedColor && ` | Color: ${item.selectedColor}`}
                  </p>
                </div>
              </div>
              <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <Separator />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío:</span>
            <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Impuestos ({taxRate * 100}%):</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
