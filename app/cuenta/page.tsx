"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { User, Package, LogOut, Edit, CreditCard, Eye, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"
import ProfileLoader from "@/components/loaders/profile-loader"
import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileTab } from "@/components/dashboard/profile-tab"
import { OrdersTab } from "@/components/dashboard/orders-tab"
import { AddressesTab } from "@/components/dashboard/addresses-tab"
import { PaymentTab } from "@/components/dashboard/payment-tab"
import { WishlistTab } from "@/components/dashboard/wishlist-tab"
import { SettingsTab } from "@/components/dashboard/settings-tab"

// Mock user data
const userData = {
  id: "1",
  name: "Juan Pérez",
  email: "juan.perez@email.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=100&width=100",
  joinDate: "2023-01-15",
  address: "Calle Principal 123, Ciudad, Estado 12345",
  totalOrders: 8,
  totalSpent: 847.5,
}

// Mock orders data
const userOrders = [
  {
    id: "717001",
    date: "2024-01-15",
    status: "delivered",
    total: 129.99,
    items: 3,
    tracking: "717TRK001",
  },
  {
    id: "717002",
    date: "2024-01-10",
    status: "shipped",
    total: 89.98,
    items: 2,
    tracking: "717TRK002",
  },
  {
    id: "717003",
    date: "2024-01-05",
    status: "processing",
    total: 64.99,
    items: 1,
    tracking: null,
  },
  {
    id: "717004",
    date: "2023-12-20",
    status: "delivered",
    total: 154.99,
    items: 4,
    tracking: "717TRK004",
  },
  {
    id: "717005",
    date: "2023-12-15",
    status: "delivered",
    total: 79.99,
    items: 2,
    tracking: "717TRK005",
  },
]

const statusConfig = {
  processing: { label: "Procesando", color: "border-yellow-600 text-yellow-400 bg-yellow-900/20" },
  shipped: { label: "Enviado", color: "border-blue-600 text-blue-400 bg-blue-900/20" },
  delivered: { label: "Entregado", color: "border-green-600 text-green-400 bg-green-900/20" },
}

export default function UserAccount() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")

  // Modificar el useEffect para redirigir al login si no está autenticado
  useEffect(() => {
    const userAuth = localStorage.getItem("userAuth")
    const storedUserName = localStorage.getItem("userName")

    if (userAuth === "authenticated") {
      setIsAuthenticated(true)
      if (storedUserName) {
        setUserName(storedUserName)
      }
    } else {
      // Si no está autenticado, redirigir al login
      window.location.href = "/login"
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userAuth")
    localStorage.removeItem("userName")
    window.location.href = "/"
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <ProfileLoader size="lg" userName={userName || "Usuario"} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="px-4 py-6 bg-transparent border-b border-gray-800">
        <nav className="max-w-7xl mx-auto">
          <div className="flex justify-end items-center mb-4">
            <div className="flex items-center space-x-4">
              <Link href="/cuenta" className="text-white hover:text-gray-300 transition-colors">
                <User className="w-6 h-6" />
              </Link>
              <CartSidebar />
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center">
              <div className="w-16 h-16 relative">
                <Image src="/logo.png" alt="717 Logo" fill className="object-contain filter invert" priority />
              </div>
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-gray-300 transition-colors font-medium">
                INICIO
              </Link>
              <Link href="/productos" className="text-white hover:text-gray-300 transition-colors font-medium">
                PRODUCTOS
              </Link>
              <Link href="/contacto" className="text-white hover:text-gray-300 transition-colors font-medium">
                CONTACTO
              </Link>
            </div>
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </nav>
      </header>

      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Mi Cuenta</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 gap-2 mb-6 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="profile" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
              Perfil
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="addresses" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
              Direcciones
            </TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
              Pago
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
              Lista de Deseos
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
              Configuración
            </TabsTrigger>
          </TabsList>

          <Suspense fallback={<ProfileLoader />}>
            <TabsContent value="profile">
              <ProfileTab />
            </TabsContent>
            <TabsContent value="orders">
              <OrdersTab />
            </TabsContent>
            <TabsContent value="addresses">
              <AddressesTab />
            </TabsContent>
            <TabsContent value="payment">
              <PaymentTab />
            </TabsContent>
            <TabsContent value="wishlist">
              <WishlistTab />
            </TabsContent>
            <TabsContent value="settings">
              <SettingsTab />
            </TabsContent>
          </Suspense>
        </Tabs>
      </div>
    </div>
  )
}
