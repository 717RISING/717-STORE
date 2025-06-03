"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Lock, User, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { verifyUserCredentials, isAdmin } from "@/lib/users"

interface AdminLoginProps {
  onLogin: (success: boolean) => void
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log("Intentando login de admin con:", { email, password })

    // Verificar credenciales del usuario
    const user = verifyUserCredentials(email, password)

    if (user && isAdmin(email)) {
      console.log("Login de admin exitoso!")

      // Guardar información del admin en localStorage
      localStorage.setItem("adminAuth", "authenticated")
      localStorage.setItem(
        "adminUser",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }),
      )

      toast({
        title: "✅ Acceso concedido",
        description: `Bienvenido al panel de administración, ${user.name}.`,
      })
      onLogin(true)
    } else if (user && !isAdmin(email)) {
      console.log("Usuario válido pero no es admin")
      toast({
        title: "❌ Acceso denegado",
        description: "No tienes permisos de administrador.",
        variant: "destructive",
      })
      onLogin(false)
    } else {
      console.log("Credenciales inválidas")
      toast({
        title: "❌ Credenciales inválidas",
        description: "Email o contraseña incorrectos.",
        variant: "destructive",
      })
      onLogin(false)
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center pb-8">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <Image src="/logo.png" alt="717 Logo" fill className="object-contain filter invert" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Panel de Administración</CardTitle>
          <p className="text-gray-400 text-sm mt-2">Solo para administradores autorizados</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="admin-email" className="block text-sm font-medium text-gray-300">
                Email de Administrador
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@717store.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-300">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña de administrador"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#5D1A1D] text-white hover:bg-[#6B1E22] font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Verificando acceso..." : "Acceder al Panel"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Panel exclusivo para administradores de 717 Store.
              <br />
              <span className="text-red-400">Acceso no autorizado prohibido.</span>
            </p>
          </div>

          {/* Información de credenciales para desarrollo */}
          <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-xs text-gray-400 text-center">
              <strong>Admin:</strong> 717days@gmail.com
              <br />
              <strong>Pass:</strong> JP7CR1DM7CM_STREETWEAR
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
