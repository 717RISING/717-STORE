import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getOrderById } from '@/lib/database' // Assuming this function exists
import { notFound } from 'next/navigation'

interface ConfirmationPageProps {
  searchParams: {
    orderId?: string
  }
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const orderId = searchParams.orderId

  if (!orderId) {
    notFound() // Or redirect to an error page
  }

  const order = await getOrderById(orderId)

  if (!order) {
    notFound() // Order not found
  }

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-64px)]">
      <Card className="w-full max-w-md text-center bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-col items-center justify-center space-y-4">
          <CheckCircle className="h-20 w-20 text-green-500" />
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">¡Pedido Confirmado!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
          <p className="text-lg">
            Gracias por tu compra. Tu pedido ha sido realizado con éxito.
          </p>
          <p className="text-xl font-semibold">
            Número de Pedido: <span className="text-[#4A1518] dark:text-[#FFD700]">{order.id}</span>
          </p>
          <p>
            Recibirás un correo electrónico de confirmación con los detalles de tu pedido en breve.
          </p>
          <div className="flex flex-col gap-4">
            <Link href="/productos" passHref>
              <Button className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white py-3 text-lg font-semibold">
                Continuar Comprando
              </Button>
            </Link>
            <Link href="/cuenta?tab=orders" passHref>
              <Button variant="outline" className="w-full text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 py-3 text-lg font-semibold">
                Ver Mis Pedidos
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
