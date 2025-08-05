"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getOrderById } from "@/lib/orders"
import type { Order } from "@/lib/database"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, XCircle } from "lucide-react"
import { AdaptiveLoader } from "@/components/loaders/adaptive-loader"
import { useMobileDetection } from "@/hooks/use-mobile-detection"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isMobile } = useMobileDetection()

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        try {
          const fetchedOrder = await getOrderById(orderId)
          if (fetchedOrder) {
            setOrder(fetchedOrder)
          } else {
            setError("Pedido no encontrado.")
          }
        } catch (err) {
          console.error("Error al obtener el pedido:", err)
          setError("Error al cargar los detalles del pedido.")
        } finally {
          setLoading(false)
        }
      } else {
        setError("ID de pedido no proporcionado.")
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return <AdaptiveLoader type={isMobile ? "mobile-checkout" : "checkout"} />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <XCircle className="mx-auto h-12 w-12 text-red-500" />
            <CardTitle className="text-2xl font-bold text-red-600">Error en la Confirmación</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{error}</p>
            <Button asChild>
              <Link href="/">Volver al inicio</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <XCircle className="mx-auto h-12 w-12 text-red-500" />
            <CardTitle className="text-2xl font-bold text-red-600">Pedido no encontrado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">No se pudo cargar la información del pedido.</p>
            <Button asChild>
              <Link href="/">Volver al inicio</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-2xl shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#5D1A1D] to-black text-white text-center py-6">
          <CheckCircle2 className="mx-auto h-16 w-16 mb-3" />
          <CardTitle className="text-3xl font-extrabold">¡Pedido Confirmado!</CardTitle>
          <p className="text-lg mt-2">Gracias por tu compra en 717 Store.</p>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <div className="text-center mb-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Tu pedido <span className="font-semibold text-[#5D1A1D]">#{order.id}</span> ha sido recibido y está siendo
              procesado.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Hemos enviado una confirmación a tu correo electrónico:{" "}
              <span className="font-medium">{order.customerEmail}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b pb-2 border-gray-200 dark:border-gray-700">
                Resumen del Pedido
              </h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span>${order.shipping.cost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Impuestos:</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-[#5D1A1D] pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b pb-2 border-gray-200 dark:border-gray-700">
                Dirección de Envío
              </h3>
              <address className="not-italic text-gray-700 dark:text-gray-300 space-y-1">
                <p>
                  {order.shipping.firstName} {order.shipping.lastName}
                </p>
                <p>{order.shipping.address}</p>
                <p>
                  {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                </p>
                <p>{order.shipping.country}</p>
                <p>Teléfono: {order.shipping.phone || "N/A"}</p>
              </address>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b pb-2 border-gray-200 dark:border-gray-700">
            Productos
          </h3>
          <div className="space-y-4 mb-8">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                <img
                  src={item.imageUrl || "/placeholder.svg?height=64&width=64&text=Product"}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
                <div className="flex-grow">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{item.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Talla: {item.size}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Cantidad: {item.quantity}</p>
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-[#5D1A1D] hover:bg-[#4a1517] text-white">
              <Link href="/productos">Seguir Comprando</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[#5D1A1D] text-[#5D1A1D] hover:bg-[#5D1A1D]/10 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 bg-transparent"
            >
              <Link href="/cuenta?tab=orders">Ver Mis Pedidos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
