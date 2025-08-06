"use client"

import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/products"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { submitOrder } from "@/app/actions" // Import the server action
import { useFormStatus, useFormState } from "react-dom"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white py-3 text-lg" disabled={pending}>
      {pending ? "Procesando..." : "Realizar Pedido"}
    </Button>
  )
}

export default function OrderSummary() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  // Initial state for useFormState
  const initialState = {
    success: false,
    message: "",
    orderId: "",
  }

  const [state, formAction] = useFormState(submitOrder, initialState)

  useEffect(() => {
    if (state.success) {
      toast({
        title: "¡Pedido Confirmado!",
        description: state.message,
        variant: "success",
      })
      clearCart() // Clear cart after successful order
      router.push(`/checkout/confirmacion?orderId=${state.orderId}`)
    } else if (state.message && !state.success) {
      toast({
        title: "Error al Procesar Pedido",
        description: state.message,
        variant: "destructive",
      })
    }
  }, [state, router, clearCart, toast])

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p className="text-lg font-semibold mb-2">Tu carrito está vacío.</p>
        <p className="text-sm">Añade algunos productos para ver el resumen de tu pedido.</p>
        <Button onClick={() => router.push("/productos")} className="mt-4 bg-[#4A1518] hover:bg-[#6B1E22] text-white">
          Ir a Comprar
        </Button>
      </div>
    )
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="cartItems" value={JSON.stringify(cartItems)} />
      <input type="hidden" name="totalAmount" value={cartTotal.toFixed(2)} />
      {/* These hidden inputs will be populated by the ShippingForm and PaymentForm */}
      <input type="hidden" name="name" id="hidden-name" />
      <input type="hidden" name="email" id="hidden-email" />
      <input type="hidden" name="address" id="hidden-address" />
      <input type="hidden" name="city" id="hidden-city" />
      <input type="hidden" name="zip" id="hidden-zip" />
      <input type="hidden" name="country" id="hidden-country" />
      <input type="hidden" name="paymentMethod" id="hidden-payment-method" />

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id + item.size} className="flex items-center gap-4">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={64}
              height={64}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Talla: {item.size} | Cantidad: {item.quantity}
              </p>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

      <div className="space-y-2 text-gray-700 dark:text-gray-300">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Envío:</span>
          <span>{formatPrice(0)}</span> {/* Assuming free shipping for now */}
        </div>
        <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
          <span>Total:</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
      </div>

      <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

      <SubmitButton />
    </form>
  )
}
