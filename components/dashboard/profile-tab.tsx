"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/lib/auth-context' // Import useAuth

export function ProfileTab() {
  const { user, updateUserProfile, isLoading: isAuthLoading } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      if (user) {
        await updateUserProfile(user.id, { name, email })
        toast({
          title: "Perfil Actualizado",
          description: "Tu información de perfil ha sido guardada exitosamente.",
          variant: "default",
        })
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error al Actualizar",
        description: "Hubo un problema al guardar tu perfil. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información de Perfil</CardTitle>
          <CardDescription>Actualiza tu información personal y dirección de correo electrónico.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.avatar || "/placeholder-avatar.jpg"} alt={user?.name || "User"} />
              <AvatarFallback>{user?.name ? user.name.charAt(0) : 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{user?.name || 'Usuario'}</h3>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <form className="space-y-4" onSubmit={handleSaveProfile}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isAuthLoading || isSaving} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isAuthLoading || isSaving} />
              </div>
            </div>
            <Button type="submit" disabled={isAuthLoading || isSaving}>
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
    </div>
  )
}
