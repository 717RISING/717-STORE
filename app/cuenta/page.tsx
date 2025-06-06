"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { User, Package, LogOut, Edit, CreditCard, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"
import ProfileLoader from "@/components/loaders/profile-loader"

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
  const [activeTab, setActiveTab] = useState("profile")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
  })

  // Modificar el useEffect para redirigir al login si no está autenticado
  useEffect(() => {
    const userAuth = localStorage.getItem("userAuth")
    const storedUserName = localStorage.getItem("userName")

    if (userAuth === "authenticated") {
      setIsAuthenticated(true)
      if (storedUserName) {
        setUserName(storedUserName)
        setEditData((prev) => ({ ...prev, name: storedUserName }))
      }
    } else {
      // Si no está autenticado, redirigir al login
      window.location.href = "/login"
    }
  }, [])

  const handleSaveProfile = () => {
    // Aquí guardarías los datos en la base de datos
    localStorage.setItem("userName", editData.name)
    setUserName(editData.name)
    setIsEditing(false)
  }

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

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <Image
                    src={userData.avatar || "/placeholder.svg"}
                    alt={userName || userData.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <CardTitle className="text-white">{userName || userData.name}</CardTitle>
                <p className="text-gray-400 text-sm">{editData.email}</p>
                <Badge variant="outline" className="border-gray-600 text-gray-300 mt-2">
                  Cliente desde {new Date(userData.joinDate).getFullYear()}
                </Badge>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "profile" ? "bg-[#5D1A1D] text-white" : "hover:bg-gray-800"
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span>Mi Perfil</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === "orders" ? "bg-[#5D1A1D] text-white" : "hover:bg-gray-800"
                    }`}
                  >
                    <Package className="w-5 h-5" />
                    <span>Mis Pedidos</span>
                  </button>
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-800">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    onClick={handleLogout}
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
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
                    <p className="text-gray-400">Gestiona tu información personal</p>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancelar" : "Editar"}
                  </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Total de Pedidos</p>
                          <p className="text-3xl font-bold">{userData.totalOrders}</p>
                        </div>
                        <Package className="w-10 h-10 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Total Gastado</p>
                          <p className="text-3xl font-bold">${userData.totalSpent}</p>
                        </div>
                        <CreditCard className="w-10 h-10 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Profile Information */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Información Personal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Nombre Completo</label>
                        {isEditing ? (
                          <Input
                            value={editData.name}
                            onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        ) : (
                          <p className="text-white bg-gray-800 px-3 py-2 rounded-md">{editData.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Correo Electrónico</label>
                        {isEditing ? (
                          <Input
                            value={editData.email}
                            onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        ) : (
                          <p className="text-white bg-gray-800 px-3 py-2 rounded-md">{editData.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                        {isEditing ? (
                          <Input
                            value={editData.phone}
                            onChange={(e) => setEditData((prev) => ({ ...prev, phone: e.target.value }))}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        ) : (
                          <p className="text-white bg-gray-800 px-3 py-2 rounded-md">{editData.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Dirección</label>
                        {isEditing ? (
                          <Input
                            value={editData.address}
                            onChange={(e) => setEditData((prev) => ({ ...prev, address: e.target.value }))}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        ) : (
                          <p className="text-white bg-gray-800 px-3 py-2 rounded-md">{editData.address}</p>
                        )}
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-4 pt-4">
                        <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
                          Guardar Cambios
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          className="border-gray-600 text-white hover:bg-gray-800"
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Mis Pedidos</h1>
                  <p className="text-gray-400">Historial completo de tus compras</p>
                </div>

                <div className="space-y-4">
                  {userOrders.map((order) => (
                    <Card key={order.id} className="bg-gray-900 border-gray-800">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">Pedido #{order.id}</h3>
                              <p className="text-gray-400 text-sm">
                                {new Date(order.date).toLocaleDateString()} • {order.items} artículo
                                {order.items > 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <Badge
                              variant="outline"
                              className={statusConfig[order.status as keyof typeof statusConfig].color}
                            >
                              {statusConfig[order.status as keyof typeof statusConfig].label}
                            </Badge>
                            <div className="text-right">
                              <p className="text-xl font-bold">${order.total}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-800">
                          <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-800">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalles
                          </Button>
                          {order.tracking && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600 text-white hover:bg-gray-800"
                            >
                              <Package className="w-4 h-4 mr-2" />
                              Rastrear
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-800">
                            <Download className="w-4 h-4 mr-2" />
                            Factura
                          </Button>
                          {order.status === "delivered" && (
                            <Button size="sm" className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">
                              Comprar de Nuevo
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {userOrders.length === 0 && (
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="text-center py-12">
                      <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                      <h3 className="text-xl font-semibold mb-2">No tienes pedidos aún</h3>
                      <p className="text-gray-400 mb-6">¡Explora nuestros productos y realiza tu primera compra!</p>
                      <Link href="/productos">
                        <Button className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">Explorar Productos</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
