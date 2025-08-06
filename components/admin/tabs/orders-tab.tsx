'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getOrders, updateOrderStatus } from '@/lib/database'
import { Eye, CheckCircle, XCircle, Truck, Package } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

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

export function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [newStatus, setNewStatus] = useState<Order['status']>('pending')

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
        return 'success'
      case 'cancelled':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const openDialogForView = (order: Order) => {
    setCurrentOrder(order)
    setNewStatus(order.status)
    setIsDialogOpen(true)
  }

  const handleStatusChange = async () => {
    if (currentOrder) {
      await updateOrderStatus(currentOrder.id, newStatus)
      fetchOrders() // Re-fetch orders to update the list
      setIsDialogOpen(false)
    }
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Pedidos</CardTitle>
      </CardHeader>
      <CardContent>
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
                <TableCell className="font-medium text-gray-900 dark:text-white">{order.id}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{order.customerName}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {new Date(order.orderDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  ${order.totalAmount.toLocaleString('es-CO')} COP
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openDialogForView(order)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">Detalles del Pedido #{currentOrder?.id}</DialogTitle>
            </DialogHeader>
            {currentOrder && (
              <div className="grid gap-4 py-4 text-gray-700 dark:text-gray-300">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Información del Cliente:</h3>
                  <p>Nombre: {currentOrder.customerName}</p>
                  <p>Email: {currentOrder.customerEmail}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Dirección de Envío:</h3>
                  <p>{currentOrder.shippingAddress.street}</p>
                  <p>{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.zip}</p>
                  <p>{currentOrder.shippingAddress.country}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Artículos:</h3>
                  <ul className="list-disc list-inside">
                    {currentOrder.items.map((item, index) => (
                      <li key={index}>
                        {item.name} (Talla: {item.size}) x {item.quantity} - ${item.price.toLocaleString('es-CO')} COP c/u
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Total: ${currentOrder.totalAmount.toLocaleString('es-CO')} COP</h3>
                  <p>Estado del Pago: <Badge variant={currentOrder.paymentStatus === 'paid' ? 'success' : 'secondary'}>{currentOrder.paymentStatus}</Badge></p>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right text-gray-700 dark:text-gray-300">
                    Actualizar Estado:
                  </Label>
                  <Select value={newStatus} onValueChange={(value: Order['status']) => setNewStatus(value)}>
                    <SelectTrigger className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-700 text-gray-900 dark:text-white">
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="processing">Procesando</SelectItem>
                      <SelectItem value="shipped">Enviado</SelectItem>
                      <SelectItem value="delivered">Entregado</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleStatusChange}
                className="bg-[#4A1518] hover:bg-[#6B1E22] text-white"
              >
                Guardar Cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

export default OrdersTab
