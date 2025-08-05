"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Home, ShoppingBag } from "lucide-react"
import Link from "next/link"
import type { Order } from "@/lib/database"
import { formatPrice } from "@/lib/products"
import Image from "next/image"
import EnhancedButton from "@/components/enhanced-button" // Asegúrate de que EnhancedButton se exporta por defecto

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const status = searchParams.get("status") // 'success' o 'failed'

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      // Simular la obtención del pedido de la base de datos
      // En una aplicación real, harías una llamada a la API aquí
      const fetchOrder = async () => {
        setLoading(true)
        // Simular un retraso de red
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock de datos de pedido
        const mockOrder: Order = {
          id: orderId,
          customerEmail: "cliente@example.com", // Email del cliente para la confirmación
          items: [
            {
              productId: "1",
              name: 'Camiseta "Big Dreams"',
              quantity: 1,
              price: 25000,
              imageUrl: "/products/camisetas/big-dreams-tshirt.jpg",
              size: "M",
            },
            {
              productId: "2",
              name: 'Oversized Tee "Urban"',
              quantity: 1,
              price: 30000,
              imageUrl: "/products/camisetas/oversized-tee.jpg",
              size: "L",
            },
          ],
          shippingInfo: {
            firstName: "Juan",
            lastName: "Pérez",
            address: "Carrera 70 #45-32",
            city: "Medellín",
            state: "Antioquia",
            zipCode: "050001",
            country: "Colombia",
            phone: "3001234567",
            email: "cliente@example.com",
            cost: 10000, // Costo de envío simulado
          },
          totalAmount: 65000, // 25000 + 30000 + 10000 (envío)
          orderDate: new Date(),
          status: "pending",
          paymentStatus: status === "success" ? "paid" : "failed",
        }
        setOrder(mockOrder)
        setLoading(false)
      }
      fetchOrder()
    } else {
      setLoading(false)
    }
  }, [orderId, status])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-950 text-white p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#5D1A1D]"></div>
        <p className="mt-4 text-lg">Cargando confirmación de pedido...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-950 text-white p-4 text-center">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Error al cargar el pedido</h1>
        <p className="text-gray-400 mb-6">No se pudo encontrar la información de tu pedido.</p>
        <Link href="/">
          <EnhancedButton variant="modern" size="lg">
            <Home className="w-5 h-5 mr-2" />
            Volver al inicio
          </EnhancedButton>
        </Link>
      </div>
    )
  }

  const isSuccess = order.paymentStatus === "paid"

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-950 text-white p-4">
      <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-2xl text-center border border-gray-800">
        {isSuccess ? (
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce" />
        ) : (
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6 animate-shake" />
        )}

        <h1 className="text-4xl font-extrabold mb-3 text-[#5D1A1D]">
          {isSuccess ? "¡Pedido Confirmado!" : "¡Pago Fallido!"}
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          {isSuccess
            ? `Gracias por tu compra, ${order.shippingInfo.firstName}. Tu pedido #${order.id} ha sido procesado exitosamente.`
            : `Lo sentimos, ${order.shippingInfo.firstName}. Tu pago para el pedido #${order.id} no pudo ser procesado.`}
        </p>

        {isSuccess && (
          <div className="bg-gray-800 p-6 rounded-lg mb-6 text-left">
            <h2 className="text-2xl font-bold text-white mb-4">Resumen del Pedido</h2>
            <div className="space-y-3 mb-4">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border border-gray-700">
                    <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium text-white">{item.name}</p>
                    <p className="text-gray-400 text-sm">
                      Talla: {item.size} • Cantidad: {item.quantity}
                    </p>
                  </div>
                  <p className="text-white font-semibold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>{formatPrice(order.totalAmount - order.shippingInfo.cost)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Envío</span>
                <span>{formatPrice(order.shippingInfo.cost)}</span>
              </div>
              <div className="flex justify-between text-white text-xl font-bold mt-4">
                <span>Total</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Se ha enviado una confirmación a tu correo:{" "}
              <span className="font-semibold text-[#5D1A1D]">{order.customerEmail}</span>
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/">
            <EnhancedButton variant="modern" size="lg" className="w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Volver al inicio
            </EnhancedButton>
          </Link>
          <Link href="/productos">
            <EnhancedButton variant="outline" size="lg" className="w-full sm:w-auto">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Seguir comprando
            </EnhancedButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
