"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, ShoppingCartIcon as Paypal, Banknote } from "lucide-react"
import type { PaymentInfo } from "@/lib/database"

interface PaymentFormProps {
  onPaymentInfoChange: (info: PaymentInfo) => void
  initialPaymentInfo?: PaymentInfo
}

export default function PaymentForm({ onPaymentInfoChange, initialPaymentInfo }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentInfo?.method || "card")
  const [cardDetails, setCardDetails] = useState(
    initialPaymentInfo?.cardDetails || {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    },
  )
  const [paypalEmail, setPaypalEmail] = useState(initialPaymentInfo?.paypalEmail || "")
  const [bankTransferDetails, setBankTransferDetails] = useState(
    initialPaymentInfo?.bankTransferDetails || {
      bankName: "",
      accountNumber: "",
    },
  )

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as PaymentInfo["method"])
    onPaymentInfoChange({ method: value as PaymentInfo["method"] })
  }

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const newCardDetails = { ...cardDetails, [id]: value }
    setCardDetails(newCardDetails)
    onPaymentInfoChange({ method: "card", cardDetails: newCardDetails })
  }

  const handlePaypalEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPaypalEmail(value)
    onPaymentInfoChange({ method: "paypal", paypalEmail: value })
  }

  const handleBankTransferDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const newBankTransferDetails = { ...bankTransferDetails, [id]: value }
    setBankTransferDetails(newBankTransferDetails)
    onPaymentInfoChange({ method: "transfer", bankTransferDetails: newBankTransferDetails })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Información de Pago</h2>

      <RadioGroup
        value={paymentMethod}
        onValueChange={handlePaymentMethodChange}
        className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="card" id="card" className="text-[#5D1A1D]" />
          <Label htmlFor="card" className="flex items-center space-x-2 text-gray-300">
            <CreditCard className="w-5 h-5" />
            <span>Tarjeta de Crédito/Débito</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="paypal" id="paypal" className="text-[#5D1A1D]" />
          <Label htmlFor="paypal" className="flex items-center space-x-2 text-gray-300">
            <Paypal className="w-5 h-5" />
            <span>PayPal</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="transfer" id="transfer" className="text-[#5D1A1D]" />
          <Label htmlFor="transfer" className="flex items-center space-x-2 text-gray-300">
            <Banknote className="w-5 h-5" />
            <span>Transferencia Bancaria</span>
          </Label>
        </div>
      </RadioGroup>

      {paymentMethod === "card" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="cardName" className="text-gray-300">
              Nombre en la Tarjeta
            </Label>
            <Input
              id="cardName"
              value={cardDetails.cardName}
              onChange={handleCardDetailsChange}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="cardNumber" className="text-gray-300">
              Número de Tarjeta
            </Label>
            <Input
              id="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleCardDetailsChange}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="expiryDate" className="text-gray-300">
              Fecha de Vencimiento (MM/AA)
            </Label>
            <Input
              id="expiryDate"
              value={cardDetails.expiryDate}
              onChange={handleCardDetailsChange}
              placeholder="MM/AA"
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="cvv" className="text-gray-300">
              CVV
            </Label>
            <Input
              id="cvv"
              value={cardDetails.cvv}
              onChange={handleCardDetailsChange}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
        </div>
      )}

      {paymentMethod === "paypal" && (
        <div>
          <Label htmlFor="paypalEmail" className="text-gray-300">
            Correo Electrónico de PayPal
          </Label>
          <Input
            id="paypalEmail"
            type="email"
            value={paypalEmail}
            onChange={handlePaypalEmailChange}
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
        </div>
      )}

      {paymentMethod === "transfer" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="bankName" className="text-gray-300">
              Nombre del Banco
            </Label>
            <Input
              id="bankName"
              value={bankTransferDetails.bankName}
              onChange={handleBankTransferDetailsChange}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="accountNumber" className="text-gray-300">
              Número de Cuenta
            </Label>
            <Input
              id="accountNumber"
              value={bankTransferDetails.accountNumber}
              onChange={handleBankTransferDetailsChange}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
        </div>
      )}
    </div>
  )
}
