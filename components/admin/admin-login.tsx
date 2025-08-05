"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { verifyUserCredentials } from "@/lib/users" // Importar la función de verificación

interface AdminLoginProps {
  onLoginSuccess: () => void
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const user = await verifyUserCredentials(email, password)

    if (user && user.isAdmin) {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al panel de administración.",
      })
      onLoginSuccess()
      router.push("/admin") // Redirigir al dashboard
    } else {
      toast({
        title: "Error de inicio de sesión",
        description: "Credenciales inválidas o no autorizado.",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-gray-900 text-white border-gray-800">
        <CardHeader className="text-center">
          <div className="relative mx-auto mb-4 h-16 w-16">
            <Image src="/logo.png" alt="717 Logo" fill className="object-contain filter invert" />
          </div>
          <CardTitle className="text-3xl font-bold">Acceso de Administrador</CardTitle>
          <CardDescription className="text-gray-400">Ingresa tus credenciales para acceder al panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="717days@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#5D1A1D]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="JP7CR1DM7CM_STREETWEAR"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#5D1A1D]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#5D1A1D] text-white hover:bg-[#6B1E22] focus:ring-[#4a1518] focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
