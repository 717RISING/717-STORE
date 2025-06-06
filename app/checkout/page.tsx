"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { createOrder, calculateOrderTotals } from "@/lib/orders"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Lock } from "lucide-react"
import Link from "next/link"
import ShippingForm from "@/components/checkout/shipping-form"
import PaymentForm from "@/components/checkout/payment-form"
import OrderSummary from "@/components/checkout/order-summary"

export default function CheckoutPage() {
  const router = useRouter()
  const { state, dispatch } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true)

  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const [billingData, setBillingData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const [paymentData, setPaymentData] = useState({
    method: "card" as const,
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  // Calcular totales
  const { subtotal, shipping, tax, total } = calculateOrderTotals(state.items)

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (state.items.length === 0) {
      router.push("/productos")
    }
  }, [state.items, router])

  const handleBillingSameAsShipping = (same: boolean) => {
    setBillingSameAsShipping(same)
    if (same) {
      setBillingData({
        firstName: shippingData.firstName,
        lastName: shippingData.lastName,
        address: shippingData.address,
        city: shippingData.city,
        state: shippingData.state,
        zipCode: shippingData.zipCode,
        country: shippingData.country,
      })
    }
  }

  const validateForm = () => {
    // Validar datos de envío
    const requiredShippingFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
      "country",
    ]
    for (const field of requiredShippingFields) {
      if (!shippingData[field as keyof typeof shippingData]) {
        alert(`Por favor completa el campo: ${field}`)
        return false
      }
    }

    // Validar datos de pago si es tarjeta
    if (paymentData.method === "card") {
      const requiredPaymentFields = ["cardNumber", "expiryDate", "cvv", "cardName"]
      for (const field of requiredPaymentFields) {
        if (!paymentData[field as keyof typeof paymentData]) {
          alert(`Por favor completa el campo de pago: ${field}`)
          return false
        }
      }
    }

    return true
  }

  const handleSubmitOrder = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simular procesamiento del pedido
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const orderData = {
        items: state.items,
        shipping: shippingData,
        billing: billingSameAsShipping
          ? {
              firstName: shippingData.firstName,
              lastName: shippingData.lastName,
              address: shippingData.address,
              city: shippingData.city,
              state: shippingData.state,
              zipCode: shippingData.zipCode,
              country: shippingData.country,
            }
          : billingData,
        payment: paymentData,
        subtotal,
        shipping,
        tax,
        total,
      }

      const order = createOrder(orderData)

      // Limpiar carrito
      dispatch({ type: "CLEAR_CART" })

      // Redirigir a página de confirmación
      router.push(`/checkout/confirmacion?orderId=${order.id}`)
    } catch (error) {
      alert("Error al procesar el pedido. Por favor intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  if (state.items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/productos">
            <Button variant="ghost" className="text-white hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a la tienda
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#5D1A1D]" />
            <h1 className="text-3xl font-bold">Checkout Seguro</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formularios */}
          <div className="lg:col-span-2 space-y-6">
            <ShippingForm
              data={shippingData}
              onChange={setShippingData}
              onBillingSameAsShipping={handleBillingSameAsShipping}
            />

            {!billingSameAsShipping && (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-white text-lg font-semibold mb-4">Dirección de Facturación</h3>
                  {/* Aquí iría un formulario similar al de envío para facturación */}
                </CardContent>
              </Card>
            )}

            <PaymentForm data={paymentData} onChange={setPaymentData} />
          </div>

          {/* Resumen del pedido */}
          <div className="space-y-6">
            <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total} />

            <Button
              onClick={handleSubmitOrder}
              disabled={isLoading}
              className="w-full bg-[#5D1A1D] hover:bg-[#6B1E22] text-white py-3 text-lg font-semibold"
            >
              {isLoading ? "Procesando..." : `Finalizar Pedido - $${total.toFixed(2)}`}
            </Button>

            <div className="text-center text-xs text-gray-400">
              <p>Al realizar el pedido, aceptas nuestros</p>
              <p>
                <Link href="/terminos" className="text-[#5D1A1D] hover:underline">
                  Términos y Condiciones
                </Link>
                {" y "}
                <Link href="/privacidad" className="text-[#5D1A1D] hover:underline">
                  Política de Privacidad
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
