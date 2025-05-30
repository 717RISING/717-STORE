"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { User, Package, Settings, Heart, MapPin, CreditCard, LogOut, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"
import ProfileTab from "@/components/dashboard/profile-tab"
import OrdersTab from "@/components/dashboard/orders-tab"
import AddressesTab from "@/components/dashboard/addresses-tab"
import PaymentTab from "@/components/dashboard/payment-tab"
import WishlistTab from "@/components/dashboard/wishlist-tab"
import SettingsTab from "@/components/dashboard/settings-tab"

// Mock user data
const userData = {
  id: "1",
  name: "Juan Pérez",
  email: "juan.perez@email.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=100&width=100",
  joinDate: "2023-01-15",
  totalOrders: 12,
  totalSpent: 1247.85,
  loyaltyPoints: 2495,
}

export default function AccountDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="px-4 py-6 bg-transparent border-b border-gray-800">
        <nav className="max-w-7xl mx-auto">
          {/* Top Row - Icons Only */}
          <div className="flex justify-end items-center mb-4">
            <div className="flex items-center space-x-4">
              <Link href="/cuenta" className="text-white hover:text-gray-300 transition-colors">
                <User className="w-6 h-6" />
              </Link>
              <CartSidebar />
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center">
              <div className="w-16 h-16 relative">
                <Image src="/logo.png" alt="717 Logo" fill className="object-contain filter invert" priority />
              </div>
            </Link>
          </div>

          {/* Bottom Row - Navigation Links */}
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

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <Image
                    src={userData.avatar || "/placeholder.svg"}
                    alt={userData.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <CardTitle className="text-white">{userData.name}</CardTitle>
                <p className="text-gray-400 text-sm">{userData.email}</p>
                <Badge variant="outline" className="border-gray-600 text-gray-300 mt-2">
                  Miembro desde {new Date(userData.joinDate).getFullYear()}
                </Badge>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "overview" ? "bg-white text-black" : "hover:bg-gray-800"
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span>Resumen</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "orders" ? "bg-white text-black" : "hover:bg-gray-800"
                    }`}
                  >
                    <Package className="w-5 h-5" />
                    <span>Mis Pedidos</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "profile" ? "bg-white text-black" : "hover:bg-gray-800"
                    }`}
                  >
                    <Edit className="w-5 h-5" />
                    <span>Mi Perfil</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("addresses")}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "addresses" ? "bg-white text-black" : "hover:bg-gray-800"
                    }`}
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Direcciones</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("payment")}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "payment" ? "bg-white text-black" : "hover:bg-gray-800"
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Métodos de Pago</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "wishlist" ? "bg-white text-black" : "hover:bg-gray-800"
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                    <span>Lista de Deseos</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "settings" ? "bg-white text-black" : "hover:bg-gray-800"
                    }`}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Configuración</span>
                  </button>
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-800">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Cerrar Sesión
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Bienvenido, {userData.name.split(" ")[0]}!</h1>
                  <p className="text-gray-400">Aquí tienes un resumen de tu cuenta</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Total de Pedidos</p>
                          <p className="text-2xl font-bold">{userData.totalOrders}</p>
                        </div>
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Total Gastado</p>
                          <p className="text-2xl font-bold">${userData.totalSpent}</p>
                        </div>
                        <CreditCard className="w-8 h-8 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Puntos de Lealtad</p>
                          <p className="text-2xl font-bold">{userData.loyaltyPoints}</p>
                        </div>
                        <Heart className="w-8 h-8 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Orders */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Pedidos Recientes</CardTitle>
                      <Button
                        variant="ghost"
                        onClick={() => setActiveTab("orders")}
                        className="text-gray-400 hover:text-white"
                      >
                        Ver todos
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((order) => (
                        <div key={order} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-semibold">Pedido #717{order.toString().padStart(3, "0")}</p>
                              <p className="text-gray-400 text-sm">
                                {new Date(Date.now() - order * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${(Math.random() * 200 + 50).toFixed(2)}</p>
                            <Badge variant="outline" className="border-green-600 text-green-400">
                              Entregado
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "orders" && <OrdersTab />}
            {activeTab === "profile" && <ProfileTab userData={userData} />}
            {activeTab === "addresses" && <AddressesTab />}
            {activeTab === "payment" && <PaymentTab />}
            {activeTab === "wishlist" && <WishlistTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  )
}
