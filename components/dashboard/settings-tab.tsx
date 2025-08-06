'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { updateUser } from '@/lib/users'
import { toast } from 'sonner'
import { AdaptiveLoader } from '@/components/loaders/adaptive-loader' // Changed to named import

export function SettingsTab() {
  const { user, login } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast.error("No hay usuario autenticado.")
      return
    }

    setIsSaving(true)
    // Assuming updateUser returns { success: boolean, message?: string, user?: User }
    const result = await updateUser(user.id, { name, email })
    setIsSaving(false)

    if (result.success && result.user) {
      toast.success("Perfil actualizado exitosamente.")
      // Update context with new user data
      login(result.user)
    } else {
      toast.error(result.message || "Error al actualizar el perfil.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de Perfil</CardTitle>
        <CardDescription>Actualiza la información de tu cuenta.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@ejemplo.com"
              required
            />
          </div>
          <Button type="submit" disabled={isSaving}>
            <AdaptiveLoader isVisible={isSaving} size="sm" className="mr-2" />
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
