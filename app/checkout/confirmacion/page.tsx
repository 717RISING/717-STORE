'use client'

import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'
import { useCart } from '@/lib/cart-context'

export default function ConfirmationPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    // Clear the cart after successful order confirmation
    clearCart()
  }, [clearCart])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] bg-gray-50 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 md:p-12 text-center max-w-md w-full">
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          ¡Pedido Confirmado!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-8">
          Recibirás un correo electrónico de confirmación con los detalles de tu pedido en breve.
        </p>
        <div className="flex flex-col gap-4">
          <Button asChild className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white text-lg py-3">
            <Link href="/productos">Continuar Comprando</Link>
          </Button>
          <Button asChild variant="outline" className="w-full text-[#4A1518] border-[#4A1518] hover:bg-[#F5E6E7] dark:text-[#FFD700] dark:border-[#FFD700] dark:hover:bg-gray-700">
            <Link href="/cuenta/pedidos">Ver Mis Pedidos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
