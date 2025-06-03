"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Lock, User, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface AdminLoginProps {
  onLogin: (success: boolean) => void
  adminEmail: string
  adminPassword: string
}

export default function AdminLogin({ onLogin, adminEmail, adminPassword }: AdminLoginProps) {
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

    console.log("Intentando login con:", { email, password })
    console.log("Credenciales esperadas:", { adminEmail, adminPassword })

    // Verificación exacta sin trim ni espacios
    if (email === "admin" && password === "admin123") {
      console.log("Login exitoso!")
      toast({
        title: "✅ Acceso concedido",
        description: "Bienvenido al panel de administración de 717 Store.",
      })
      onLogin(true)
    } else {
      console.log("Login fallido!")
      toast({
        title: "❌ Acceso denegado",
        description: `Usuario: ${email} | Contraseña: ${password}`,
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
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Usuario"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
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
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Panel exclusivo para administradores de 717 Store.
              <br />
              Acceso no autorizado prohibido.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
