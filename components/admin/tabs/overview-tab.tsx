'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Users, Package, TrendingUp } from 'lucide-react'
import { SalesChart } from '../charts/sales-chart'
import { VisitorsChart } from '../charts/visitors-chart'
import { ProductPerformanceChart } from '../charts/product-performance-chart'
import { SalesByRegionChart } from '../charts/sales-by-region-chart'
import { SalesByProductChart } from '../charts/sales-by-product-chart'
import { SalesByChannelChart } from '../charts/sales-by-channel-chart'
import { CustomerAcquisitionChart } from '../charts/customer-acquisition-chart'
import { CustomerRetentionChart } from '../charts/customer-retention-chart'

export function OverviewTab() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <p className="text-xs text-muted-foreground">+1.2% desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visitantes del Sitio</CardTitle>
          </CardHeader>
          <CardContent>
            <VisitorsChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento de Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductPerformanceChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Región</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesByRegionChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Producto</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesByProductChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesByChannelChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Adquisición de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomerAcquisitionChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Retención de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomerRetentionChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
