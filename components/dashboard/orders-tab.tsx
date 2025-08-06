"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { db } from "@/lib/database"
import { formatPrice } from "@/lib/products"
import type { Order } from "@/lib/orders"

export default function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    setOrders(db.orders)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Entregado</Badge>
      case "shipped":
        return <Badge className="bg-blue-100 text-blue-800">Enviado</Badge>
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800">Procesando</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelado</Badge>
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">Pendiente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="grid gap-6">
      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle>Mis Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-gray-400">No tienes pedidos aún.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead>ID Pedido</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="border-gray-800">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                      <TableCell>{formatPrice(order.totalAmount)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <button className="text-[#5D1A1D] hover:underline text-sm">Ver Detalles</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
