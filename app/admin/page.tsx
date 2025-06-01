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
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "authenticated") {
      setIsLoggedIn(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (success: boolean) => {
    if (success) {
      localStorage.setItem("adminAuth", "authenticated")
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
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
        <AdminLogin onLogin={handleLogin} adminEmail="717days@gmail.com" adminPassword="JP7CR1DM7CM_STREETWEAR" />
      )}
    </div>
  )
}
