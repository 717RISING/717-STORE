'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SalesChart } from '@/components/admin/charts/sales-chart'
import { SalesByProductChart } from '@/components/admin/charts/sales-by-product-chart'
import { SalesByChannelChart } from '@/components/admin/charts/sales-by-channel-chart'
import { SalesByRegionChart } from '@/components/admin/charts/sales-by-region-chart'

export default function SalesTab() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      <Card className="col-span-full bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Ventas Totales por Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart />
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Ventas por Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesByProductChart />
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Ventas por Canal</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesByChannelChart />
        </CardContent>
      </Card>

      <Card className="col-span-full bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Ventas por Región</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesByRegionChart />
        </CardContent>
      </Card>
    </div>
  )
}
