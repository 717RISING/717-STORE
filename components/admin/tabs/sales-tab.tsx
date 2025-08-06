"use client"

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'
import { getOrders } from '@/lib/orders' // Assuming you have a function to fetch orders
import { Order } from '@/lib/types' // Assuming you have a types file for Order

export function SalesTab() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      setError(null)
      try {
        const fetchedOrders = await getOrders()
        setOrders(fetchedOrders)
      } catch (err) {
        setError('Failed to fetch orders.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completado':
        return 'default'
      case 'Pendiente':
        return 'secondary'
      case 'Cancelado':
        return 'destructive'
      case 'Enviado':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestión de Ventas</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID de Pedido</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Método de Pago</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
              </TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
