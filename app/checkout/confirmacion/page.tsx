"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getOrderById } from "@/lib/orders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/products" // Assuming this utility exists
import Image from "next/image"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const status = searchParams.get("status") // 'success' or 'failed'
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        const fetchedOrder = await getOrderById(orderId)
        setOrder(fetchedOrder)
      }
      setLoading(false)
    }
    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-gray-950 text-white">
        <Loader2 className="h-16 w-16 text-[#5D1A1D] animate-spin" />
        <p className="ml-4 text-xl">Cargando confirmación...</p>
      </div>
    )
  }

  const isSuccess = status === "success" && order

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-gray-950 text-white p-4">
      <Card
        className={cn(
          "w-full max-w-2xl shadow-lg animate-fade-in-up",
          isSuccess ? "border-[#5D1A1D]" : "border-red-600",
          "bg-gray-800 text-white",
        )}
      >
        <CardHeader className={cn("text-center py-6 rounded-t-lg", isSuccess ? "bg-[#5D1A1D]" : "bg-red-600")}>
          {isSuccess ? (
            <CheckCircle2 className="mx-auto h-16 w-16 text-white mb-4" />
          ) : (
            <XCircle className="mx-auto h-16 w-16 text-white mb-4" />
          )}
          <CardTitle className="text-3xl font-bold text-white">
            {isSuccess ? "¡Pedido Confirmado!" : "Error en el Pedido"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          {isSuccess ? (
            <>
              <p className="text-lg mb-4 text-gray-200">
                Gracias por tu compra, <span className="font-semibold">{order.shippingInfo.firstName}</span>. Tu pedido{" "}
                <span className="font-bold text-[#5D1A1D]">#{order.id}</span> ha sido recibido y está siendo procesado.
              </p>
              <p className="text-gray-300 mb-6">
                Recibirás un correo electrónico de confirmación en{" "}
                <span className="font-semibold">{order.customerEmail}</span> con los detalles de tu pedido.
              </p>

              {order.items && order.items.length > 0 && (
                <div className="mb-6 text-left">
                  <h3 className="text-xl font-semibold text-[#5D1A1D] mb-3 border-b border-gray-700 pb-2">
                    Artículos del Pedido:
                  </h3>
                  <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {order.items.map((item: any) => (
                      <div key={item.productId} className="flex items-center mb-3">
                        <Image
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="rounded-md object-cover mr-3"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-100">{item.name}</p>
                          <p className="text-sm text-gray-400">
                            Cant: {item.quantity} {item.size && `| Talla: ${item.size}`}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-100">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold text-[#5D1A1D]">
                      <span>Total:</span>
                      <span>{formatPrice(order.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Link href="/productos">
                  <Button className="w-full sm:w-auto bg-[#5D1A1D] hover:bg-[#4a1518] text-white py-2 px-6">
                    Seguir Comprando
                  </Button>
                </Link>
                <Link href="/cuenta/pedidos">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-[#5D1A1D] text-[#5D1A1D] hover:bg-[#5D1A1D] hover:text-white py-2 px-6 bg-transparent"
                  >
                    Ver Mis Pedidos
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-lg mb-4 text-gray-200">Lo sentimos, hubo un problema al procesar tu pedido.</p>
              <p className="text-gray-300 mb-6">
                Por favor, inténtalo de nuevo o contacta a soporte si el problema persiste.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Link href="/checkout">
                  <Button className="w-full sm:w-auto bg-[#5D1A1D] hover:bg-[#4a1518] text-white py-2 px-6">
                    Reintentar Pago
                  </Button>
                </Link>
                <Link href="/contacto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-[#5D1A1D] text-[#5D1A1D] hover:bg-[#5D1A1D] hover:text-white py-2 px-6 bg-transparent"
                  >
                    Contactar Soporte
                  </Button>
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
