"use client"

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { getOrdersByUserId } from '@/lib/orders' // Assuming this function exists
import { useAuth } from '@/lib/auth-context' // Import useAuth
import { Order } from '@/lib/types' // Assuming you have a types file for Order

export function OrdersTab() {
  const { user, isLoading: isAuthLoading } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        setLoading(false)
        setError("No user ID found to fetch orders.")
        return
      }

      setLoading(true)
      setError(null)
      try {
        const fetchedOrders = await getOrdersByUserId(user.id)
        setOrders(fetchedOrders)
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (!isAuthLoading) {
      fetchOrders()
    }
  }, [user, isAuthLoading])

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

  if (loading || isAuthLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Cargando pedidos...</span>
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg">{error}</div>
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mis Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No tienes pedidos realizados aún.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Pedidos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID de Pedido</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Detalles</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell>
                  {/* You can add a button here to view full order details */}
                  <Button variant="link" size="sm">Ver</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
