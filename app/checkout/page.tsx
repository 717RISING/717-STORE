'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ShippingForm from '@/components/checkout/shipping-form'
import PaymentForm from '@/components/checkout/payment-form'
import OrderSummary from '@/components/checkout/order-summary'
import { useCart } from '@/lib/cart-context'
import { submitOrder } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const [activeTab, setActiveTab] = useState('shipping')
  const [shippingData, setShippingData] = useState<any>(null)
  const [paymentData, setPaymentData] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { cartItems, cartTotal, clearCart } = useCart()
  const router = useRouter()

  const handleShippingSubmit = (data: any) => {
    setShippingData(data)
    setActiveTab('payment')
  }

  const handlePaymentSubmit = (data: any) => {
    setPaymentData(data)
    setActiveTab('summary')
  }

  const handleSubmitOrder = async () => {
    if (!shippingData || !paymentData || cartItems.length === 0) {
      alert('Por favor, completa todos los pasos del checkout y asegúrate de tener artículos en el carrito.')
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('name', shippingData.name)
    formData.append('email', shippingData.email)
    formData.append('address', shippingData.address)
    formData.append('city', shippingData.city)
    formData.append('zip', shippingData.zip)
    formData.append('country', shippingData.country)
    formData.append('paymentMethod', paymentData.paymentMethod)
    formData.append('cartItems', JSON.stringify(cartItems))

    const result = await submitOrder(formData)

    setIsSubmitting(false)

    if (result.success) {
      clearCart()
      router.push(`/checkout/confirmacion?orderId=${result.orderId}`)
    } else {
      alert(`Error al procesar el pedido: ${result.message}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 gap-2 mb-6 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <TabsTrigger value="shipping" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
                1. Envío
              </TabsTrigger>
              <TabsTrigger value="payment" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white" disabled={!shippingData}>
                2. Pago
              </TabsTrigger>
              <TabsTrigger value="summary" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white" disabled={!paymentData}>
                3. Resumen
              </TabsTrigger>
            </TabsList>

            <TabsContent value="shipping">
              <ShippingForm onSubmit={handleShippingSubmit} initialData={shippingData} />
            </TabsContent>
            <TabsContent value="payment">
              <PaymentForm onSubmit={handlePaymentSubmit} initialData={paymentData} />
            </TabsContent>
            <TabsContent value="summary">
              <OrderSummary shippingData={shippingData} paymentData={paymentData} cartItems={cartItems} cartTotal={cartTotal} />
              <Button
                onClick={handleSubmitOrder}
                className="w-full mt-6 bg-[#4A1518] hover:bg-[#6B1E22] text-white py-3 text-lg font-semibold"
                disabled={isSubmitting || cartItems.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando Pedido...
                  </>
                ) : (
                  'Confirmar Pedido'
                )}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
