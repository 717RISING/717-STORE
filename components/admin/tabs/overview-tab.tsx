"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Users, ShoppingBag, Package, DollarSign, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import SalesChart from "@/components/admin/charts/sales-chart"
import VisitorsChart from "@/components/admin/charts/visitors-chart"
import ProductPerformanceChart from "@/components/admin/charts/product-performance-chart"
import SalesByRegionChart from "@/components/admin/charts/sales-by-region-chart"

export default function OverviewTab() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-500" />
              </div>
              <Badge variant="outline" className="border-green-500 text-green-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                12.5%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Ingresos Totales</p>
              <h3 className="text-3xl font-bold">$24,780</h3>
              <p className="text-gray-400 text-xs mt-1">Comparado con $22,032 el mes pasado</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-green-500" />
              </div>
              <Badge variant="outline" className="border-green-500 text-green-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                8.2%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Pedidos Totales</p>
              <h3 className="text-3xl font-bold">384</h3>
              <p className="text-gray-400 text-xs mt-1">Comparado con 355 el mes pasado</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <Badge variant="outline" className="border-green-500 text-green-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                5.3%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Nuevos Clientes</p>
              <h3 className="text-3xl font-bold">128</h3>
              <p className="text-gray-400 text-xs mt-1">Comparado con 121 el mes pasado</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-amber-500" />
              </div>
              <Badge variant="outline" className="border-red-500 text-red-400 flex items-center">
                <TrendingDown className="w-3 h-3 mr-1" />
                3.1%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Productos Vendidos</p>
              <h3 className="text-3xl font-bold">512</h3>
              <p className="text-gray-400 text-xs mt-1">Comparado con 528 el mes pasado</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Análisis de Rendimiento</h2>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36 bg-gray-900 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="24h">Últimas 24 horas</SelectItem>
              <SelectItem value="7d">Últimos 7 días</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
              <SelectItem value="90d">Últimos 90 días</SelectItem>
              <SelectItem value="1y">Último año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="border-gray-700 text-gray-400 hover:text-white">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Sales & Visitors Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-lg">Ventas</CardTitle>
              <Tabs defaultValue="revenue">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="revenue" className="data-[state=active]:bg-white data-[state=active]:text-black">
                    Ingresos
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="data-[state=active]:bg-white data-[state=active]:text-black">
                    Pedidos
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-80">
              <SalesChart />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-lg">Visitantes</CardTitle>
              <Tabs defaultValue="all">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-black">
                    Todos
                  </TabsTrigger>
                  <TabsTrigger value="new" className="data-[state=active]:bg-white data-[state=active]:text-black">
                    Nuevos
                  </TabsTrigger>
                  <TabsTrigger
                    value="returning"
                    className="data-[state=active]:bg-white data-[state=active]:text-black"
                  >
                    Recurrentes
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-80">
              <VisitorsChart />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Performance & Regional Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Rendimiento de Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ProductPerformanceChart />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Ventas por Región</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <SalesByRegionChart />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg">Pedidos Recientes</CardTitle>
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              Ver Todos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">ID Pedido</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Cliente</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Fecha</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Total</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "717001",
                    customer: "Juan Pérez",
                    date: "2024-01-15",
                    total: "$129.99",
                    status: "delivered",
                  },
                  {
                    id: "717002",
                    customer: "María López",
                    date: "2024-01-14",
                    total: "$89.98",
                    status: "shipped",
                  },
                  {
                    id: "717003",
                    customer: "Carlos Rodríguez",
                    date: "2024-01-14",
                    total: "$64.99",
                    status: "processing",
                  },
                  {
                    id: "717004",
                    customer: "Ana Martínez",
                    date: "2024-01-13",
                    total: "$54.98",
                    status: "cancelled",
                  },
                  {
                    id: "717005",
                    customer: "Roberto Sánchez",
                    date: "2024-01-13",
                    total: "$112.50",
                    status: "processing",
                  },
                ].map((order) => (
                  <tr key={order.id} className="border-b border-gray-800">
                    <td className="py-3 px-4">#{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{order.total}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={`
                          ${order.status === "delivered" && "border-green-600 text-green-400"}
                          ${order.status === "shipped" && "border-blue-600 text-blue-400"}
                          ${order.status === "processing" && "border-yellow-600 text-yellow-400"}
                          ${order.status === "cancelled" && "border-red-600 text-red-400"}
                        `}
                      >
                        {order.status === "delivered" && "Entregado"}
                        {order.status === "shipped" && "Enviado"}
                        {order.status === "processing" && "Procesando"}
                        {order.status === "cancelled" && "Cancelado"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Low Stock Products */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg">Productos con Bajo Stock</CardTitle>
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              Ver Inventario
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Producto</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">SKU</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Categoría</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Stock</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Acción</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "BIG DREAMS T-SHIRT",
                    sku: "TS-BD-001",
                    category: "Camisetas",
                    stock: 3,
                  },
                  {
                    name: "URBAN HOODIE",
                    sku: "HD-UB-002",
                    category: "Sudaderas",
                    stock: 5,
                  },
                  {
                    name: "CLASSIC CAP",
                    sku: "CP-CL-004",
                    category: "Accesorios",
                    stock: 2,
                  },
                  {
                    name: "BUCKET HAT",
                    sku: "HT-BK-008",
                    category: "Accesorios",
                    stock: 4,
                  },
                ].map((product, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">{product.sku}</td>
                    <td className="py-3 px-4">{product.category}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="border-red-600 text-red-400">
                        {product.stock} unidades
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                        Reabastecer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
