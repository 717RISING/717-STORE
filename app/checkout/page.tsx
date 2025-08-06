'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShippingForm } from '@/components/checkout/shipping-form'
import { PaymentForm } from '@/components/checkout/payment-form'
import { OrderSummary } from '@/components/checkout/order-summary'
import { useCart } from '@/lib/cart-context'
import { useRouter } from 'next/navigation'
import { createOrder } from '@/lib/database' // Assuming createOrder is in lib/database
import { toast } from 'sonner'
import { ShippingAddress, PaymentDetails, OrderItem } from '@/lib/types'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  const [isProcessingOrder, setIsProcessingOrder] = useState(false)

  const handleShippingSubmit = (data: ShippingAddress) => {
    setShippingAddress(data)
    setCurrentStep(2)
  }

  const handlePaymentSubmit = async (data: PaymentDetails) => {
    setPaymentDetails(data)
    setIsProcessingOrder(true)

    if (!user?.id) {
      toast.error('Debes iniciar sesión para completar el pedido.')
      setIsProcessingOrder(false)
      router.push('/login?redirect=/checkout')
      return
    }

    if (cartItems.length === 0) {
      toast.error('Tu carrito está vacío. No se puede procesar el pedido.')
      setIsProcessingOrder(false)
      router.push('/productos')
      return
    }

    if (!shippingAddress) {
      toast.error('Por favor, completa la información de envío.')
      setIsProcessingOrder(false)
      setCurrentStep(1)
      return
    }

    try {
      const orderItems: OrderItem[] = cartItems.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        imageUrl: item.product.imageUrl,
        size: item.selectedSize,
        color: item.selectedColor,
      }))

      const newOrder = {
        userId: user.id,
        items: orderItems,
        total: cartTotal,
        status: 'Pendiente', // Initial status
        shippingAddress: shippingAddress,
        paymentMethod: 'Tarjeta de Crédito', // Simplified for mock
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const createdOrder = await createOrder(newOrder)

      if (createdOrder) {
        clearCart()
        toast.success('¡Pedido realizado con éxito!', {
          description: `Tu número de pedido es: ${createdOrder.id}`,
        })
        router.push(`/checkout/confirmacion?orderId=${createdOrder.id}`)
      } else {
        toast.error('Hubo un problema al procesar tu pedido. Inténtalo de nuevo.')
      }
    } catch (error) {
      console.error('Error processing order:', error)
      toast.error('Error al procesar el pedido. Por favor, inténtalo de nuevo.')
    } finally {
      setIsProcessingOrder(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Paso 1: Información de Envío</CardTitle>
            </CardHeader>
            <CardContent>
              <ShippingForm onSubmit={handleShippingSubmit} initialData={shippingAddress || undefined} />
            </CardContent>
          </Card>

          {currentStep >= 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Paso 2: Información de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentForm onSubmit={handlePaymentSubmit} initialData={paymentDetails || undefined} />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />
          {isProcessingOrder && (
            <div className="mt-4 flex items-center justify-center text-primary">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Procesando pedido...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
