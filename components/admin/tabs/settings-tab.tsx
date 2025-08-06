'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function SettingsTab() { // Changed to named export SettingsTab
  const [storeName, setStoreName] = useState('717 Store')
  const [contactEmail, setContactEmail] = useState('info@717store.com')
  const [storeAddress, setStoreAddress] = useState("Calle Ficticia 123, Ciudad Ejemplo")
  const [currency, setCurrency] = useState("USD")
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [shippingPolicy, setShippingPolicy] = useState("Política de envío estándar: 3-5 días hábiles.")
  const [returnPolicy, setReturnPolicy] = useState("Política de devolución: 30 días para cambios o reembolsos.")
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    // Simulate API call to save settings
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    toast.success("Configuración guardada exitosamente.")
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Configuración General de la Tienda</CardTitle>
          <CardDescription>Gestiona la información básica y operativa de tu tienda.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="storeName">Nombre de la Tienda</Label>
              <Input
                id="storeName"
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Nombre de tu tienda"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactEmail">Correo Electrónico de Contacto</Label>
              <Input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="contacto@tutienda.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="store-address">Dirección de la Tienda</Label>
              <Input id="store-address" value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currency">Moneda</Label>
              <Input id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
            </div>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar Configuración'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Modo Mantenimiento</CardTitle>
          <CardDescription>Habilita o deshabilita el modo mantenimiento para tu tienda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="maintenance-mode">Habilitar Modo Mantenimiento</Label>
            <Switch
              id="maintenance-mode"
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
            />
          </div>
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar Modo Mantenimiento'
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Políticas de la Tienda</CardTitle>
          <CardDescription>Edita las políticas de envío y devolución de tu tienda.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="shipping-policy">Política de Envío</Label>
              <Textarea
                id="shipping-policy"
                value={shippingPolicy}
                onChange={(e) => setShippingPolicy(e.target.value)}
                rows={5}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="return-policy">Política de Devolución</Label>
              <Textarea
                id="return-policy"
                value={returnPolicy}
                onChange={(e) => setReturnPolicy(e.target.value)}
                rows={5}
              />
            </div>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar Políticas'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
