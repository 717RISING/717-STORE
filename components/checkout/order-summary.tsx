import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { Product } from '@/lib/types' // Assuming you have a types file for Product

interface CartItem extends Product {
  quantity: number
  selectedSize?: string
}

interface OrderSummaryProps {
  cartItems: CartItem[]
  cartTotal: number
  shippingCost: number
  order?: { // Optional order details for confirmation page
    id: string
    items: CartItem[]
    subtotal: number
    shipping: number
    total: number
    status: string
  }
}

export function OrderSummary({ cartItems, cartTotal, shippingCost, order }: OrderSummaryProps) {
  const itemsToDisplay = order ? order.items : cartItems
  const subtotal = order ? order.subtotal : cartTotal
  const total = order ? order.total : cartTotal + shippingCost

  return (
    <Card>
      <CardHeader>
        <CardTitle>{order ? `Resumen del Pedido #${order.id}` : 'Resumen de tu Compra'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {itemsToDisplay.map(item => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src={item
