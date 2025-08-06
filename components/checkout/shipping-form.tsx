'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { ShippingAddress } from '@/lib/types'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface ShippingFormProps {
  onSubmit: (data: ShippingAddress) => void;
  initialData?: ShippingAddress;
}

export function ShippingForm({ onSubmit, initialData }: ShippingFormProps) {
  const [fullName, setFullName] = useState(initialData?.fullName || '')
  const [address1, setAddress1] = useState(initialData?.address1 || '')
  const [address2, setAddress2] = useState(initialData?.address2 || '')
  const [city, setCity] = useState(initialData?.city || '')
  const [state, setState] = useState(initialData?.state || '')
  const [zipCode, setZipCode] = useState(initialData?.zipCode || '')
  const [country, setCountry] = useState(initialData?.country || 'Colombia')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
    if (!fullName || !address1 || !city || !state || !zipCode || !country) {
      toast.error('Por favor, completa todos los campos de envío obligatorios.')
      setIsLoading(false)
      return
    }

    // Simulate API call or processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    onSubmit({ fullName, address1, address2, city, state, zipCode, country })
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="fullName">Nombre Completo</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Tu Nombre Completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address1">Dirección Línea 1</Label>
        <Input
          id="address1"
          type="text"
          placeholder="Calle, número, etc."
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address2">Dirección Línea 2 (Opcional)</Label>
        <Input
          id="address2"
          type="text"
          placeholder="Apto, oficina, etc."
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input
            id="city"
            type="text"
            placeholder="Ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="state">Departamento/Estado</Label>
          <Input
            id="state"
            type="text"
            placeholder="Departamento/Estado"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="zipCode">Código Postal</Label>
          <Input
            id="zipCode"
            type="text"
            placeholder="Código Postal"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="country">País</Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger id="country">
              <SelectValue placeholder="Selecciona un país" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Colombia">Colombia</SelectItem>
              <SelectItem value="Mexico">México</SelectItem>
              <SelectItem value="Spain">España</SelectItem>
              {/* Add more countries as needed */}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Guardando Envío...
          </>
        ) : (
          "Continuar al Pago"
        )}
      </Button>
    </form>
  )
}
