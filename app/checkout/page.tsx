"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { createOrder } from "@/lib/orders"
import type { OrderItem, ShippingInfo, PaymentInfo } from "@/lib/database"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShippingForm } from "@/components/checkout/shipping-form"
import { PaymentForm } from "@/components/checkout/payment-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { toast } from "@/hooks/use-toast"
import { AdaptiveLoader } from "@/components/loaders/adaptive-loader"
import { useMobileDetection } from "@/hooks/use-mobile-detection"

export default function CheckoutPage() {
  const { cartItems, calculateTotal, clearCart } = useCart()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("shipping")
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const { isMobile } = useMobileDetection()

  useEffect(() => {
    if (cartItems.length === 0 && !isProcessing) {
      router.push("/productos")
      toast({
        title: "Tu carrito está vacío",
        description: "Por favor, añade productos antes de proceder al pago.",
        variant: "destructive",
      })
    }
  }, [cartItems, router, isProcessing])

  const handleShippingSubmit = (data: ShippingInfo) => {
    setShippingInfo(data)
    setActiveTab("payment")
  }

  const handlePaymentSubmit = (data: PaymentInfo) => {
    setPaymentInfo(data)
    // Proceed to place order
    handlePlaceOrder(data)
  }

  const handlePlaceOrder = async (paymentData: PaymentInfo) => {
    if (!shippingInfo || cartItems.length === 0) {
      toast({
        title: "Error en el pedido",
        description: "Faltan detalles de envío o productos en el carrito.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    const orderItems: OrderItem[] = cartItems.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      imageUrl: item.image,
    }))

    const { subtotal, tax, shippingCost, total } = calculateTotal()

    try {
      const newOrder = await createOrder({
        customerEmail: shippingInfo.email,
        items: orderItems,
        subtotal: subtotal,
        tax: tax,
        shipping: {
          ...shippingInfo,
          cost: shippingCost,
        },
        payment: paymentData,
        status: "Pendiente", // Initial status
      })

      clearCart()
      toast({
        title: "¡Pedido realizado con éxito!",
        description: `Tu pedido #${newOrder.id} ha sido confirmado.`,
        variant: "success",
      })
      router.push(`/checkout/confirmacion?orderId=${newOrder.id}`)
    } catch (error) {
      console.error("Error al crear el pedido:", error)
      toast({
        title: "Error al procesar el pedido",
        description: "Hubo un problema al finalizar tu compra. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (cartItems.length === 0 && !isProcessing) {
    return null // Redirect handled by useEffect
  }

  if (isProcessing) {
    return <AdaptiveLoader type={isMobile ? "mobile-checkout" : "checkout"} />
  }

  const { subtotal, tax, shippingCost, total } = calculateTotal()

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 min-h-[calc(100vh-100px)]">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        Finalizar Compra
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="shipping" className="data-[state=active]:bg-[#5D1A1D] data-[state=active]:text-white">
                1. Envío
              </TabsTrigger>
              <TabsTrigger
                value="payment"
                className="data-[state=active]:bg-[#5D1A1D] data-[state=active]:text-white"
                disabled={!shippingInfo}
              >
                2. Pago
              </TabsTrigger>
            </TabsList>

            <TabsContent value="shipping">
              <Card className="shadow-lg">
                <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Información de Envío
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ShippingForm onSubmit={handleShippingSubmit} initialData={shippingInfo || undefined} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card className="shadow-lg">
                <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    Información de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <PaymentForm onSubmit={handlePaymentSubmit} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <OrderSummary
            items={cartItems}
            subtotal={subtotal}
            tax={tax}
            shippingCost={shippingCost}
            total={total}
            onPlaceOrder={() => handlePlaceOrder(paymentInfo!)} // This button is now handled by PaymentForm
            isPlaceOrderDisabled={!shippingInfo || !paymentInfo || isProcessing}
          />
        </div>
      </div>
    </div>
  )
}
