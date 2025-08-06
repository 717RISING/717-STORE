"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { OrderSummary } from '@/components/checkout/order-summary'
import { ShippingForm } from '@/components/checkout/shipping-form'
import { PaymentForm } from '@/components/checkout/payment-form'
import { useCart } from '@/lib/cart-context'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { CheckoutLoader } from '@/components/loaders/checkout-loader'
import { MobileCheckoutLoader } from '@/components/loaders/mobile/mobile-checkout-loader'
import { useMobileDetection } from '@/hooks/use-mobile-detection'

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingDetails, setShippingDetails] = useState<any>(null) // Replace 'any' with your ShippingDetails type
  const [isProcessing, setIsProcessing] = useState(false)
  const isMobile = useMobileDetection()

  const handleShippingSubmit = (data: any) => {
    setShippingDetails(data)
    setCurrentStep(2)
  }

  const handlePaymentSubmit = async (paymentData: any) => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    try {
      // In a real application, you would send shippingDetails and paymentData to your backend
      // to create an order and process the payment.
      console.log("Processing order with:", { shippingDetails, paymentData, cartItems })

      const success = Math.random() > 0.2; // Simulate 80% success rate

      if (success) {
        const orderId = `ORD-${Math.floor(Math.random() * 100000)}`
        toast({
          title: "Pago Exitoso",
          description: `Tu pedido #${orderId} ha sido procesado.`,
          variant: "default",
        })
        router.push(`/checkout/confirmacion?status=success&orderId=${orderId}`)
      } else {
        toast({
          title: "Error en el Pago",
          description: "Hubo un problema con tu pago. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        })
        router.push(`/checkout/confirmacion?status=failed&orderId=N/A`)
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Error Inesperado",
        description: "Ocurrió un error inesperado durante el pago.",
        variant: "destructive",
      })
      router.push(`/checkout/confirmacion?status=failed&orderId=N/A`)
    } finally {
      setIsProcessing(false)
    }
  }

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <p className="text-muted-foreground mb-6">Añade algunos productos para proceder al pago.</p>
        <Button asChild>
          <Link href="/productos">Ir a la Tienda</Link>
        </Button>
      </div>
    )
  }

  if (isProcessing) {
    return isMobile ? <MobileCheckoutLoader /> : <CheckoutLoader />
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))]">
      <h1 className="text-4xl font-bold text-center mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Información de Envío</CardTitle>
            </CardHeader>
            <CardContent>
              <ShippingForm onSubmit={handleShippingSubmit} initialData={shippingDetails} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Información de Pago</CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep === 2 ? (
                <PaymentForm onSubmit={handlePaymentSubmit} />
              ) : (
                <p className="text-muted-foreground">Completa la información de envío para continuar.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <OrderSummary cartItems={cartItems} cartTotal={cartTotal} shippingCost={5.00} />
        </div>
      </div>
    </div>
  )
}
