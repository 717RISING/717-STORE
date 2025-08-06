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
import { useTheme } from 'next-themes'
import { useFormState } from 'react-dom'
import { updateProfile, changePassword } from '@/app/actions'
import { Loader2 } from 'lucide-react'

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="bg-[#4A1518] hover:bg-[#6B1E22] text-white" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Cargando...
        </>
      ) : (
        text
      )}
    </Button>
  )
}

export default function SettingsTab() {
  const { theme, setTheme } = useTheme()
  const [profileState, profileAction] = useFormState(updateProfile, null)
  const [passwordState, passwordAction] = useFormState(changePassword, null)
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Configuración de la Tienda</h1>
        <p className="text-gray-400">Gestiona los ajustes generales de tu tienda.</p>
      </div>

      {/* Account Actions */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Configuración de Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={profileAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nombre Completo</Label>
              <Input id="name" name="name" type="text" defaultValue="Juan Pérez" className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
              <Input id="email" name="email" type="email" defaultValue="juan@email.com" className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
            </div>
            {profileState?.success && <p className="text-green-500 text-sm">{profileState.message}</p>}
            {profileState?.error && <p className="text-red-500 text-sm">{profileState.error}</p>}
            <SubmitButton text="Actualizar Perfil" />
          </form>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Cambiar Contraseña</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={passwordAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-gray-700 dark:text-gray-300">Contraseña Actual</Label>
              <Input id="currentPassword" name="currentPassword" type="password" className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-gray-700 dark:text-gray-300">Nueva Contraseña</Label>
              <Input id="newPassword" name="newPassword" type="password" className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirmar Nueva Contraseña</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
            </div>
            {passwordState?.success && <p className="text-green-500 text-sm">{passwordState.message}</p>}
            {passwordState?.error && <p className="text-red-500 text-sm">{passwordState.error}</p>}
            <SubmitButton text="Cambiar Contraseña" />
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

      {/* Theme Preferences */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Preferencias de Tema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="text-gray-700 dark:text-gray-300">Modo Oscuro</Label>
            <Switch
              id="dark-mode"
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              className="data-[state=checked]:bg-[#4A1518]"
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Cambia entre el tema claro y oscuro para la interfaz de usuario.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
