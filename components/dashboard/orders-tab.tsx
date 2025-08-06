'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState, useEffect } from 'react'
import { Order } from '@/lib/types'
import { getOrdersByUserId } from '@/lib/database'
import { useAuth } from '@/lib/auth-context'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'

export function OrdersTab() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.id) {
        setIsLoading(true)
        try {
          const userOrders = await getOrdersByUserId(user.id)
          setOrders(userOrders)
        } catch (error) {
          console.error('Error fetching user orders:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }
    fetchOrders()
  }, [user])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Cargando tus pedidos...</span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Pedidos</CardTitle>
        <CardDescription>Revisa el estado y los detalles de tus pedidos anteriores.</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No tienes pedidos aún.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID de Pedido</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Artículos</TableHead>
                <TableHead>Dirección de Envío</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Entregado' ? 'bg-green-100 text-green-800' :
                      order.status === 'Enviado' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Procesando' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside text-sm">
                      {order.items.map((item, index) => (
                        <li key={index}>{item.name} (x{item.quantity})</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell className="text-sm">
                    {order.shippingAddress.fullName}, {order.shippingAddress.address1}, {order.shippingAddress.city}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
