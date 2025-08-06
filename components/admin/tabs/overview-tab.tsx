"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Package, TrendingUp } from 'lucide-react'
import SalesChart from "@/components/admin/charts/sales-chart" // Default import
import { VisitorsChart } from "@/components/admin/charts/visitors-chart" // Named import
import { ProductPerformanceChart } from "@/components/admin/charts/product-performance-chart" // Named import
import { SalesByRegionChart } from "@/components/admin/charts/sales-by-region-chart" // Named import
import { SalesByProductChart } from "@/components/admin/charts/sales-by-product-chart" // Named import
import { SalesByChannelChart } from "@/components/admin/charts/sales-by-channel-chart" // Named import
import { CustomerAcquisitionChart } from "@/components/admin/charts/customer-acquisition-chart" // Named import
import { CustomerRetentionChart } from "@/components/admin/charts/customer-retention-chart" // Named import

export default function OverviewTab() {
  return (
    <div className="grid gap-6 p-4 md:p-6 bg-gray-900 text-white">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Ventas Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-gray-400">+20.1% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Clientes</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-gray-400">+180.1% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Productos Vendidos</CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-gray-400">+19% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Rendimiento</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-gray-400">+201 desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-gray-800 border-gray-700">
          <SalesChart />
        </Card>
        <Card className="col-span-3 bg-gray-800 border-gray-700">
          <VisitorsChart />
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 bg-gray-800 border-gray-700">
          <ProductPerformanceChart />
        </Card>
        <Card className="col-span-1 bg-gray-800 border-gray-700">
          <SalesByRegionChart />
        </Card>
        <Card className="col-span-1 bg-gray-800 border-gray-700">
          <SalesByProductChart />
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card className="col-span-1 bg-gray-800 border-gray-700">
          <SalesByChannelChart />
        </Card>
        <Card className="col-span-1 bg-gray-800 border-gray-700">
          <CustomerAcquisitionChart />
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-1">
        <Card className="col-span-1 bg-gray-800 border-gray-700">
          <CustomerRetentionChart />
        </Card>
      </div>
    </div>
  )
}
