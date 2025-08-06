"use client"

import type React from "react"
import { useState } from "react"
import { Bell, Shield, Globe, Moon, Sun, Monitor, Mail, Smartphone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "@/lib/theme-context" // Named import for useTheme

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
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const { toast } = useToast()
  const { theme, setTheme } = useTheme() // Use named import

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

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (settings.newPassword !== settings.confirmNewPassword) {
      toast({
        title: "Error de Contraseña",
        description: "Las nuevas contraseñas no coinciden.",
        variant: "destructive",
      })
      return
    }
    // Simulate password change API call
    console.log("Changing password...")
    toast({
      title: "Contraseña Actualizada",
      description: "Tu contraseña ha sido cambiada exitosamente.",
      variant: "success",
    })
    setSettings((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }))
  }

  const handleNotificationsToggle = (checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notificationsEnabled: checked,
    }))
    toast({
      title: "Notificaciones",
      description: checked ? "Notificaciones activadas." : "Notificaciones desactivadas.",
      variant: "default",
    })
  }

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
    toast({
      title: "Tema Cambiado",
      description: `El tema ahora es ${checked ? "oscuro" : "claro"}.`,
      variant: "default",
    })
  }

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Configuración de la Tienda</h1>
        <p className="text-gray-400">Gestiona los ajustes generales de tu tienda.</p>
      </div>

      {/* Account Actions */}
      <h2 className="text-2xl font-bold text-white">Configuración de la Cuenta</h2>

      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name" className="text-gray-300">
              Nombre
            </Label>
            <Input id="first-name" defaultValue="Juan" className="bg-gray-700 border-gray-600 text-white" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name" className="text-gray-300">
              Apellido
            </Label>
            <Input id="last-name" defaultValue="Pérez" className="bg-gray-700 border-gray-600 text-white" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue="juan.perez@example.com"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <Button className="bg-[#5D1A1D] hover:bg-[#4a1518] text-white">Guardar Cambios</Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Seguridad de la Cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <Label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contraseña Actual
              </Label>
              <Input
                id="current-password"
                type="password"
                value={settings.currentPassword}
                onChange={(e) => setSettings((prev) => ({ ...prev, currentPassword: e.target.value }))}
                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nueva Contraseña
              </Label>
              <Input
                id="new-password"
                type="password"
                value={settings.newPassword}
                onChange={(e) => setSettings((prev) => ({ ...prev, newPassword: e.target.value }))}
                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirmar Nueva Contraseña
              </Label>
              <Input
                id="confirm-new-password"
                type="password"
                value={settings.confirmNewPassword}
                onChange={(e) => setSettings((prev) => ({ ...prev, confirmNewPassword: e.target.value }))}
                className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
            <Button type="submit" className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
              Cambiar Contraseña
            </Button>
          </form>
        </CardContent>
      </Card>

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
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Preferencias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-lg text-gray-700 dark:text-gray-300">
              Notificaciones por Correo Electrónico
            </Label>
            <Switch
              id="notifications"
              checked={settings.notificationsEnabled}
              onCheckedChange={handleNotificationsToggle}
              className="data-[state=checked]:bg-[#4A1518] data-[state=unchecked]:bg-gray-300"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="theme-toggle" className="text-lg text-gray-700 dark:text-gray-300">
              Modo Oscuro
            </Label>
            <Switch
              id="theme-toggle"
              checked={theme === "dark"}
              onCheckedChange={handleThemeToggle}
              className="data-[state=checked]:bg-[#4A1518] data-[state=unchecked]:bg-gray-300"
            />
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
  )
}
