"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLogin from "@/components/admin/admin-login"
import AdminDashboard from "@/components/admin/admin-dashboard"
import { isAdmin as checkIsAdmin } from "@/lib/users" // Importar la función isAdmin
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // En una aplicación real, esto se verificaría con una sesión de usuario persistente (cookies, tokens)
    // Por ahora, simulamos una verificación rápida.
    const checkAuth = async () => {
      // Simular que el admin está logueado si hay un "token" o estado en localStorage
      const adminEmail = localStorage.getItem("adminEmail")
      if (adminEmail) {
        const adminStatus = await checkIsAdmin(adminEmail)
        setIsAuthenticated(adminStatus)
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    // En una aplicación real, guardarías un token o estado de sesión aquí
    localStorage.setItem("adminEmail", "717days@gmail.com") // Simulación de sesión
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("adminEmail") // Limpiar simulación de sesión
    router.push("/admin") // Redirigir a la página de login
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-black text-white">Cargando...</div>
  }

  return isAuthenticated ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onLoginSuccess={handleLoginSuccess} />
  )
}
