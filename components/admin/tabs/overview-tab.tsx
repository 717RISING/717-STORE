'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Users, Package, TrendingUp } from 'lucide-react'
import { SalesChart } from '@/components/admin/charts/sales-chart'
import { VisitorsChart } from '@/components/admin/charts/visitors-chart'
import { ProductPerformanceChart } from '@/components/admin/charts/product-performance-chart'
import { SalesByRegionChart } from '@/components/admin/charts/sales-by-region-chart'
import { SalesByProductChart } from '@/components/admin/charts/sales-by-product-chart'
import { SalesByChannelChart } from '@/components/admin/charts/sales-by-channel-chart'
import { CustomerAcquisitionChart } from '@/components/admin/charts/customer-acquisition-chart'
import { CustomerRetentionChart } from '@/components/admin/charts/customer-retention-chart'

export function OverviewTab() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Ventas Totales</CardTitle>
          <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">$45,231.89</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">+20.1% desde el mes pasado</p>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Clientes</CardTitle>
          <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">+2350</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">+180.1% desde el mes pasado</p>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Productos Vendidos</CardTitle>
          <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">12,234</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">+19% desde el mes pasado</p>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Tasa de Conversión</CardTitle>
          <TrendingUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">+3.5%</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">+0.5% desde el mes pasado</p>
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Ventas (Últimos 6 meses)</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart />
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Visitantes del Sitio</CardTitle>
        </CardHeader>
        <CardContent>
          <VisitorsChart />
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Rendimiento de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductPerformanceChart />
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Ventas por Región</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesByRegionChart />
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Ventas por Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesByProductChart />
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Ventas por Canal</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesByChannelChart />
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Adquisición de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerAcquisitionChart />
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Retención de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerRetentionChart />
        </CardContent>
      </Card>
    </div>
  )
}

export default OverviewTab
