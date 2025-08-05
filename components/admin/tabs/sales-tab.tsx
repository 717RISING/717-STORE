"use client"

import { useState } from "react"
import { DollarSign, ShoppingBag, Users, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SalesChart from "@/components/admin/charts/sales-chart"
import SalesByProductChart from "@/components/admin/charts/sales-by-product-chart"
import SalesByChannelChart from "@/components/admin/charts/sales-by-channel-chart"

export default function SalesTab() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Análisis de Ventas</h2>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
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
          <Button
            variant="outline"
            size="icon"
            className="border-gray-700 text-gray-400 hover:text-white bg-transparent"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Sales Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Ingresos Netos</p>
              <h3 className="text-3xl font-bold">$0</h3>
              <p className="text-gray-400 text-xs mt-1">0% desde el mes pasado</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Pedidos Completados</p>
              <h3 className="text-3xl font-bold">0</h3>
              <p className="text-gray-400 text-xs mt-1">0% desde el mes pasado</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Valor Promedio del Pedido</p>
              <h3 className="text-3xl font-bold">$0</h3>
              <p className="text-gray-400 text-xs mt-1">0% desde el mes pasado</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Sales Chart */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg">Tendencia de Ventas</CardTitle>
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

      {/* Sales by Product & Channel Charts */}
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
    </div>
  )
}
