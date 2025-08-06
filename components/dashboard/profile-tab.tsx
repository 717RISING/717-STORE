"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface UserProfile {
  firstName: string
  lastName: string
  email: string
}

export function ProfileTab() {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  })
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setProfile((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = () => {
    // Simulate API call to save profile
    console.log("Saving profile:", profile)
    setIsEditing(false)
    toast({
      title: "Perfil Actualizado",
      description: "Tu información de perfil ha sido guardada.",
      variant: "success",
    })
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Mi Perfil</CardTitle>
        <Button onClick={() => setIsEditing(!isEditing)} className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
          {isEditing ? "Cancelar" : "Editar Perfil"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nombre
          </Label>
          <Input
            id="firstName"
            value={profile.firstName}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Apellido
          </Label>
          <Input
            id="lastName"
            value={profile.lastName}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Correo Electrónico
          </Label>
          <Input
            id="email"
            value={profile.email}
            readOnly
            className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed"
          />
        </div>
        {isEditing && (
          <Button onClick={handleSave} className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white">
            Guardar Cambios
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
