"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function ProfileTab() {
  const [name, setName] = useState("Juan Pérez")
  const [email, setEmail] = useState("juan.perez@example.com")
  const [phone, setPhone] = useState("+1 (555) 123-4567")
  const [bio, setBio] = useState("Desarrollador de software apasionado por la tecnología y el diseño.")

  const handleSaveChanges = () => {
    // Aquí iría la lógica para guardar los cambios en la base de datos o API
    console.log("Guardando perfil:", { name, email, phone, bio })
    toast.success("Perfil actualizado correctamente.")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
        <p className="text-gray-400">Actualiza tu información personal y preferencias.</p>
      </div>

      {/* Profile Information Card */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white text-lg">Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-300">
              Nombre Completo
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-300">
              Correo Electrónico
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-gray-300">
              Teléfono
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="bio" className="text-gray-300">
              Biografía
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Password Change Card */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white text-lg">Cambiar Contraseña</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword" className="text-gray-300">
              Contraseña Actual
            </Label>
            <Input id="currentPassword" type="password" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div>
            <Label htmlFor="newPassword" className="text-gray-300">
              Nueva Contraseña
            </Label>
            <Input id="newPassword" type="password" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-gray-300">
              Confirmar Nueva Contraseña
            </Label>
            <Input id="confirmPassword" type="password" className="bg-gray-800 border-gray-700 text-white" />
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
