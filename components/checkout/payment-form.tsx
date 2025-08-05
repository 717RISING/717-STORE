"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface PaymentInfo {
  method: "card" | "paypal" | "transfer"
  cardDetails?: {
    cardNumber: string
    expiryDate: string
    cvv: string
    cardName: string
  }
}

interface PaymentFormProps {
  data: PaymentInfo
  onChange: (data: PaymentInfo) => void
  isLoading: boolean
}

export default function PaymentForm({ data, onChange, isLoading }: PaymentFormProps) {
  const [cardDetails, setCardDetails] = useState(
    data.cardDetails || {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    },
  )

  const handleMethodChange = (value: string) => {
    onChange({ ...data, method: value as "card" | "paypal" | "transfer" })
  }

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({ ...prev, [name]: value }))
    onChange({ ...data, cardDetails: { ...cardDetails, [name]: value } })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (data.method === "card") {
      if (!cardDetails.cardName || !cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
        toast.error("Por favor, completa todos los detalles de la tarjeta.")
        return
      }
      // Basic card number validation (e.g., length)
      if (cardDetails.cardNumber.replace(/\s/g, "").length < 16) {
        toast.error("Número de tarjeta inválido. Debe tener al menos 16 dígitos.")
        return
      }
      // Basic expiry date validation (MM/YY)
      const [month, year] = cardDetails.expiryDate.split("/")
      const currentYear = new Date().getFullYear() % 100 // Get last two digits of current year
      const currentMonth = new Date().getMonth() + 1 // Month is 0-indexed

      if (
        !month ||
        !year ||
        Number(month) < 1 ||
        Number(month) > 12 ||
        Number(year) < currentYear ||
        (Number(year) === currentYear && Number(month) < currentMonth)
      ) {
        toast.error("Fecha de vencimiento inválida. Usa MM/AA y asegúrate de que no haya expirado.")
        return
      }
      if (cardDetails.cvv.length < 3 || cardDetails.cvv.length > 4) {
        toast.error("CVV inválido. Debe tener 3 o 4 dígitos.")
        return
      }
    }
    // If validation passes, the parent component will handle the order placement
    toast.success("Información de pago guardada.")
  }

  return (
    <Card className="shadow-lg bg-gray-800 border-gray-700 text-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold text-[#5D1A1D]">Información de Pago</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <RadioGroup value={data.method} onValueChange={handleMethodChange} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" className="border-[#5D1A1D] text-[#5D1A1D]" />
              <Label htmlFor="card" className="text-gray-300">
                Tarjeta de Crédito / Débito
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" className="border-[#5D1A1D] text-[#5D1A1D]" />
              <Label htmlFor="paypal" className="text-gray-300">
                PayPal
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="transfer" id="transfer" className="border-[#5D1A1D] text-[#5D1A1D]" />
              <Label htmlFor="transfer" className="text-gray-300">
                Transferencia Bancaria
              </Label>
            </div>
          </RadioGroup>

          {data.method === "card" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  value={cardDetails.cardName}
                  onChange={handleCardDetailsChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="cardNumber">Número de tarjeta</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailsChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Fecha de vencimiento (MM/AA)</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleCardDetailsChange}
                  placeholder="MM/AA"
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
                />
              </div>
            </div>
          )}

          {data.method === "paypal" && (
            <div className="mt-4 text-center text-gray-300">Serás redirigido a PayPal para completar tu compra.</div>
          )}

          {data.method === "transfer" && (
            <div className="mt-4 text-center text-gray-300">
              Recibirás instrucciones para la transferencia bancaria en tu correo electrónico después de confirmar el
              pedido.
            </div>
          )}

          <Button type="submit" className="w-full bg-[#5D1A1D] hover:bg-[#4a1518] text-white py-2" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Procesando Pago...
              </>
            ) : (
              "Confirmar Pago"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
