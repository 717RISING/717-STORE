"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Package, Eye, Download, Truck, CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock orders data
const mockOrders = [
  {
    id: "717001",
    date: "2024-01-15",
    status: "delivered",
    total: 129.99,
    items: [
      {
        name: "BIG DREAMS T-SHIRT",
        size: "M",
        quantity: 1,
        price: 29.99,
        image: "/placeholder.svg?height=60&width=60",
      },
      { name: "URBAN HOODIE", size: "L", quantity: 1, price: 59.99, image: "/placeholder.svg?height=60&width=60" },
      { name: "CLASSIC CAP", size: "Única", quantity: 1, price: 24.99, image: "/placeholder.svg?height=60&width=60" },
    ],
    tracking: "717TRK001",
    shippingAddress: "123 Main St, Ciudad, Estado 12345",
  },
  {
    id: "717002",
    date: "2024-01-10",
    status: "shipped",
    total: 89.98,
    items: [
      { name: "STREET PANTS", size: "32", quantity: 1, price: 49.99, image: "/placeholder.svg?height=60&width=60" },
      { name: "CARGO SHORTS", size: "30", quantity: 1, price: 39.99, image: "/placeholder.svg?height=60&width=60" },
    ],
    tracking: "717TRK002",
    shippingAddress: "123 Main St, Ciudad, Estado 12345",
  },
  {
    id: "717003",
    date: "2024-01-05",
    status: "processing",
    total: 64.99,
    items: [{ name: "ZIP HOODIE", size: "M", quantity: 1, price: 64.99, image: "/placeholder.svg?height=60&width=60" }],
    tracking: null,
    shippingAddress: "123 Main St, Ciudad, Estado 12345",
  },
  {
    id: "717004",
    date: "2023-12-20",
    status: "cancelled",
    total: 54.98,
    items: [
      { name: "GRAPHIC TEE", size: "L", quantity: 1, price: 32.99, image: "/placeholder.svg?height=60&width=60" },
      { name: "BUCKET HAT", size: "L/XL", quantity: 1, price: 27.99, image: "/placeholder.svg?height=60&width=60" },
    ],
    tracking: null,
    shippingAddress: "123 Main St, Ciudad, Estado 12345",
  },
]

const statusConfig = {
  processing: { label: "Procesando", color: "border-yellow-600 text-yellow-400", icon: Clock },
  shipped: { label: "Enviado", color: "border-blue-600 text-blue-400", icon: Truck },
  delivered: { label: "Entregado", color: "border-green-600 text-green-400", icon: CheckCircle },
  cancelled: { label: "Cancelado", color: "border-red-600 text-red-400", icon: XCircle },
}

export default function OrdersTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: keyof typeof statusConfig) => {
    const IconComponent = statusConfig[status].icon
    return <IconComponent className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mis Pedidos</h1>
        <p className="text-gray-400">Gestiona y rastrea todos tus pedidos</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por número de pedido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-400"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-gray-900 border-gray-700 text-white">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700">
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="processing">Procesando</SelectItem>
            <SelectItem value="shipped">Enviado</SelectItem>
            <SelectItem value="delivered">Entregado</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Pedido #{order.id}
                  </CardTitle>
                  <p className="text-gray-400 text-sm">Realizado el {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className={statusConfig[order.status as keyof typeof statusConfig].color}>
                    {getStatusIcon(order.status as keyof typeof statusConfig)}
                    <span className="ml-1">{statusConfig[order.status as keyof typeof statusConfig].label}</span>
                  </Badge>
                  <p className="text-xl font-bold">${order.total}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                    <div className="w-12 h-12 relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-400 text-sm">
                        Talla: {item.size} • Cantidad: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">${item.price}</p>
                  </div>
                ))}
              </div>

              {/* Order Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-800">
                <Button
                  variant="outline"
                  onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {selectedOrder === order.id ? "Ocultar" : "Ver"} Detalles
                </Button>
                {order.tracking && (
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    <Truck className="w-4 h-4 mr-2" />
                    Rastrear Pedido
                  </Button>
                )}
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Factura
                </Button>
                {order.status === "delivered" && (
                  <Button className="bg-white text-black hover:bg-gray-200">Comprar de Nuevo</Button>
                )}
              </div>

              {/* Order Details (Expandable) */}
              {selectedOrder === order.id && (
                <div className="mt-4 pt-4 border-t border-gray-800 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Dirección de Envío</h4>
                      <p className="text-gray-400 text-sm">{order.shippingAddress}</p>
                    </div>
                    {order.tracking && (
                      <div>
                        <h4 className="font-semibold mb-2">Número de Seguimiento</h4>
                        <p className="text-gray-400 text-sm font-mono">{order.tracking}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Resumen del Pedido</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subtotal:</span>
                        <span>${(order.total * 0.9).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Envío:</span>
                        <span>${(order.total * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold pt-2 border-t border-gray-800">
                        <span>Total:</span>
                        <span>${order.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold mb-2">No se encontraron pedidos</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || statusFilter !== "all"
                ? "Intenta ajustar tus filtros de búsqueda"
                : "Aún no has realizado ningún pedido"}
            </p>
            <Link href="/productos">
              <Button className="bg-white text-black hover:bg-gray-200">Explorar Productos</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
