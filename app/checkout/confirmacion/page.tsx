"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getOrderById, type Order } from "@/lib/orders"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ConfirmacionPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderById(orderId)
      setOrder(foundOrder)
    }
  }, [orderId])

  if (!order) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pedido no encontrado</h1>
          <Link href="/productos">
            <Button className="bg-[#5D1A1D] hover:bg-[#6B1E22]">Volver a la tienda</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header de confirmación */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">¡Pedido Confirmado!</h1>
          <p className="text-gray-400 text-lg">Gracias por tu compra. Tu pedido ha sido procesado exitosamente.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Información del pedido */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Package className="w-5 h-5" />
                Detalles del Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Número de Pedido:</p>
                  <p className="font-semibold">#{order.id}</p>
                </div>
                <div>
                  <p className="text-gray-400">Fecha:</p>
                  <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Total:</p>
                  <p className="font-semibold text-[#5D1A1D]">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Estado:</p>
                  <p className="font-semibold text-yellow-400">Procesando</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h4 className="font-semibold mb-2">Dirección de Envío:</h4>
                <p className="text-gray-400 text-sm">
                  {order.shipping.firstName} {order.shipping.lastName}
                  <br />
                  {order.shipping.address}
                  <br />
                  {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                  <br />
                  {order.shipping.country}
                </p>
              </div>

              {order.trackingNumber && (
                <div className="pt-4 border-t border-gray-800">
                  <h4 className="font-semibold mb-2">Número de Seguimiento:</h4>
                  <p className="text-[#5D1A1D] font-mono">{order.trackingNumber}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Productos del pedido */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Productos Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-400 text-sm">
                        Talla: {item.size} • Cantidad: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-800 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal:</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Envío:</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Impuestos:</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-800">
                  <span>Total:</span>
                  <span className="text-[#5D1A1D]">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Próximos pasos */}
        <Card className="bg-gray-900 border-gray-800 mt-8 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white">¿Qué sigue?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#5D1A1D] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Confirmación por Email</h3>
                <p className="text-gray-400 text-sm">
                  Recibirás un email de confirmación con todos los detalles de tu pedido.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#5D1A1D] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Preparación</h3>
                <p className="text-gray-400 text-sm">Prepararemos tu pedido con cuidado en nuestro almacén.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#5D1A1D] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Envío</h3>
                <p className="text-gray-400 text-sm">Tu pedido será enviado en 1-2 días hábiles.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
            <Download className="w-4 h-4 mr-2" />
            Descargar Factura
          </Button>
          <Link href="/cuenta">
            <Button className="bg-[#5D1A1D] hover:bg-[#6B1E22]">Ver Mis Pedidos</Button>
          </Link>
          <Link href="/productos">
            <Button variant="outline" className="border-[#5D1A1D] text-[#5D1A1D] hover:bg-[#5D1A1D] hover:text-white">
              Seguir Comprando
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
