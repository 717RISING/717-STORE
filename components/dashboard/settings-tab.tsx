"use client"

import { useState } from "react"
import { Bell, Shield, Globe, Moon, Sun, Monitor, Mail, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsTab() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotionalEmails: true,
    newProducts: false,
    priceAlerts: true,
    twoFactorAuth: false,
    loginAlerts: true,
    theme: "system",
    language: "es",
  })
  const [storeName, setStoreName] = useState("717 Store")
  const [storeEmail, setStoreEmail] = useState("info@717store.com")
  const [storePhone, setStorePhone] = useState("+1 (555) 717-7177")
  const [storeAddress, setStoreAddress] = useState("123 Calle Ficticia, Ciudad, País")
  const [currency, setCurrency] = useState("USD")
  const [shippingCost, setShippingCost] = useState("15.00")
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("100.00")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

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

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case "light":
        return <Sun className="w-4 h-4" />
      case "dark":
        return <Moon className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Configuración de la Tienda</h1>
        <p className="text-gray-400">Gestiona los ajustes generales de tu tienda.</p>
      </div>

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

      {/* Notifications */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <Label className="text-white">Notificaciones por Email</Label>
                <p className="text-gray-400 text-sm">Recibe actualizaciones importantes por correo</p>
              </div>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-gray-400" />
              <div>
                <Label className="text-white">Notificaciones SMS</Label>
                <p className="text-gray-400 text-sm">Recibe mensajes de texto para pedidos urgentes</p>
              </div>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
            />
          </div>

          <div className="pl-8 space-y-4 border-l-2 border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Actualizaciones de Pedidos</Label>
                <p className="text-gray-400 text-sm">Estado de envío y entrega</p>
              </div>
              <Switch
                checked={settings.orderUpdates}
                onCheckedChange={(checked) => handleSettingChange("orderUpdates", checked)}
                disabled={!settings.emailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Emails Promocionales</Label>
                <p className="text-gray-400 text-sm">Ofertas especiales y descuentos</p>
              </div>
              <Switch
                checked={settings.promotionalEmails}
                onCheckedChange={(checked) => handleSettingChange("promotionalEmails", checked)}
                disabled={!settings.emailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Nuevos Productos</Label>
                <p className="text-gray-400 text-sm">Notificaciones de lanzamientos</p>
              </div>
              <Switch
                checked={settings.newProducts}
                onCheckedChange={(checked) => handleSettingChange("newProducts", checked)}
                disabled={!settings.emailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Alertas de Precio</Label>
                <p className="text-gray-400 text-sm">Cuando baje el precio de productos en tu lista</p>
              </div>
              <Switch
                checked={settings.priceAlerts}
                onCheckedChange={(checked) => handleSettingChange("priceAlerts", checked)}
                disabled={!settings.emailNotifications}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Seguridad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Autenticación de Dos Factores</Label>
              <p className="text-gray-400 text-sm">Agrega una capa extra de seguridad a tu cuenta</p>
            </div>
            <Switch
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Alertas de Inicio de Sesión</Label>
              <p className="text-gray-400 text-sm">Notificaciones cuando alguien acceda a tu cuenta</p>
            </div>
            <Switch
              checked={settings.loginAlerts}
              onCheckedChange={(checked) => handleSettingChange("loginAlerts", checked)}
            />
          </div>

          <div className="pt-4 border-t border-gray-800">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
              Cambiar Contraseña
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance & Language */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Apariencia e Idioma
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-white mb-2 block">Tema</Label>
              <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <div className="flex items-center gap-2">
                    {getThemeIcon(settings.theme)}
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      Claro
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      Oscuro
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      Sistema
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white mb-2 block">Idioma</Label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-white mb-2 block">Moneda</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="USD">USD - Dólar Estadounidense</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="MXN">MXN - Peso Mexicano</SelectItem>
                <SelectItem value="CAD">CAD - Dólar Canadiense</SelectItem>
              </SelectContent>
            </Select>
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

      {/* Account Actions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Acciones de Cuenta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
              Descargar Mis Datos
            </Button>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
              Exportar Historial de Pedidos
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/20 bg-transparent">
              Eliminar Cuenta
            </Button>
            <p className="text-gray-400 text-sm mt-2">
              Esta acción es permanente y no se puede deshacer. Todos tus datos serán eliminados.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveChanges} className="bg-white text-black hover:bg-gray-200">
          Guardar Cambios
        </Button>
      </div>
    </div>
  )
}
