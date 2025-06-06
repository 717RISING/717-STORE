"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, Building } from "lucide-react"

interface PaymentData {
  method: "card" | "paypal" | "transfer"
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
}

interface PaymentFormProps {
  data: PaymentData
  onChange: (data: PaymentData) => void
}

export default function PaymentForm({ data, onChange }: PaymentFormProps) {
  const handleInputChange = (field: keyof PaymentData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  const handleMethodChange = (method: "card" | "paypal" | "transfer") => {
    onChange({ ...data, method })
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Método de Pago</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={data.method} onValueChange={handleMethodChange} className="space-y-4">
          <div className="flex items-center space-x-2 p-4 border border-gray-700 rounded-lg">
            <RadioGroupItem value="card" id="card" className="border-[#5D1A1D] text-[#5D1A1D]" />
            <Label htmlFor="card" className="flex items-center gap-2 text-white cursor-pointer">
              <CreditCard className="w-5 h-5" />
              Tarjeta de Crédito/Débito
            </Label>
          </div>

          <div className="flex items-center space-x-2 p-4 border border-gray-700 rounded-lg">
            <RadioGroupItem value="paypal" id="paypal" className="border-[#5D1A1D] text-[#5D1A1D]" />
            <Label htmlFor="paypal" className="flex items-center gap-2 text-white cursor-pointer">
              <Smartphone className="w-5 h-5" />
              PayPal
            </Label>
          </div>

          <div className="flex items-center space-x-2 p-4 border border-gray-700 rounded-lg">
            <RadioGroupItem value="transfer" id="transfer" className="border-[#5D1A1D] text-[#5D1A1D]" />
            <Label htmlFor="transfer" className="flex items-center gap-2 text-white cursor-pointer">
              <Building className="w-5 h-5" />
              Transferencia Bancaria
            </Label>
          </div>
        </RadioGroup>

        {data.method === "card" && (
          <div className="space-y-4 pt-4 border-t border-gray-800">
            <div>
              <Label htmlFor="cardName" className="text-white">
                Nombre en la Tarjeta *
              </Label>
              <Input
                id="cardName"
                value={data.cardName}
                onChange={(e) => handleInputChange("cardName", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Juan Pérez"
                required
              />
            </div>

            <div>
              <Label htmlFor="cardNumber" className="text-white">
                Número de Tarjeta *
              </Label>
              <Input
                id="cardNumber"
                value={data.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate" className="text-white">
                  Fecha de Vencimiento *
                </Label>
                <Input
                  id="expiryDate"
                  value={data.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="MM/AA"
                  maxLength={5}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="text-white">
                  CVV *
                </Label>
                <Input
                  id="cvv"
                  value={data.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="123"
                  maxLength={4}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {data.method === "paypal" && (
          <div className="p-4 bg-gray-800 rounded-lg">
            <p className="text-white text-sm">Serás redirigido a PayPal para completar tu pago de forma segura.</p>
          </div>
        )}

        {data.method === "transfer" && (
          <div className="p-4 bg-gray-800 rounded-lg space-y-2">
            <p className="text-white text-sm font-medium">Datos para transferencia:</p>
            <p className="text-gray-400 text-sm">Banco: 717 Bank</p>
            <p className="text-gray-400 text-sm">Cuenta: ES12 3456 7890 1234 5678 90</p>
            <p className="text-gray-400 text-sm">Concepto: Pedido #{"{orderId}"}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
