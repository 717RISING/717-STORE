"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getOrderById, type Order } from "@/lib/orders"
import Link from "next/link"
import CheckoutLoader from "@/components/loaders/checkout-loader"
import MobileCheckoutLoader from "@/components/loaders/mobile/mobile-checkout-loader"
import AdaptiveLoader from "@/components/loaders/adaptive-loader"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrderDetails() {
      if (orderId) {
        try {
          setLoading(true)
          const fetchedOrder = await getOrderById(orderId)
          if (fetchedOrder) {
            setOrder(fetchedOrder)
          } else {
            setError("Pedido no encontrado.")
          }
        } catch (err) {
          console.error("Error fetching order:", err)
          setError("Hubo un error al cargar los detalles del pedido.")
        } finally {
          setLoading(false)
        }
      } else {
        setError("ID de pedido no proporcionado.")
        setLoading(false)
      }
    }
    fetchOrderDetails()
  }, [orderId])

  if (loading) {
    return <AdaptiveLoader desktopLoader={CheckoutLoader} mobileLoader={MobileCheckoutLoader} />
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-black p-4 text-white">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800 text-center">
          <CardHeader>
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
            <CardTitle className="text-2xl font-bold text-white">Error en el Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">{error}</p>
            <Button asChild className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">
              <Link href="/">Volver a la Tienda</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-black p-4 text-white">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800 text-center">
          <CardHeader>
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
            <CardTitle className="text-2xl font-bold text-white">Pedido No Disponible</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">No se pudo cargar la información del pedido.</p>
            <Button asChild className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">
              <Link href="/">Volver a la Tienda</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-black p-4 text-white">
      <Card className="w-full max-w-2xl bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <CardTitle className="text-3xl font-bold text-white">¡Gracias por tu compra!</CardTitle>
          <p className="text-gray-300">Tu pedido ha sido confirmado.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-200">ID del Pedido:</p>
            <p className="text-2xl font-bold text-[#5D1A1D]">{order.id}</p>
            <p className="text-gray-400 mt-2">
              Recibirás una confirmación en tu correo electrónico:
              <br />
              <span className="font-medium text-white">{order.customerEmail}</span>
            </p>
          </div>

          <div className="border-t border-b border-gray-700 py-4 space-y-4">
            <h3 className="text-xl font-semibold text-white">Resumen del Pedido</h3>
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between text-gray-300">
                <div className="flex items-center space-x-2">
                  <img
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="text-sm">
                      Cantidad: {item.quantity} {item.size && `| Talla: ${item.size}`}
                    </p>
                  </div>
                </div>
                <p className="font-medium text-white">${item.price.toLocaleString()}</p>
              </div>
            ))}
            <div className="flex justify-between text-gray-300">
              <span>Subtotal:</span>
              <span>${(order.totalAmount - order.shippingInfo.cost).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Envío:</span>
              <span>${order.shippingInfo.cost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-white border-t border-gray-700 pt-2 mt-2">
              <span>Total:</span>
              <span>${order.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="text-center space-y-4">
            <Button asChild className="w-full bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">
              <Link href="/productos">Continuar Comprando</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-gray-700 text-white hover:bg-gray-800 bg-transparent"
            >
              <Link href="/cuenta/pedidos">Ver Mis Pedidos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
