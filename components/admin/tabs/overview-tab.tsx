"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Vendidos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">+19% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendimiento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+5.7%</div>
            <p className="text-xs text-muted-foreground">Aumento en la tasa de conversión</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Mes</CardTitle>
            <CardDescription>Un resumen de las ventas totales por mes.</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visitantes del Sitio</CardTitle>
            <CardDescription>Número de visitantes únicos y vistas de página.</CardDescription>
          </CardHeader>
          <CardContent>
            <VisitorsChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento de Productos</CardTitle>
            <CardDescription>Los productos más vendidos y su contribución a los ingresos.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductPerformanceChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Región</CardTitle>
            <CardDescription>Distribución geográfica de las ventas.</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesByRegionChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Producto</CardTitle>
            <CardDescription>Desglose de ventas por categoría de producto.</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesByProductChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Canal</CardTitle>
            <CardDescription>Rendimiento de ventas a través de diferentes canales.</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesByChannelChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Adquisición de Clientes</CardTitle>
            <CardDescription>Cómo se adquieren nuevos clientes.</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomerAcquisitionChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Retención de Clientes</CardTitle>
            <CardDescription>Tasa de retención de clientes a lo largo del tiempo.</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomerRetentionChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
