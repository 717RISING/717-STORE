'use client'

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Banknote } from 'lucide-react'

interface PaymentFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export function PaymentForm({ onSubmit, initialData }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState(initialData?.paymentMethod || "credit-card")
  const [cardNumber, setCardNumber] = useState(initialData?.cardNumber || "")
  const [cardName, setCardName] = useState(initialData?.cardName || "")
  const [expiryDate, setExpiryDate] = useState(initialData?.expiryDate || "")
  const [cvv, setCvv] = useState(initialData?.cvv || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ paymentMethod, cardNumber, cardName, expiryDate, cvv })
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
          Tarjeta de Crédito/Débito
        </Label>
        <Label
          htmlFor="paypal"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
        >
          <RadioGroupItem id="paypal" value="paypal" className="sr-only" />
          <Banknote className="mb-3 h-6 w-6" />
          PayPal
        </Label>
      </RadioGroup>

      {paymentMethod === "credit-card" && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Número de Tarjeta</Label>
              <Input id="cardNumber" type="text" placeholder="XXXX XXXX XXXX XXXX" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
              <Input id="cardName" type="text" placeholder="Nombre Apellido" value={cardName} onChange={(e) => setCardName(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Fecha de Vencimiento</Label>
                <Input id="expiryDate" type="text" placeholder="MM/AA" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" type="text" placeholder="XXX" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {paymentMethod === "paypal" && (
        <div className="text-center text-gray-600 dark:text-gray-400">
          Serás redirigido a PayPal para completar tu compra.
        </div>
      )}

      <Button type="submit" className="w-full">Continuar con el Pago</Button>
    </form>
  )
}
