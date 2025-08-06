'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ShippingFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export default function ShippingForm({ onSubmit, initialData }: ShippingFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [email, setEmail] = useState(initialData?.email || '')
  const [address, setAddress] = useState(initialData?.address || '')
  const [city, setCity] = useState(initialData?.city || '')
  const [zip, setZip] = useState(initialData?.zip || '')
  const [country, setCountry] = useState(initialData?.country || '')
  const [errors, setErrors] = useState<any>({})

  const validate = () => {
    const newErrors: any = {}
    if (!name) newErrors.name = 'Nombre es requerido.'
    if (!email) newErrors.email = 'Email es requerido.'
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email inválido.'
    if (!address) newErrors.address = 'Dirección es requerida.'
    if (!city) newErrors.city = 'Ciudad es requerida.'
    if (!zip) newErrors.zip = 'Código Postal es requerido.'
    if (!country) newErrors.country = 'País es requerido.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({ name, email, address, city, zip, country })
    }
  }

  return (
    <Card className="p-6 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nombre Completo</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="space-y-2 col-span-full">
              <Label htmlFor="address" className="text-gray-700 dark:text-gray-300">Dirección</Label>
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-gray-700 dark:text-gray-300">Ciudad</Label>
              <Input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip" className="text-gray-700 dark:text-gray-300">Código Postal</Label>
              <Input
                id="zip"
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
              {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
            </div>
            <div className="space-y-2 col-span-full">
              <Label htmlFor="country" className="text-gray-700 dark:text-gray-300">País</Label>
              <Input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
              {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
            </div>
          </div>
          <Button type="submit" className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white">
            Continuar al Pago
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
