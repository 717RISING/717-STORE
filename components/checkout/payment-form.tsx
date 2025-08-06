'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { PaymentDetails } from '@/lib/types'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface PaymentFormProps {
  onSubmit: (data: PaymentDetails) => void;
  initialData?: PaymentDetails;
}

export function PaymentForm({ onSubmit, initialData }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState(initialData?.cardNumber || '')
  const [cardName, setCardName] = useState(initialData?.cardName || '')
  const [expiryDate, setExpiryDate] = useState(initialData?.expiryDate || '')
  const [cvv, setCvv] = useState(initialData?.cvv || '')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast.error('Por favor, completa todos los campos de pago.')
      setIsLoading(false)
      return
    }

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    onSubmit({ cardNumber, cardName, expiryDate, cvv })
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="cardNumber">Número de Tarjeta</Label>
        <Input
          id="cardNumber"
          type="text"
          placeholder="XXXX XXXX XXXX XXXX"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
        <Input
          id="cardName"
          type="text"
          placeholder="Nombre Completo"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="expiryDate">Fecha de Vencimiento (MM/AA)</Label>
          <Input
            id="expiryDate"
            type="text"
            placeholder="MM/AA"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            type="text"
            placeholder="XXX"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Procesando Pago...
          </>
        ) : (
          "Confirmar Pago"
        )}
      </Button>
    </form>
  )
}
