'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function ProfileTab() {
  const { user, login } = useAuth() // Assuming login can update the user context
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    // Simulate API call to update user profile
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (user) {
      const updatedUser = { ...user, name, email, phone }
      // In a real app, you'd call an API to update the user in the database
      // For now, we'll just update the local context
      login(updatedUser) // Update user in context
      toast.success('Perfil actualizado exitosamente.')
    } else {
      toast.error('No se pudo actualizar el perfil. Usuario no encontrado.')
    }
    setIsSaving(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de Perfil</CardTitle>
        <CardDescription>Actualiza tu información personal y de contacto.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
            <p className="text-sm text-muted-foreground">El correo electrónico no se puede cambiar.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Número de Teléfono</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
