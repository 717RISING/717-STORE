"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface ShippingData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface ShippingFormProps {
  data: ShippingData
  onChange: (data: ShippingData) => void
  onBillingSameAsShipping: (same: boolean) => void
}

export default function ShippingForm({ data, onChange, onBillingSameAsShipping }: ShippingFormProps) {
  const [billingSame, setBillingSame] = useState(true)

  const handleInputChange = (field: keyof ShippingData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  const handleBillingSameChange = (checked: boolean) => {
    setBillingSame(checked)
    onBillingSameAsShipping(checked)
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Información de Envío</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-white">
              Nombre *
            </Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-white">
              Apellido *
            </Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="text-white">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-white">
            Teléfono *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
        </div>

        <div>
          <Label htmlFor="address" className="text-white">
            Dirección *
          </Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city" className="text-white">
              Ciudad *
            </Label>
            <Input
              id="city"
              value={data.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="state" className="text-white">
              Estado/Provincia *
            </Label>
            <Select value={data.state} onValueChange={(value) => handleInputChange("state", value)}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="madrid">Madrid</SelectItem>
                <SelectItem value="barcelona">Barcelona</SelectItem>
                <SelectItem value="valencia">Valencia</SelectItem>
                <SelectItem value="sevilla">Sevilla</SelectItem>
                <SelectItem value="bilbao">Bilbao</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="zipCode" className="text-white">
              Código Postal *
            </Label>
            <Input
              id="zipCode"
              value={data.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="country" className="text-white">
            País *
          </Label>
          <Select value={data.country} onValueChange={(value) => handleInputChange("country", value)}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Seleccionar país" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="es">España</SelectItem>
              <SelectItem value="mx">México</SelectItem>
              <SelectItem value="ar">Argentina</SelectItem>
              <SelectItem value="co">Colombia</SelectItem>
              <SelectItem value="pe">Perú</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Checkbox
            id="billingSame"
            checked={billingSame}
            onCheckedChange={handleBillingSameChange}
            className="border-[#5D1A1D] data-[state=checked]:bg-[#5D1A1D]"
          />
          <Label htmlFor="billingSame" className="text-white text-sm">
            La dirección de facturación es la misma que la de envío
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}
