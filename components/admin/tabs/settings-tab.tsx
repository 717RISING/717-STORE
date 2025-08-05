"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function SettingsTab() {
  const [storeName, setStoreName] = useState("717 Store")
  const [storeEmail, setStoreEmail] = useState("info@717store.com")
  const [storePhone, setStorePhone] = useState("+1 (555) 717-7177")
  const [storeAddress, setStoreAddress] = useState("123 Calle Ficticia, Ciudad, País")
  const [currency, setCurrency] = useState("USD")
  const [shippingCost, setShippingCost] = useState("15.00")
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("100.00")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  const handleSaveChanges = () => {
    // Aquí iría la lógica para guardar los cambios en la base de datos o API
    console.log("Guardando configuración:", {
      storeName,
      storeEmail,
      storePhone,
      storeAddress,
      currency,
      shippingCost,
      freeShippingThreshold,
      notificationsEnabled,
      maintenanceMode,
    })
    toast.success("Configuración guardada correctamente.")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Configuración de la Tienda</h1>
        <p className="text-gray-400">Gestiona los ajustes generales de tu tienda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="storeName" className="text-gray-300">
                Nombre de la Tienda
              </Label>
              <Input
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="storeEmail" className="text-gray-300">
                Correo Electrónico de Contacto
              </Label>
              <Input
                id="storeEmail"
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="storePhone" className="text-gray-300">
                Teléfono de Contacto
              </Label>
              <Input
                id="storePhone"
                type="tel"
                value={storePhone}
                onChange={(e) => setStorePhone(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="storeAddress" className="text-gray-300">
                Dirección de la Tienda
              </Label>
              <Textarea
                id="storeAddress"
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
                rows={4}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Financial Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Ajustes Financieros y de Envío</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currency" className="text-gray-300">
                Moneda
              </Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency" className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Selecciona una moneda" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="USD">Dólar Estadounidense (USD)</SelectItem>
                  <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  <SelectItem value="COP">Peso Colombiano (COP)</SelectItem>
                  {/* Añadir más monedas según sea necesario */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="shippingCost" className="text-gray-300">
                Costo de Envío Estándar
              </Label>
              <Input
                id="shippingCost"
                type="number"
                step="0.01"
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="freeShippingThreshold" className="text-gray-300">
                Umbral de Envío Gratuito
              </Label>
              <Input
                id="freeShippingThreshold"
                type="number"
                step="0.01"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Ajustes del Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notificationsEnabled" className="text-gray-300">
                Habilitar Notificaciones
              </Label>
              <Switch
                id="notificationsEnabled"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
                className="data-[state=checked]:bg-[#5D1A1D]"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenanceMode" className="text-gray-300">
                Modo Mantenimiento
              </Label>
              <Switch
                id="maintenanceMode"
                checked={maintenanceMode}
                onCheckedChange={setMaintenanceMode}
                className="data-[state=checked]:bg-[#5D1A1D]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveChanges} className="bg-white text-black hover:bg-gray-200">
          Guardar Cambios
        </Button>
      </div>
    </div>
  )
}
