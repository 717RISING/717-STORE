'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent } from '@/components/ui/card'

interface PaymentFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export default function PaymentForm({ onSubmit, initialData }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState(initialData?.paymentMethod || 'credit-card')
  const [cardNumber, setCardNumber] = useState(initialData?.cardNumber || '')
  const [cardName, setCardName] = useState(initialData?.cardName || '')
  const [expiryDate, setExpiryDate] = useState(initialData?.expiryDate || '')
  const [cvv, setCvv] = useState(initialData?.cvv || '')
  const [errors, setErrors] = useState<any>({})

  const validate = () => {
    const newErrors: any = {}
    if (paymentMethod === 'credit-card') {
      if (!cardNumber) newErrors.cardNumber = 'Número de tarjeta es requerido.'
      else if (!/^\d{16}$/.test(cardNumber)) newErrors.cardNumber = 'Número de tarjeta inválido (16 dígitos).'
      if (!cardName) newErrors.cardName = 'Nombre en la tarjeta es requerido.'
      if (!expiryDate) newErrors.expiryDate = 'Fecha de vencimiento es requerida.'
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) newErrors.expiryDate = 'Formato de fecha inválido (MM/AA).'
      if (!cvv) newErrors.cvv = 'CVV es requerido.'
      else if (!/^\d{3,4}$/.test(cvv)) newErrors.cvv = 'CVV inválido (3 o 4 dígitos).'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({ paymentMethod, cardNumber, cardName, expiryDate, cvv })
    }
  }

  return (
    <Card className="p-6 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="credit-card" id="credit-card" />
              <Label htmlFor="credit-card" className="text-gray-700 dark:text-gray-300">Tarjeta de Crédito</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="text-gray-700 dark:text-gray-300">PayPal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bank-transfer" id="bank-transfer" />
              <Label htmlFor="bank-transfer" className="text-gray-700 dark:text-gray-300">Transferencia Bancaria</Label>
            </div>
          </RadioGroup>

          {paymentMethod === 'credit-card' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="text-gray-700 dark:text-gray-300">Número de Tarjeta</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardName" className="text-gray-700 dark:text-gray-300">Nombre en la Tarjeta</Label>
                <Input
                  id="cardName"
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Nombre Apellido"
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="text-gray-700 dark:text-gray-300">Fecha de Vencimiento (MM/AA)</Label>
                <Input
                  id="expiryDate"
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/AA"
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-gray-700 dark:text-gray-300">CVV</Label>
                <Input
                  id="cvv"
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="XXX"
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white">
            Continuar al Resumen
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
