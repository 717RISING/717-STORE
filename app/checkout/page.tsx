'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShippingForm } from "@/components/checkout/shipping-form"
import { PaymentForm } from "@/components/checkout/payment-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import { addOrder } from "@/lib/database"
import { toast } from "sonner"
import { Order } from "@/lib/orders"
import { useAuth } from "@/lib/auth-context"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [shippingDetails, setShippingDetails] = useState<any>(null)
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const handleShippingSubmit = (data: any) => {
    setShippingDetails(data)
    setStep(2)
  }

  const handlePaymentSubmit = async (data: any) => {
    setPaymentDetails(data)

    if (!user) {
      toast.error("Debes iniciar sesión para completar el pedido.")
      router.push("/login")
      return
    }

    try {
      const newOrder: Omit<Order, 'id' | 'created_at'> = {
        userId: user.id,
        items: cartItems.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          size: item.size,
          color: item.color,
        })),
        total: cartTotal,
        status: "Pendiente", // Initial status
        shippingAddress: shippingDetails,
        paymentMethod: data.paymentMethod,
      }

      const addedOrder = await addOrder(newOrder)

      if (addedOrder) {
        toast.success("Pedido realizado con éxito!")
        clearCart()
        router.push(`/checkout/confirmacion?orderId=${addedOrder.id}`)
      } else {
        toast.error("Error al procesar el pedido. Inténtalo de nuevo.")
      }
    } catch (error) {
      console.error("Error during checkout:", error)
      toast.error("Ocurrió un error inesperado al procesar tu pedido.")
    }
  }

  if (cartItems.length === 0 && step === 1) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-600 mb-8">Añade algunos productos para continuar con la compra.</p>
        <Button onClick={() => router.push("/productos")}>Ir a la tienda</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Paso 1: Información de Envío</CardTitle>
          </CardHeader>
          <CardContent>
            <ShippingForm onSubmit={handleShippingSubmit} initialData={shippingDetails} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paso 2: Pago</CardTitle>
          </CardHeader>
          <CardContent>
            {step >= 2 ? (
              <PaymentForm onSubmit={handlePaymentSubmit} initialData={paymentDetails} />
            ) : (
              <p className="text-gray-500">Completa la información de envío para continuar.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />
      </div>
    </div>
  )
}
