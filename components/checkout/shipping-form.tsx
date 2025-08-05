"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Truck } from "lucide-react"
import type { ShippingInfo } from "@/lib/database" // Importar la interfaz ShippingInfo

interface ShippingFormProps {
  data: ShippingInfo
  onChange: (data: ShippingInfo) => void
  onBillingSameAsShipping: (same: boolean) => void
}

const COLOMBIA_DEPARTMENTS = [
  "Amazonas",
  "Antioquia",
  "Arauca",
  "Atlántico",
  "Bolívar",
  "Boyacá",
  "Caldas",
  "Caquetá",
  "Casanare",
  "Cauca",
  "Cesar",
  "Chocó",
  "Córdoba",
  "Cundinamarca",
  "Guainía",
  "Guaviare",
  "Huila",
  "La Guajira",
  "Magdalena",
  "Meta",
  "Nariño",
  "Norte de Santander",
  "Putumayo",
  "Quindío",
  "Risaralda",
  "San Andrés y Providencia",
  "Santander",
  "Sucre",
  "Tolima",
  "Valle del Cauca",
  "Vaupés",
  "Vichada",
  "Bogotá D.C.",
]

const MAIN_CITIES = [
  "Medellín",
  "Bogotá",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Bucaramanga",
  "Pereira",
  "Santa Marta",
  "Ibagué",
  "Cúcuta",
  "Villavicencio",
  "Manizales",
  "Neiva",
  "Soledad",
  "Armenia",
  "Valledupar",
  "Montería",
  "Itagüí",
  "Pasto",
  "Palmira",
]

export default function ShippingForm({ data, onChange, onBillingSameAsShipping }: ShippingFormProps) {
  const [billingSame, setBillingSame] = useState(true)

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  const handleBillingSameChange = (checked: boolean) => {
    setBillingSame(checked)
    onBillingSameAsShipping(checked)
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Truck className="w-5 h-5 text-[#5D1A1D]" />
          Información de Envío
        </CardTitle>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              placeholder="+57 300 123 4567"
              required
            />
          </div>
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
            placeholder="Carrera 70 #45-32"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city" className="text-white">
              Ciudad *
            </Label>
            <Select value={data.city} onValueChange={(value) => handleInputChange("city", value)}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Selecciona tu ciudad" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {MAIN_CITIES.map((city) => (
                  <SelectItem key={city} value={city} className="text-white hover:bg-gray-700">
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="state" className="text-white">
              Departamento *
            </Label>
            <Select value={data.state} onValueChange={(value) => handleInputChange("state", value)}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Selecciona tu departamento" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {COLOMBIA_DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept} value={dept} className="text-white hover:bg-gray-700">
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="zipCode" className="text-white">
              Código Postal *
            </Label>
            <Input
              id="zipCode"
              value={data.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="050001"
              required
            />
          </div>
          <div>
            <Label htmlFor="country" className="text-white">
              País
            </Label>
            <Input id="country" value="Colombia" disabled className="bg-gray-800 border-gray-700 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Checkbox
            id="billingSame"
            checked={billingSame}
            onCheckedChange={handleBillingSameChange}
            className="border-gray-600 data-[state=checked]:bg-[#5D1A1D]"
          />
          <Label htmlFor="billingSame" className="text-white text-sm">
            La dirección de facturación es la misma que la de envío
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}
