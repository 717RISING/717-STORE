"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface ShippingFormProps {
  onSubmit: (details: { name: string; address: string; city: string; postalCode: string; country: string; phone: string }) => void
  initialData?: { name: string; address: string; city: string; postalCode: string; country: string; phone: string }
}

export function ShippingForm({ onSubmit, initialData }: ShippingFormProps) {
  const [name, setName] = useState(initialData?.name || "")
  const [address, setAddress] = useState(initialData?.address || "")
  const [city, setCity] = useState(initialData?.city || "")
  const [postalCode, setPostalCode] = useState(initialData?.postalCode || "")
  const [country, setCountry] = useState(initialData?.country || "")
  const [phone, setPhone] = useState(initialData?.phone || "")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!name.trim()) newErrors.name = "El nombre es obligatorio."
    if (!address.trim()) newErrors.address = "La dirección es obligatoria."
    if (!city.trim()) newErrors.city = "La ciudad es obligatoria."
    if (!postalCode.trim()) newErrors.postalCode = "El código postal es obligatorio."
    if (!country.trim()) newErrors.country = "El país es obligatorio."
    if (!phone.trim() || !/^\d{7,10}$/.test(phone)) newErrors.phone = "Teléfono inválido (7-10 dígitos)."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({ name, address, city, postalCode, country, phone })
    } else {
      toast({
        title: "Error de validación",
        description: "Por favor, corrige los errores en el formulario de envío.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-none border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Información de Envío</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Ingresa tus datos para el envío del pedido.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Tu nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              type="text"
              placeholder="Calle, número, apartamento, etc."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                type="text"
                placeholder="Tu ciudad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Código Postal</Label>
              <Input
                id="postalCode"
                type="text"
                placeholder="Tu código postal"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
              {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">País</Label>
            <Input
              id="country"
              type="text"
              placeholder="Tu país"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Ej: 3101234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <Button type="submit" className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white">
            Continuar al Pago
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
