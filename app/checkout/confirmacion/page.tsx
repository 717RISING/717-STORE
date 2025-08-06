import { CheckCircle } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getOrderById } from "@/lib/database" // Import from lib/database
import { formatPrice } from "@/lib/products" // Import formatPrice

interface ConfirmationPageProps {
  searchParams: {
    orderId?: string
  }
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const orderId = searchParams.orderId

  if (!orderId) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 text-center">
        <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">No se encontró el ID del pedido.</p>
            <Button asChild className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
              <Link href="/">Volver al Inicio</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const order = await getOrderById(orderId)

  if (!order) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 text-center">
        <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-500">Pedido No Encontrado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">El pedido con ID "{orderId}" no existe.</p>
            <Button asChild className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
              <Link href="/">Volver al Inicio</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">¡Pedido Confirmado!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Gracias por tu compra. Tu pedido ha sido recibido y está siendo procesado.
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md space-y-2 text-left">
            <p className="text-gray-800 dark:text-gray-200">
              <strong>ID del Pedido:</strong> {order.id}
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Fecha:</strong> {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Total:</strong> {formatPrice(order.totalAmount)}
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Estado:</strong> {order.status}
            </p>
          </div>
          <Separator className="bg-gray-200 dark:bg-gray-700" />
          <p className="text-gray-700 dark:text-gray-300">
            Recibirás un correo electrónico de confirmación con los detalles de tu pedido y seguimiento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
              <Link href="/productos">Seguir Comprando</Link>
            </Button>
            <Button asChild variant="outline" className="border-[#4A1518] text-[#4A1518] hover:bg-[#F5E6E7] dark:border-[#6B1E22] dark:text-[#6B1E22] dark:hover:bg-gray-700">
              <Link href="/cuenta?tab=orders">Ver Mis Pedidos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
