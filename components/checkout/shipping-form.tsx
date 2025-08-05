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
import type { ShippingInfo } from "@/lib/database"

interface ShippingFormProps {
  onShippingInfoChange: (info: ShippingInfo) => void
  initialShippingInfo?: ShippingInfo
}

export default function ShippingForm({ onShippingInfoChange, initialShippingInfo }: ShippingFormProps) {
  const [firstName, setFirstName] = useState(initialShippingInfo?.firstName || "")
  const [lastName, setLastName] = useState(initialShippingInfo?.lastName || "")
  const [email, setEmail] = useState(initialShippingInfo?.email || "")
  const [phone, setPhone] = useState(initialShippingInfo?.phone || "")
  const [address, setAddress] = useState(initialShippingInfo?.address || "")
  const [city, setCity] = useState(initialShippingInfo?.city || "")
  const [state, setState] = useState(initialShippingInfo?.state || "")
  const [zipCode, setZipCode] = useState(initialShippingInfo?.zipCode || "")
  const [country, setCountry] = useState(initialShippingInfo?.country || "Colombia") // Default country
  const [cost, setCost] = useState(initialShippingInfo?.cost || 0) // Default shipping cost
  const [billingChecked, setBillingChecked] = useState(true)

  useEffect(() => {
    onShippingInfoChange({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      country,
      cost,
    })
  }, [firstName, lastName, email, phone, address, city, state, zipCode, country, cost, onShippingInfoChange])

  useEffect(() => {
    setCountry("Colombia") // Default country
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Basic validation
    if (!firstName || !lastName || !email || !phone || !address || !city || !state || !zipCode) {
      toast.error("Por favor, completa todos los campos de envío.")
      return
    }
    if (!validateEmail(email)) {
      toast.error("Por favor, introduce un email válido.")
      return
    }
    // If validation passes, the parent component will handle the next step
    toast.success("Información de envío guardada.")
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Apellido</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Ciudad</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">Departamento</Label>
            <Select value={state} onValueChange={(value) => setState(value)} required>
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white focus-ring">
                <SelectValue placeholder="Selecciona un departamento" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-gray-700">
                {colombianStates.map((stateOption) => (
                  <SelectItem key={stateOption} value={stateOption} className="hover:bg-gray-700">
                    {stateOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">Código Postal</Label>
            <Input
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-ring"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">País</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="country" className="w-full bg-gray-700 border-gray-600 text-white focus-ring">
                <SelectValue placeholder="Selecciona un país" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-gray-700">
                <SelectItem value="Colombia">Colombia</SelectItem>
                <SelectItem value="Mexico">México</SelectItem>
                <SelectItem value="Spain">España</SelectItem>
                <SelectItem value="USA">Estados Unidos</SelectItem>
                {/* Add more countries as needed */}
              </SelectContent>
            </Select>
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
