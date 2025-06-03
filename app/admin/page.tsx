"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLogin from "@/components/admin/admin-login"
import AdminDashboard from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if admin is logged in on component mount
  useEffect(() => {
    // Verificar autenticación de ADMIN (separada de usuarios normales)
    const adminAuth = localStorage.getItem("adminAuth")
    const adminUser = localStorage.getItem("adminUser")

    console.log("Estado de auth de admin en localStorage:", adminAuth)
    console.log("Datos de admin en localStorage:", adminUser)

    if (adminAuth === "authenticated" && adminUser) {
      try {
        const userData = JSON.parse(adminUser)
        if (userData.role === "admin") {
          setIsLoggedIn(true)
        } else {
          // Si no es admin, limpiar localStorage
          localStorage.removeItem("adminAuth")
          localStorage.removeItem("adminUser")
        }
      } catch (error) {
        console.error("Error parsing admin user data:", error)
        localStorage.removeItem("adminAuth")
        localStorage.removeItem("adminUser")
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (success: boolean) => {
    console.log("handleLogin de admin llamado con:", success)
    if (success) {
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    console.log("Cerrando sesión de admin...")
    // Solo remover autenticación de admin, no de usuarios normales
    localStorage.removeItem("adminAuth")
    localStorage.removeItem("adminUser")
    setIsLoggedIn(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {isLoggedIn ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLogin={handleLogin} />}
    </div>
  )
}
