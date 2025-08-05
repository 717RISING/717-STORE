"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  cost: number // Costo de envío
}

interface ShippingFormProps {
  data: ShippingInfo
  onChange: (data: ShippingInfo) => void
  onBillingSameAsShipping: (same: boolean) => void
}

export default function ShippingForm({ data, onChange, onBillingSameAsShipping }: ShippingFormProps) {
  const [billingChecked, setBillingChecked] = useState(true)

  useEffect(() => {
    onBillingSameAsShipping(billingChecked)
  }, [billingChecked, onBillingSameAsShipping])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    onChange({ ...data, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    onChange({ ...data, [name]: value })
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Basic validation
    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.phone ||
      !data.address ||
      !data.city ||
      !data.state ||
      !data.zipCode
    ) {
      toast.error("Por favor, completa todos los campos de envío.")
      return
    }
    if (!validateEmail(data.email)) {
      toast.error("Por favor, introduce un email válido.")
      return
    }
    // If validation passes, the parent component will handle the next step
    toast.success("Información de envío guardada.")
  }

  const colombianStates = [
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
  ]

  return (
    <Card className="shadow-lg bg-gray-800 border-gray-700 text-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold text-[#5D1A1D]">Información de Envío</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nombre</Label>
            <Input
              id="firstName"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Apellido</Label>
            <Input
              id="lastName"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={data.phone}
              onChange={handleChange}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              name="address"
              value={data.address}
              onChange={handleChange}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Ciudad</Label>
            <Input
              id="city"
              name="city"
              value={data.city}
              onChange={handleChange}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">Departamento</Label>
            <Select
              name="state"
              value={data.state}
              onValueChange={(value) => handleSelectChange("state", value)}
              required
            >
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white focus-ring">
                <SelectValue placeholder="Selecciona un departamento" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-gray-700">
                {colombianStates.map((state) => (
                  <SelectItem key={state} value={state} className="hover:bg-gray-700">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">Código Postal</Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={data.zipCode}
              onChange={handleChange}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">País</Label>
            <Input
              id="country"
              name="country"
              value={data.country}
              onChange={handleChange}
              readOnly
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
            />
          </div>
          <div className="md:col-span-2 flex items-center space-x-2 mt-4">
            <Checkbox
              id="billingSameAsShipping"
              checked={billingChecked}
              onCheckedChange={(checked) => setBillingChecked(checked as boolean)}
              className="border-[#5D1A1D] data-[state=checked]:bg-[#5D1A1D] data-[state=checked]:text-white"
            />
            <Label htmlFor="billingSameAsShipping" className="text-gray-300">
              La dirección de facturación es la misma que la de envío
            </Label>
          </div>
          <div className="md:col-span-2 mt-6">
            <Button type="submit" className="w-full bg-[#5D1A1D] hover:bg-[#4a1518] text-white py-2">
              Continuar al Pago
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
