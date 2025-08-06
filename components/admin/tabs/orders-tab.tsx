"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getOrders, updateOrderStatus } from "@/lib/database" // Assuming these functions exist in lib/database.ts
import { formatPrice } from "@/lib/products" // Import formatPrice

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
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "paid" | "pending" | "refunded"
  shippingAddress: {
    street: string
    city: string
    zip: string
    country: string
  }
  items: OrderItem[]
  channel?: string
}

export default function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [newStatus, setNewStatus] = useState<Order["status"]>("pending")

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const fetchedOrders = await getOrders()
    setOrders(fetchedOrders)
  }

  const openDialogForEdit = (order: Order) => {
    setCurrentOrder(order)
    setNewStatus(order.status)
    setIsDialogOpen(true)
  }

  const handleStatusChange = async () => {
    if (currentOrder) {
      await updateOrderStatus(currentOrder.id, newStatus)
      fetchOrders()
      setIsDialogOpen(false)
    }
  }

  const getStatusVariant = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "outline"
      case "processing":
        return "secondary"
      case "shipped":
        return "default"
      case "delivered":
        return "success" // Assuming a success variant exists or can be styled
      case "cancelled":
        return "destructive"
      default:
        return "outline"
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
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-gray-900 dark:text-white">{order.id}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{order.customerName}</TableCell>
                <TableCell className="text-gray-900 dark:text-white">{formatPrice(order.totalAmount)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {new Date(order.orderDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => openDialogForEdit(order)}>
                    Ver/Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">Detalles del Pedido #{currentOrder?.id}</DialogTitle>
            </DialogHeader>
            {currentOrder && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-gray-700 dark:text-gray-300">Cliente:</Label>
                  <span className="col-span-3 text-gray-900 dark:text-white">{currentOrder.customerName} ({currentOrder.customerEmail})</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-gray-700 dark:text-gray-300">Total:</Label>
                  <span className="col-span-3 text-gray-900 dark:text-white">{formatPrice(currentOrder.totalAmount)}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-gray-700 dark:text-gray-300">Dirección:</Label>
                  <span className="col-span-3 text-gray-900 dark:text-white">
                    {currentOrder.shippingAddress.street}, {currentOrder.shippingAddress.city},{" "}
                    {currentOrder.shippingAddress.zip}, {currentOrder.shippingAddress.country}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right text-gray-700 dark:text-gray-300">
                    Estado:
                  </Label>
                  <Select value={newStatus} onValueChange={(value: Order["status"]) => setNewStatus(value)}>
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
                <div className="col-span-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Artículos:</h4>
                  <ul className="space-y-1">
                    {currentOrder.items.map((item, index) => (
                      <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                        {item.name} (x{item.quantity}) - {formatPrice(item.price)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleStatusChange}
                className="bg-[#4A1518] hover:bg-[#6B1E22] text-white"
              >
                Actualizar Estado
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
