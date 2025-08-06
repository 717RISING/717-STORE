"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Order } from '@/lib/types'
import { getOrders } from '@/lib/orders'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { AdaptiveLoader } from '@/components/loaders/adaptive-loader' // Changed to named import
import { toast } from 'sonner'
import { Button } from '@/components/ui/button' // Assuming Button component exists
import { SalesByRegionChart } from '../charts/sales-by-region-chart' // Import charts
import { SalesByProductChart } from '../charts/sales-by-product-chart'
import { SalesByChannelChart } from '../charts/sales-by-channel-chart'

export function SalesTab() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const fetchedOrders = await getOrders()
      setOrders(fetchedOrders)
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error("Error al cargar los pedidos.")
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadgeVariant = (status: Order['status']) => {
    switch (status) {
      case 'Pendiente':
        return 'secondary'
      case 'Procesando':
        return 'default'
      case 'Enviado':
        return 'outline'
      case 'Entregado':
        return 'success' // Assuming a success variant exists or can be styled
      case 'Cancelado':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const formatStatus = (status: Order['status']) => {
    switch (status) {
      case 'Pendiente':
        return 'Pendiente'
      case 'Procesando':
        return 'Procesando'
      case 'Enviado':
        return 'Enviado'
      case 'Entregado':
        return 'Completado'
      case 'Cancelado':
        return 'Cancelado'
      default:
        return status
    }
  }

  // Dummy data for recent sales (using actual mockOrders for consistency)
  const recentSales = orders.slice(0, 5).map(order => ({
    id: order.id,
    customer: order.shippingAddress.fullName,
    amount: order.total,
    date: format(new Date(order.createdAt), 'yyyy-MM-dd'),
    status: formatStatus(order.status),
  }))

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestión de Ventas</h2>
      <Card>
        <CardHeader>
          <CardTitle>Todos los Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <AdaptiveLoader isVisible={loading} text="Cargando pedidos..." className="h-64" />
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.shippingAddress.fullName}</TableCell>
                      <TableCell>{format(new Date(order.createdAt), 'dd MMM yyyy', { locale: es })}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(order.status)}>
                          {formatStatus(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {/* Add actions like View Details, Update Status, etc. */}
                        <Button variant="ghost" size="sm">Ver Detalles</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardTitle>Ventas Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>${sale.amount.toFixed(2)}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 xl:col-span-2">
        <CardHeader>
          <CardTitle>Ventas por Región</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesByRegionChart />
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Ventas por Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesByProductChart />
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Ventas por Canal</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesByChannelChart />
        </CardContent>
      </Card>
    </div>
  )
}
