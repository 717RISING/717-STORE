"use client"

import { useState } from "react"
import { Search, Eye, Download, Package, Truck, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockOrders = [
  {
    id: "ORD-001",
    customer: "Juan Pérez",
    email: "juan@email.com",
    total: 125000,
    status: "Entregado",
    date: "2024-01-15",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "María García",
    email: "maria@email.com",
    total: 85000,
    status: "En Tránsito",
    date: "2024-01-14",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Carlos López",
    email: "carlos@email.com",
    total: 65000,
    status: "Procesando",
    date: "2024-01-13",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Ana Martínez",
    email: "ana@email.com",
    total: 95000,
    status: "Cancelado",
    date: "2024-01-12",
    items: 2,
  },
]

export default function OrdersTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Entregado":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Entregado
          </Badge>
        )
      case "En Tránsito":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Truck className="w-3 h-3 mr-1" />
            En Tránsito
          </Badge>
        )
      case "Procesando":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Package className="w-3 h-3 mr-1" />
            Procesando
          </Badge>
        )
      case "Cancelado":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelado
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Gestión de Pedidos</h1>
        <p className="text-gray-400">Administra y rastrea todos los pedidos de la tienda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Pedidos</p>
                <p className="text-2xl font-bold text-white">1,247</p>
              </div>
              <Package className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Procesando</p>
                <p className="text-2xl font-bold text-yellow-400">23</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                <Package className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">En Tránsito</p>
                <p className="text-2xl font-bold text-blue-400">45</p>
              </div>
              <Truck className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Entregados</p>
                <p className="text-2xl font-bold text-green-400">1,179</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por ID o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="Procesando">Procesando</SelectItem>
                <SelectItem value="En Tránsito">En Tránsito</SelectItem>
                <SelectItem value="Entregado">Entregado</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">ID Pedido</TableHead>
                <TableHead className="text-gray-400">Cliente</TableHead>
                <TableHead className="text-gray-400">Fecha</TableHead>
                <TableHead className="text-gray-400">Items</TableHead>
                <TableHead className="text-gray-400">Total</TableHead>
                <TableHead className="text-gray-400">Estado</TableHead>
                <TableHead className="text-gray-400">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="border-gray-800">
                  <TableCell className="font-medium text-white">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{order.customer}</p>
                      <p className="text-sm text-gray-400">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{order.date}</TableCell>
                  <TableCell className="text-gray-300">{order.items} items</TableCell>
                  <TableCell className="text-gray-300">${order.total.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
