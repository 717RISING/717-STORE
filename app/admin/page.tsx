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
    console.log("Estado de auth de admin en localStorage:", adminAuth)
    if (adminAuth === "authenticated") {
      setIsLoggedIn(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (success: boolean) => {
    console.log("handleLogin de admin llamado con:", success)
    if (success) {
      // Guardar autenticación de ADMIN (separada de usuarios)
      localStorage.setItem("adminAuth", "authenticated")
      console.log("Auth de admin guardado en localStorage")
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    console.log("Cerrando sesión de admin...")
    // Solo remover autenticación de admin, no de usuarios normales
    localStorage.removeItem("adminAuth")
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
      {isLoggedIn ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} adminEmail="admin" adminPassword="admin123" />
      )}
    </div>
  )
}
