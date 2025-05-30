"use client"

import { useState } from "react"
import { Save, Upload, Globe, Shield, Bell, Database, Palette } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function SettingsTab() {
  const [settings, setSettings] = useState({
    siteName: "717 Store",
    siteDescription: "Streetwear auténtico para la nueva generación",
    contactEmail: "info@717store.com",
    supportEmail: "soporte@717store.com",
    phone: "+1 (555) 717-0717",
    address: "717 Streetwear Avenue, Urban District, NY 10001",
    currency: "USD",
    language: "es",
    timezone: "America/New_York",
    emailNotifications: true,
    smsNotifications: false,
    inventoryAlerts: true,
    lowStockThreshold: 5,
    autoBackup: true,
    maintenanceMode: false,
  })

  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido aplicados exitosamente.",
    })
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Configuración del Sistema</h2>
        <Button onClick={handleSave} className="bg-white text-black hover:bg-gray-200">
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:text-black">
            <Globe className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-white data-[state=active]:text-black">
            <Bell className="w-4 h-4 mr-2" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:text-black">
            <Shield className="w-4 h-4 mr-2" />
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-white data-[state=active]:text-black">
            <Database className="w-4 h-4 mr-2" />
            Sistema
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName" className="text-gray-300">
                    Nombre del Sitio
                  </Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange("siteName", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
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
                    onChange={(e) => handleSettingChange("contactEmail", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="siteDescription" className="text-gray-300">
                  Descripción del Sitio
                </Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white resize-none"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-gray-300">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleSettingChange("phone", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="supportEmail" className="text-gray-300">
                    Email de Soporte
                  </Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-gray-300">
                  Dirección
                </Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleSettingChange("address", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="currency" className="text-gray-300">
                    Moneda
                  </Label>
                  <Select value={settings.currency} onValueChange={(value) => handleSettingChange("currency", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="USD">USD - Dólar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="MXN">MXN - Peso Mexicano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language" className="text-gray-300">
                    Idioma
                  </Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone" className="text-gray-300">
                    Zona Horaria
                  </Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="America/New_York">Nueva York</SelectItem>
                      <SelectItem value="America/Mexico_City">Ciudad de México</SelectItem>
                      <SelectItem value="Europe/Madrid">Madrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Logo y Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300">Logo Principal</Label>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                    <Palette className="w-8 h-8 text-gray-400" />
                  </div>
                  <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Logo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Configuración de Notificaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Notificaciones por Email</Label>
                  <p className="text-gray-400 text-sm">Recibir notificaciones importantes por correo</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Notificaciones SMS</Label>
                  <p className="text-gray-400 text-sm">Recibir alertas críticas por SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Alertas de Inventario</Label>
                  <p className="text-gray-400 text-sm">Notificar cuando el stock esté bajo</p>
                </div>
                <Switch
                  checked={settings.inventoryAlerts}
                  onCheckedChange={(checked) => handleSettingChange("inventoryAlerts", checked)}
                />
              </div>

              <div>
                <Label htmlFor="lowStockThreshold" className="text-gray-300">
                  Umbral de Stock Bajo
                </Label>
                <Input
                  id="lowStockThreshold"
                  type="number"
                  value={settings.lowStockThreshold}
                  onChange={(e) => handleSettingChange("lowStockThreshold", Number.parseInt(e.target.value))}
                  className="bg-gray-800 border-gray-700 text-white max-w-xs"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Configuración de Seguridad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-white mb-4 block">Cambiar Contraseña de Administrador</Label>
                <div className="space-y-4 max-w-md">
                  <Input
                    type="password"
                    placeholder="Contraseña actual"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Input
                    type="password"
                    placeholder="Nueva contraseña"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Input
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Button className="bg-white text-black hover:bg-gray-200">Cambiar Contraseña</Button>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-800">
                <Label className="text-white mb-4 block">Sesiones Activas</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">Sesión Actual</p>
                      <p className="text-gray-400 text-sm">Chrome en Windows • IP: 192.168.1.100</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-700 text-white">
                      Cerrar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Configuración del Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Respaldo Automático</Label>
                  <p className="text-gray-400 text-sm">Crear respaldos automáticos de la base de datos</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Modo Mantenimiento</Label>
                  <p className="text-gray-400 text-sm">Activar página de mantenimiento para usuarios</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                />
              </div>

              <div className="pt-6 border-t border-gray-800">
                <Label className="text-white mb-4 block">Acciones del Sistema</Label>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                    <Database className="w-4 h-4 mr-2" />
                    Crear Respaldo
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                    <Upload className="w-4 h-4 mr-2" />
                    Restaurar Respaldo
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                    Limpiar Caché
                  </Button>
                  <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/20">
                    Reiniciar Sistema
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
