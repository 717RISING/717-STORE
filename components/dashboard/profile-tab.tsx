"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Edit, Save, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface ProfileTabProps {
  userData: {
    id: string
    name: string
    email: string
    phone: string
    avatar: string
    joinDate: string
  }
}

export default function ProfileTab({ userData }: ProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    bio: "Amante del streetwear y la moda urbana. Siempre buscando las últimas tendencias.",
    birthDate: "1990-05-15",
    gender: "male",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Perfil actualizado",
      description: "Tus cambios han sido guardados exitosamente.",
    })

    setIsEditing(false)
    setIsLoading(false)
  }

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      bio: "Amante del streetwear y la moda urbana. Siempre buscando las últimas tendencias.",
      birthDate: "1990-05-15",
      gender: "male",
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
          <p className="text-gray-400">Gestiona tu información personal</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="bg-white text-black hover:bg-gray-200">
            <Edit className="w-4 h-4 mr-2" />
            Editar Perfil
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Foto de Perfil</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <Image
                src={userData.avatar || "/placeholder.svg"}
                alt={userData.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            {isEditing && (
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                <Upload className="w-4 h-4 mr-2" />
                Cambiar Foto
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Personal Information */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">
                    Nombre Completo
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-800 border-gray-700 text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-800 border-gray-700 text-white disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-gray-300">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-800 border-gray-700 text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate" className="text-gray-300">
                    Fecha de Nacimiento
                  </Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-gray-800 border-gray-700 text-white disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gender" className="text-gray-300">
                  Género
                </Label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 disabled:opacity-50"
                >
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                  <option value="prefer-not-to-say">Prefiero no decir</option>
                </select>
              </div>

              <div>
                <Label htmlFor="bio" className="text-gray-300">
                  Biografía
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  className="bg-gray-800 border-gray-700 text-white disabled:opacity-50 resize-none"
                  placeholder="Cuéntanos un poco sobre ti..."
                />
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <Button onClick={handleSave} disabled={isLoading} className="bg-white text-black hover:bg-gray-200">
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-800"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Account Information */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Información de la Cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-gray-300">ID de Usuario</Label>
              <p className="text-white font-mono">{userData.id}</p>
            </div>
            <div>
              <Label className="text-gray-300">Miembro Desde</Label>
              <p className="text-white">{new Date(userData.joinDate).toLocaleDateString()}</p>
            </div>
            <div>
              <Label className="text-gray-300">Estado de la Cuenta</Label>
              <p className="text-green-400 font-semibold">Activa</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
