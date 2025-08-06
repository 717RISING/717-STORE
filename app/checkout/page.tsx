"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import ShippingForm from "@/components/checkout/shipping-form"
import PaymentForm from "@/components/checkout/payment-form"
import OrderSummary from "@/components/checkout/order-summary"
import EnhancedButton from "@/components/enhanced-button"
import { createOrderAction } from "@/app/actions" // Importar la Server Action
import type { ShippingInfo, PaymentInfo } from "@/lib/database"
import { toast } from "sonner"
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"
import CheckoutLoader from "@/components/loaders/checkout-loader"
import MobileCheckoutLoader from "@/components/loaders/mobile/mobile-checkout-loader"
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import { Suspense } from "react"
import { Separator } from "@/components/ui/separator"

export default function CheckoutPage() {
  const { state: cartState, dispatch } = useCart()
  const router = useRouter()
  const { theme } = useTheme()
  const { isMobile } = useMobileDetection()

  const [shippingData, setShippingData] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Colombia",
    cost: 0, // Costo de envío inicial
  })

  const [paymentData, setPaymentData] = useState<PaymentInfo>({
    method: "card",
    cardDetails: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    },
  })

  const [activeTab, setActiveTab] = useState("shipping")
  const [loadingPage, setLoadingPage] = useState(true)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  // Calcular totales
  const subtotal = useMemo(() => {
    return cartState.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cartState.items])

  const shippingCost = useMemo(() => {
    return subtotal >= 300000 ? 0 : 10000 // Envío gratis para pedidos de 300.000 COP o más
  }, [subtotal])

  const taxRate = 0.19 // 19% IVA
  const tax = useMemo(() => subtotal * taxRate, [subtotal, taxRate])
  const total = useMemo(() => subtotal + shippingCost + tax, [subtotal, shippingCost, tax])

  useEffect(() => {
    // Redirigir si el carrito está vacío al cargar la página
    if (cartState.items.length === 0 && !isPlacingOrder) {
      router.push("/productos")
      toast.info("Tu carrito está vacío. Añade productos para continuar.")
      return
    }
    // Actualizar el costo de envío en el estado de shippingData
    setShippingData((prev) => ({ ...prev, cost: shippingCost }))
    setLoadingPage(false)
  }, [cartState.items, router, isPlacingOrder, shippingCost])

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true)

    // Validar datos de envío
    const requiredShippingFields: Array<keyof ShippingInfo> = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
    ]
    const missingShippingFields = requiredShippingFields.filter((field) => !shippingData[field])

    if (missingShippingFields.length > 0) {
      toast.error(`Por favor, completa todos los campos de envío: ${missingShippingFields.join(", ")}.`)
      setIsPlacingOrder(false)
      return
    }

    // Validar datos de pago según el método
    if (paymentData.method === "card") {
      const requiredCardFields = ["cardName", "cardNumber", "expiryDate", "cvv"]
      const missingCardFields = requiredCardFields.filter(
        (field) => !paymentData.cardDetails || !paymentData.cardDetails[field as keyof typeof paymentData.cardDetails],
      )
      if (missingCardFields.length > 0) {
        toast.error(`Por favor, completa todos los campos de la tarjeta: ${missingCardFields.join(", ")}.`)
        setIsPlacingOrder(false)
        return
      }
      // Aquí podrías añadir validaciones más robustas para tarjeta (regex, Luhn algorithm, etc.)
    }

    try {
      // Llamar a la Server Action para crear el pedido
      const newOrder = await createOrderAction(
        cartState.items.map((item) => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          imageUrl: item.imageUrl,
          size: item.size,
          color: item.color,
        })),
        shippingData,
        total,
        shippingData.email, // Usar el email del formulario de envío como customerEmail
      )

      if (newOrder) {
        dispatch({ type: "CLEAR_CART" }) // Limpiar el carrito después de la compra exitosa
        toast.success("¡Pedido realizado con éxito! Redirigiendo a la confirmación...")
        router.push(`/checkout/confirmacion?orderId=${newOrder.id}&status=success`)
      } else {
        toast.error("Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.")
        router.push(`/checkout/confirmacion?status=failed`)
      }
    } catch (error) {
      console.error("Error durante el proceso de compra:", error)
      toast.error("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.")
      router.push(`/checkout/confirmacion?status=failed`)
    } finally {
      setIsPlacingOrder(false)
    }
  }

  if (loadingPage || (cartState.items.length === 0 && !isPlacingOrder)) {
    return isMobile ? <MobileCheckoutLoader /> : <CheckoutLoader />
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Finalizar Compra</h1>

      <Suspense fallback={<CheckoutLoader />}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Información de Envío
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ShippingForm data={shippingData} onChange={setShippingData} />
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Información de Pago
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentForm data={paymentData} onChange={setPaymentData} isLoading={isPlacingOrder} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700 sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderSummary subtotal={subtotal} shipping={shippingCost} tax={tax} total={total} cartItems={cartState.items} />
                <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
                <div className="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-white">
                  <span>Total:</span>
                  <span>{new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(total)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Suspense>
    </div>
  )
}
