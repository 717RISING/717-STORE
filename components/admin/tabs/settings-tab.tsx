"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function SettingsTab() {
  const [storeName, setStoreName] = useState("717 Store")
  const [contactEmail, setContactEmail] = useState("info@717store.com")
  const [shippingPolicy, setShippingPolicy] = useState("Envío gratuito en pedidos superiores a $200.000 COP. Entregas en 3-7 días hábiles.")
  const [returnPolicy, setReturnPolicy] = useState("Devoluciones aceptadas dentro de 30 días con el artículo sin usar y etiquetas originales.")
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const { toast } = useToast()

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call to save settings
    console.log("Saving settings:", {
      storeName,
      contactEmail,
      shippingPolicy,
      returnPolicy,
      maintenanceMode,
    })
    toast({
      title: "Configuración Guardada",
      description: "Los ajustes de la tienda han sido actualizados.",
      variant: "success",
    })
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Configuración de la Tienda</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div>
            <Label htmlFor="store-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre de la Tienda
            </Label>
            <Input
              id="store-name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Correo Electrónico de Contacto
            </Label>
            <Input
              id="contact-email"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="shipping-policy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Política de Envíos
            </Label>
            <Textarea
              id="shipping-policy"
              value={shippingPolicy}
              onChange={(e) => setShippingPolicy(e.target.value)}
              rows={4}
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="return-policy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Política de Devoluciones
            </Label>
            <Textarea
              id="return-policy"
              value={returnPolicy}
              onChange={(e) => setReturnPolicy(e.target.value)}
              rows={4}
              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="maintenance-mode" className="text-lg text-gray-700 dark:text-gray-300">
              Modo Mantenimiento
            </Label>
            <Switch
              id="maintenance-mode"
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
              className="data-[state=checked]:bg-[#4A1518] data-[state=unchecked]:bg-gray-300"
            />
          </div>
          <Button type="submit" className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
            Guardar Configuración
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
