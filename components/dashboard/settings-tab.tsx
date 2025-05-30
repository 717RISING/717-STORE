"use client"

import { useState } from "react"
import { Bell, Shield, Globe, Moon, Sun, Monitor, Mail, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

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
    currency: "USD",
  })
  const { toast } = useToast()

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))

    toast({
      title: "Configuración actualizada",
      description: "Tus preferencias han sido guardadas.",
    })
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
      <div>
        <h1 className="text-3xl font-bold mb-2">Configuración</h1>
        <p className="text-gray-400">Personaliza tu experiencia en 717 Store</p>
      </div>

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
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
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
            <Select value={settings.currency} onValueChange={(value) => handleSettingChange("currency", value)}>
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

      {/* Account Actions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Acciones de Cuenta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              Descargar Mis Datos
            </Button>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              Exportar Historial de Pedidos
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/20">
              Eliminar Cuenta
            </Button>
            <p className="text-gray-400 text-sm mt-2">
              Esta acción es permanente y no se puede deshacer. Todos tus datos serán eliminados.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
