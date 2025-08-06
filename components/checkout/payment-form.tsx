"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Banknote, Wallet } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [saveCard, setSaveCard] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate payment processing
    toast({
      title: "Procesando Pago",
      description: `Método seleccionado: ${paymentMethod === "credit-card" ? "Tarjeta de Crédito" : "PayPal"}.`,
    })
    console.log("Payment method:", paymentMethod)
    console.log("Save card:", saveCard)
    // In a real app, you'd send this data to a payment gateway
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Label
          htmlFor="credit-card"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
        >
          <RadioGroupItem id="credit-card" value="credit-card" className="sr-only" />
          <CreditCard className="mb-3 h-6 w-6" />
          Tarjeta de Crédito
        </Label>
        <Label
          htmlFor="paypal"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
        >
          <RadioGroupItem id="paypal" value="paypal" className="sr-only" />
          <Wallet className="mb-3 h-6 w-6" />
          PayPal
        </Label>
      </RadioGroup>

      {paymentMethod === "credit-card" && (
        <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="card-number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Número de Tarjeta
              </Label>
              <Input id="card-number" type="text" placeholder="XXXX XXXX XXXX XXXX" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha de Vencimiento (MM/AA)
                </Label>
                <Input id="expiry-date" type="text" placeholder="MM/AA" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div>
                <Label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CVV
                </Label>
                <Input id="cvv" type="text" placeholder="XXX" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
            </div>
            <div>
              <Label htmlFor="card-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre en la Tarjeta
              </Label>
              <Input id="card-name" type="text" placeholder="Nombre Completo" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="save-card" checked={saveCard} onCheckedChange={(checked) => setSaveCard(!!checked)} />
              <Label htmlFor="save-card" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Guardar esta tarjeta para futuras compras
              </Label>
            </div>
          </CardContent>
        </Card>
      )}

      {paymentMethod === "paypal" && (
        <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Serás redirigido a PayPal para completar tu compra de forma segura.
          </p>
          <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Banknote className="mr-2 h-5 w-5" />
            Pagar con PayPal
          </Button>
        </div>
      )}

      <Button type="submit" className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white py-3 text-lg">
        Confirmar Pedido
      </Button>
    </form>
  )
}
