"use client"

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

interface PaymentFormProps {
  onSubmit: (data: any) => void // Replace 'any' with your PaymentDetails type
}

export function PaymentForm({ onSubmit }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear] = useState('')
  const [cvc, setCvc] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString())
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Basic validation
    if (!cardNumber || !cardName || !expiryMonth || !expiryYear || !cvc) {
      alert('Por favor, completa todos los campos de pago.')
      setIsSubmitting(false)
      return
    }

    // Simulate payment tokenization/API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    onSubmit({
      cardNumber: cardNumber.replace(/\s/g, ''), // Remove spaces
      cardName,
      expiryMonth,
      expiryYear,
      cvc,
    })
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Número de Tarjeta</Label>
        <Input
          id="cardNumber"
          type="text"
          placeholder="XXXX XXXX XXXX XXXX"
          value={cardNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').substring(0, 16)
            setCardNumber(value.replace(/(\d{4})(?=\d)/g, '$1 '))
          }}
          required
        />
      </div>
      <div className="space-y-2">
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
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryMonth">Mes</Label>
          <Select value={expiryMonth} onValueChange={setExpiryMonth} required>
            <SelectTrigger id="expiryMonth">
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              {months.map(month => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiryYear">Año</Label>
          <Select value={expiryYear} onValueChange={setExpiryYear} required>
            <SelectTrigger id="expiryYear">
              <SelectValue placeholder="AAAA" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            type="text"
            placeholder="XXX"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Procesando Pago...
          </>
        ) : (
          'Pagar Ahora'
        )}
      </Button>
    </form>
  )
}
