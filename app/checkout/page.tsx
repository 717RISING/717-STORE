"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import ShippingForm from "@/components/checkout/shipping-form"
import PaymentForm from "@/components/checkout/payment-form"
import OrderSummary from "@/components/checkout/order-summary"
import EnhancedButton from "@/components/enhanced-button"
import { createOrder } from "@/lib/orders"
import type { CartItem, ShippingInfo, PaymentInfo } from "@/lib/database"
import { formatPrice } from "@/lib/products"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function CheckoutPage() {
  const { state: cartState, dispatch } = useCart()
  const router = useRouter()

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
    cost: 0, // Default shipping cost
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

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true)
  const [loading, setLoading] = useState(false)

  const subtotal = cartState.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = subtotal >= 300000 ? 0 : 10000 // Envío gratis para pedidos de 300.000 COP o más
  const taxRate = 0.19 // 19% IVA
  const tax = subtotal * taxRate
  const total = subtotal + shippingCost + tax

  useEffect(() => {
    // Update shipping cost in shippingData when subtotal changes
    setShippingData((prev) => ({ ...prev, cost: shippingCost }))
  }, [shippingCost])

  const handlePlaceOrder = async () => {
    setLoading(true)

    // Validar que el carrito no esté vacío
    if (cartState.items.length === 0) {
      toast.error("Tu carrito está vacío. Por favor, añade productos antes de continuar.")
      setLoading(false)
      return
    }

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
      setLoading(false)
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
        setLoading(false)
        return
      }
    }
    // Aquí podrías añadir validaciones para PayPal o Transferencia Bancaria si fueran necesarias

    try {
      // Simular el procesamiento del pago
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simula un retraso de 2 segundos

      // Crear el pedido en la "base de datos"
      const orderItems: CartItem[] = cartState.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        imageUrl: item.imageUrl,
        size: item.size,
        color: item.color,
      }))

      const newOrder = await createOrder(orderItems, shippingData, total, shippingData.email)

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
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 bg-gray-950 text-white min-h-[calc(100vh-100px)]">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-[#5D1A1D]">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping and Payment Forms */}
        <div className="lg:col-span-2 space-y-8">
          <ShippingForm
            data={shippingData}
            onChange={setShippingData}
            onBillingSameAsShipping={setBillingSameAsShipping}
          />
          <PaymentForm data={paymentData} onChange={setPaymentData} />
        </div>

        {/* Order Summary and Place Order Button */}
        <div className="lg:col-span-1 space-y-8">
          <OrderSummary subtotal={subtotal} shipping={shippingCost} tax={tax} total={total} />
          <EnhancedButton
            onClick={handlePlaceOrder}
            className="w-full py-3 text-lg font-semibold"
            variant="modern"
            loading={loading}
            disabled={loading || cartState.items.length === 0}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Procesando...
              </>
            ) : (
              `Pagar ${formatPrice(total)}`
            )}
          </EnhancedButton>
        </div>
      </div>
    </div>
  )
}
