"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { OrderSummary } from '@/components/checkout/order-summary'
import { useCart } from '@/lib/cart-context'
import { CheckoutLoader } from '@/components/loaders/checkout-loader'

export default function CheckoutConfirmationPage() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const orderId = searchParams.get('orderId')
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<any>(null) // Replace 'any' with your Order type
  const { clearCart } = useCart()

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId) {
        // Simulate API call to fetch order details
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay
        const mockOrder = {
          id: orderId,
          items: [
            { id: 'prod1', name: 'Camiseta Oversized', price: 35.00, quantity: 1, image: '/products/camisetas/oversized-tee.png' },
            { id: 'prod2', name: 'Graphic Tee "Blood"', price: 40.00, quantity: 1, image: '/products/camisetas/graphic-tee-blood.png' },
          ],
          subtotal: 75.00,
          shipping: 5.00,
          total: 80.00,
          status: status === 'success' ? 'Completado' : 'Fallido',
          shippingAddress: {
            name: 'Juan Pérez',
            address: 'Calle Falsa 123',
            city: 'Springfield',
            zip: '12345',
            country: 'USA',
          },
          paymentMethod: 'Tarjeta de Crédito',
        }
        setOrder(mockOrder)
        setLoading(false)
        if (status === 'success') {
          clearCart() // Clear cart only on successful order
        }
      } else {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId, status, clearCart])

  if (loading) {
    return <CheckoutLoader />
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))] flex items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          {status === 'success' ? (
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          ) : (
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
          )}
          <CardTitle className="mt-4 text-2xl">
            {status === 'success' ? '¡Pedido Confirmado!' : 'Error en el Pedido'}
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            {status === 'success'
              ? `Gracias por tu compra. Tu pedido #${orderId} ha sido procesado exitosamente.`
              : `Hubo un problema al procesar tu pedido #${orderId}. Por favor, inténtalo de nuevo.`}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {order && (
            <>
              <OrderSummary order={order} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Dirección de Envío</h3>
                  <p>{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Método de Pago</h3>
                  <p>{order.paymentMethod}</p>
                </div>
              </div>
            </>
          )}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button asChild>
              <Link href="/productos">Continuar Comprando</Link>
            </Button>
            {status !== 'success' && (
              <Button variant="outline" asChild>
                <Link href="/checkout">Reintentar Pago</Link>
              </Button>
            )}
            <Button variant="ghost" asChild>
              <Link href="/cuenta/pedidos">Ver Mis Pedidos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
