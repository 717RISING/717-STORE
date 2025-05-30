"use client"

import { useState } from "react"
import { Calendar, Download, Filter, RefreshCw, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import SalesChart from "@/components/admin/charts/sales-chart"
import SalesByProductChart from "@/components/admin/charts/sales-by-product-chart"
import SalesByChannelChart from "@/components/admin/charts/sales-by-channel-chart"
import SalesByRegionChart from "@/components/admin/charts/sales-by-region-chart"

export default function SalesTab() {
  const [timeRange, setTimeRange] = useState("30d")
  const [salesView, setSalesView] = useState("daily")

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Análisis de Ventas</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="7d">Últimos 7 días</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
              <SelectItem value="90d">Últimos 90 días</SelectItem>
              <SelectItem value="1y">Último año</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>

          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">Ingresos Totales</p>
              <Badge variant="outline" className="border-green-500 text-green-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                12.5%
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mt-2">$24,780</h3>
            <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-xs">Mes Anterior</p>
                <p className="font-medium">$22,032</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs">Objetivo</p>
                <p className="font-medium">$30,000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">Pedidos Totales</p>
              <Badge variant="outline" className="border-green-500 text-green-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                8.2%
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mt-2">384</h3>
            <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-xs">Mes Anterior</p>
                <p className="font-medium">355</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs">Objetivo</p>
                <p className="font-medium">400</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">Valor Promedio</p>
              <Badge variant="outline" className="border-green-500 text-green-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                3.7%
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mt-2">$64.53</h3>
            <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-xs">Mes Anterior</p>
                <p className="font-medium">$62.20</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs">Objetivo</p>
                <p className="font-medium">$70.00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">Tasa de Conversión</p>
              <Badge variant="outline" className="border-red-500 text-red-400 flex items-center">
                <TrendingDown className="w-3 h-3 mr-1" />
                1.2%
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mt-2">3.2%</h3>
            <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-xs">Mes Anterior</p>
                <p className="font-medium">3.24%</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs">Objetivo</p>
                <p className="font-medium">4.0%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-white text-lg">Tendencia de Ventas</CardTitle>
            <div className="flex items-center space-x-2">
              <Tabs value={salesView} onValueChange={setSalesView}>
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="daily" className="data-[state=active]:bg-white data-[state=active]:text-black">
                    Diario
                  </TabsTrigger>
                  <TabsTrigger value="weekly" className="data-[state=active]:bg-white data-[state=active]:text-black">
                    Semanal
                  </TabsTrigger>
                  <TabsTrigger value="monthly" className="data-[state=active]:bg-white data-[state=active]:text-black">
                    Mensual
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" size="icon" className="border-gray-700 text-gray-400 hover:text-white">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-96">
            <SalesChart />
          </div>
        </CardContent>
      </Card>

      {/* Sales Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Ventas por Producto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <SalesByProductChart />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Ventas por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <SalesByChannelChart />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Sales */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white text-lg">Distribución Geográfica de Ventas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <SalesByRegionChart />
          </div>
        </CardContent>
      </Card>

      {/* Top Products Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg">Productos Más Vendidos</CardTitle>
            <Input
              type="text"
              placeholder="Buscar producto..."
              className="max-w-xs bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
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
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Unidades Vendidas</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Ingresos</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Tendencia</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "BIG DREAMS T-SHIRT",
                    sku: "TS-BD-001",
                    category: "Camisetas",
                    units: 128,
                    revenue: "$3,839.72",
                    trend: "up",
                  },
                  {
                    name: "URBAN HOODIE",
                    sku: "HD-UB-002",
                    category: "Sudaderas",
                    units: 96,
                    revenue: "$5,759.04",
                    trend: "up",
                  },
                  {
                    name: "STREET PANTS",
                    sku: "PT-ST-003",
                    category: "Pantalones",
                    units: 84,
                    revenue: "$4,199.16",
                    trend: "down",
                  },
                  {
                    name: "CLASSIC CAP",
                    sku: "CP-CL-004",
                    category: "Accesorios",
                    units: 72,
                    revenue: "$1,799.28",
                    trend: "up",
                  },
                  {
                    name: "OVERSIZED TEE",
                    sku: "TS-OV-005",
                    category: "Camisetas",
                    units: 68,
                    revenue: "$2,379.32",
                    trend: "down",
                  },
                ].map((product, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">{product.sku}</td>
                    <td className="py-3 px-4">{product.category}</td>
                    <td className="py-3 px-4">{product.units}</td>
                    <td className="py-3 px-4">{product.revenue}</td>
                    <td className="py-3 px-4">
                      {product.trend === "up" ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      )}
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
