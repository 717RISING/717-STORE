"use client"

import { useState } from "react"
import { Save, Bell, Shield, Database, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function SettingsTab() {
  const [settings, setSettings] = useState({
    siteName: "717 Store",
    siteDescription: "Tienda de streetwear y moda urbana",
    contactEmail: "717days@gmail.com",
    contactPhone: "+57 300 123 4567",
    address: "Bogotá, Colombia",
    emailNotifications: true,
    smsNotifications: false,
    lowStockAlerts: true,
    orderNotifications: true,
    maintenanceMode: false,
    autoBackup: true,
  })

  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "✅ Configuración guardada",
      description: "Los cambios se han aplicado correctamente.",
    })
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Configuración del Sistema</h1>
        <p className="text-gray-400">Administra la configuración general de la tienda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Información General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName" className="text-gray-300">
                Nombre del Sitio
              </Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleInputChange("siteName", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="siteDescription" className="text-gray-300">
                Descripción
              </Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="contactEmail" className="text-gray-300">
                Email de Contacto
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="contactPhone" className="text-gray-300">
                Teléfono
              </Label>
              <Input
                id="contactPhone"
                value={settings.contactPhone}
                onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="address" className="text-gray-300">
                Dirección
              </Label>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Notificaciones por Email</Label>
                <p className="text-sm text-gray-400">Recibir alertas por correo electrónico</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Notificaciones SMS</Label>
                <p className="text-sm text-gray-400">Recibir alertas por mensaje de texto</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleInputChange("smsNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Alertas de Stock Bajo</Label>
                <p className="text-sm text-gray-400">Notificar cuando el inventario esté bajo</p>
              </div>
              <Switch
                checked={settings.lowStockAlerts}
                onCheckedChange={(checked) => handleInputChange("lowStockAlerts", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Notificaciones de Pedidos</Label>
                <p className="text-sm text-gray-400">Alertas de nuevos pedidos</p>
              </div>
              <Switch
                checked={settings.orderNotifications}
                onCheckedChange={(checked) => handleInputChange("orderNotifications", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword" className="text-gray-300">
                Contraseña Actual
              </Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Ingresa tu contraseña actual"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="newPassword" className="text-gray-300">
                Nueva Contraseña
              </Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Ingresa una nueva contraseña"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirmar Contraseña
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirma la nueva contraseña"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
              Cambiar Contraseña
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Modo Mantenimiento</Label>
                <p className="text-sm text-gray-400">Desactivar temporalmente la tienda</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Respaldo Automático</Label>
                <p className="text-sm text-gray-400">Crear respaldos automáticos diarios</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => handleInputChange("autoBackup", checked)}
              />
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                Crear Respaldo Manual
              </Button>
              <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                Limpiar Caché del Sistema
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">
          <Save className="w-4 h-4 mr-2" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  )
}
