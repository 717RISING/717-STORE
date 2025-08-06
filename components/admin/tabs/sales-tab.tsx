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
      case 'pending':
        return 'secondary'
      case 'processing':
        return 'default'
      case 'shipped':
        return 'outline'
      case 'delivered':
        return 'success' // Assuming a success variant exists or can be styled
      case 'cancelled':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const formatStatus = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Pendiente'
      case 'processing':
        return 'Procesando'
      case 'shipped':
        return 'Enviado'
      case 'delivered':
        return 'Completado'
      case 'cancelled':
        return 'Cancelado'
      default:
        return status
    }
  }

  // Dummy data for recent sales
  const recentSales = [
    { id: 'ORD001', customer: 'Juan Pérez', amount: 120.50, date: '2023-10-26', status: 'Completado' },
    { id: 'ORD002', customer: 'María García', amount: 75.00, date: '2023-10-25', status: 'Pendiente' },
    { id: 'ORD003', customer: 'Carlos Ruiz', amount: 200.00, date: '2023-10-24', status: 'Completado' },
    { id: 'ORD004', customer: 'Ana López', amount: 45.99, date: '2023-10-24', status: 'Enviado' },
    { id: 'ORD005', customer: 'Pedro Gómez', amount: 150.25, date: '2023-10-23', status: 'Completado' },
  ]

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
          {/* Assuming SalesByRegionChart component exists */}
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Ventas por Producto</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Assuming SalesByProductChart component exists */}
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Ventas por Canal</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Assuming SalesByChannelChart component exists */}
        </CardContent>
      </Card>
    </div>
  )
}
