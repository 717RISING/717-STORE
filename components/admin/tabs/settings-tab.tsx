"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

export function SettingsTab() {
  const [storeName, setStoreName] = useState('717 Store')
  const [contactEmail, setContactEmail] = useState('info@717store.com')
  const [currency, setCurrency] = useState('USD')
  const [enablePromotions, setEnablePromotions] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    // Simulate API call to update settings
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    toast({
      title: "Configuración Guardada",
      description: "La configuración de la tienda ha sido actualizada exitosamente.",
      variant: "default",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información General de la Tienda</CardTitle>
          <CardDescription>Actualiza el nombre de tu tienda, email de contacto y moneda.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSaveSettings}>
            <div className="space-y-2">
              <Label htmlFor="store-name">Nombre de la Tienda</Label>
              <Input id="store-name" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email de Contacto</Label>
              <Input id="contact-email" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
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
                'Guardar Cambios'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferencias de Marketing</CardTitle>
          <CardDescription>Controla las opciones de marketing y promociones.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-promotions">Habilitar Promociones</Label>
              <Switch
                id="enable-promotions"
                checked={enablePromotions}
                onCheckedChange={setEnablePromotions}
              />
            </div>
            <Button onClick={handleSaveSettings} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar Preferencias'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
