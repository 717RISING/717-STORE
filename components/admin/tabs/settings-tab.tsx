'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useTheme } from 'next-themes'

export function SettingsTab() {
  const { theme, setTheme } = useTheme()
  const [storeName, setStoreName] = useState('717 Store')
  const [contactEmail, setContactEmail] = useState('contacto@717store.com')
  const [shippingPolicy, setShippingPolicy] = useState('Envío gratuito en pedidos superiores a $150.000 COP. Entregas en 3-5 días hábiles.')
  const [returnPolicy, setReturnPolicy] = useState('Devoluciones aceptadas dentro de los 30 días posteriores a la compra, con el producto en su estado original.')
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [currency, setCurrency] = useState('COP')

  const handleSaveSettings = () => {
    // In a real application, this would send data to a backend API
    console.log('Guardando configuración:', {
      storeName,
      contactEmail,
      shippingPolicy,
      returnPolicy,
      maintenanceMode,
      currency,
      theme,
    })
    alert('Configuración guardada (simulado)!')
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Configuración de la Tienda</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="storeName" className="text-gray-700 dark:text-gray-300">Nombre de la Tienda</Label>
            <Input
              id="storeName"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail" className="text-gray-700 dark:text-gray-300">Email de Contacto</Label>
            <Input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shippingPolicy" className="text-gray-700 dark:text-gray-300">Política de Envío</Label>
          <Textarea
            id="shippingPolicy"
            value={shippingPolicy}
            onChange={(e) => setShippingPolicy(e.target.value)}
            rows={3}
            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="returnPolicy" className="text-gray-700 dark:text-gray-300">Política de Devoluciones</Label>
          <Textarea
            id="returnPolicy"
            value={returnPolicy}
            onChange={(e) => setReturnPolicy(e.target.value)}
            rows={3}
            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="maintenanceMode" className="text-gray-700 dark:text-gray-300">Modo Mantenimiento</Label>
            <Switch
              id="maintenanceMode"
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
              className="data-[state=checked]:bg-[#4A1518]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency" className="text-gray-700 dark:text-gray-300">Moneda</Label>
            <Input
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <Button onClick={handleSaveSettings} className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white">
          Guardar Configuración
        </Button>
      </CardContent>
    </Card>
  )
}

export default SettingsTab
