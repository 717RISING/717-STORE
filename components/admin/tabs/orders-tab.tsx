"use client"

import { useState } from "react"
import { Search, Filter, Eye, Download, Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const mockOrders = [
  {
    id: "717001",
    customer: "Juan Pérez",
    email: "juan@email.com",
    date: "2024-01-15",
    status: "delivered",
    total: 129.99,
    items: 3,
    shipping: "Calle Principal 123, Ciudad",
  },
  {
    id: "717002",
    customer: "María López",
    email: "maria@email.com",
    date: "2024-01-14",
    status: "shipped",
    total: 89.98,
    items: 2,
    shipping: "Av. Central 456, Ciudad",
  },
  {
    id: "717003",
    customer: "Carlos Rodríguez",
    email: "carlos@email.com",
    date: "2024-01-14",
    status: "processing",
    total: 64.99,
    items: 1,
    shipping: "Plaza Mayor 789, Ciudad",
  },
  {
    id: "717004",
    customer: "Ana Martínez",
    email: "ana@email.com",
    date: "2024-01-13",
    status: "cancelled",
    total: 54.98,
    items: 2,
    shipping: "Barrio Norte 321, Ciudad",
  },
  {
    id: "717005",
    customer: "Roberto Sánchez",
    email: "roberto@email.com",
    date: "2024-01-13",
    status: "processing",
    total: 112.5,
    items: 4,
    shipping: "Zona Sur 654, Ciudad",
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
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: keyof typeof statusConfig) => {
    const IconComponent = statusConfig[status].icon
    return <IconComponent className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Gestión de Pedidos</h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar pedido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="processing">Procesando</SelectItem>
              <SelectItem value="shipped">Enviado</SelectItem>
              <SelectItem value="delivered">Entregado</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Total Pedidos</p>
              <h3 className="text-3xl font-bold">384</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Procesando</p>
              <h3 className="text-3xl font-bold">28</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Enviados</p>
              <h3 className="text-3xl font-bold">156</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Entregados</p>
              <h3 className="text-3xl font-bold">200</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white text-lg">Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">ID Pedido</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Cliente</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Fecha</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Items</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Total</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Estado</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-800">
                    <td className="py-3 px-4">#{order.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-gray-400 text-sm">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{order.items}</td>
                    <td className="py-3 px-4">${order.total}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={statusConfig[order.status as keyof typeof statusConfig].color}
                      >
                        {getStatusIcon(order.status as keyof typeof statusConfig)}
                        <span className="ml-1">{statusConfig[order.status as keyof typeof statusConfig].label}</span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-white"
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Pedido #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Información del Cliente</h4>
                  <p className="text-gray-300">{selectedOrder.customer}</p>
                  <p className="text-gray-400 text-sm">{selectedOrder.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Estado del Pedido</h4>
                  <Badge
                    variant="outline"
                    className={statusConfig[selectedOrder.status as keyof typeof statusConfig].color}
                  >
                    {getStatusIcon(selectedOrder.status as keyof typeof statusConfig)}
                    <span className="ml-1">
                      {statusConfig[selectedOrder.status as keyof typeof statusConfig].label}
                    </span>
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Dirección de Envío</h4>
                <p className="text-gray-300">{selectedOrder.shipping}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Resumen del Pedido</h4>
                <div className="bg-gray-800 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal:</span>
                    <span>${(selectedOrder.total * 0.9).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Envío:</span>
                    <span>${(selectedOrder.total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-gray-700">
                    <span>Total:</span>
                    <span>${selectedOrder.total}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-gray-700">
                  Cerrar
                </Button>
                <Button className="bg-white text-black hover:bg-gray-200">Actualizar Estado</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
