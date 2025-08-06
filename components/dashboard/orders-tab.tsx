'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getOrders } from '@/lib/database' // Assuming getOrders is in lib/database.ts

interface OrderItem {
  productId: string
  name: string
  quantity: number
  price: number
  size?: string
  image?: string
}

interface Order {
  id: string
  userId: string
  customerName: string
  customerEmail: string
  orderDate: string
  totalAmount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'paid' | 'pending' | 'refunded'
  shippingAddress: {
    street: string
    city: string
    zip: string
    country: string
  }
  items: OrderItem[]
  channel: string
}

export default function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const fetchedOrders = await getOrders()
    setOrders(fetchedOrders)
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

  const getPaymentStatusBadgeVariant = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return 'success'
      case 'pending':
        return 'secondary'
      case 'refunded':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Mis Pedidos</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No tienes pedidos realizados aún.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pedido</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Pago</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-gray-900 dark:text-white">{order.id}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    ${order.totalAmount.toLocaleString('es-CO')} COP
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPaymentStatusBadgeVariant(order.paymentStatus)}>{order.paymentStatus}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => openOrderDetails(order)}>
                      Ver Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">Detalles del Pedido #{selectedOrder?.id}</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="grid gap-4 py-4 text-gray-700 dark:text-gray-300">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Información del Cliente:</h3>
                  <p>Nombre: {selectedOrder.customerName}</p>
                  <p>Email: {selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Dirección de Envío:</h3>
                  <p>{selectedOrder.shippingAddress.street}</p>
                  <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.zip}</p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Artículos:</h3>
                  <ul className="list-disc list-inside">
                    {selectedOrder.items.map((item, index) => (
                      <li key={index}>
                        {item.name} (Talla: {item.size}) x {item.quantity} - ${item.price.toLocaleString('es-CO')} COP c/u
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Total: ${selectedOrder.totalAmount.toLocaleString('es-CO')} COP</h3>
                  <p>Estado del Pedido: <Badge variant={getStatusBadgeVariant(selectedOrder.status)}>{selectedOrder.status}</Badge></p>
                  <p>Estado del Pago: <Badge variant={getPaymentStatusBadgeVariant(selectedOrder.paymentStatus)}>{selectedOrder.paymentStatus}</Badge></p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
