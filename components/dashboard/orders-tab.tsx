'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react'
import { useState, useEffect } from "react"
import { Order } from "@/lib/orders" // Assuming Order type is defined here
import { getOrders } from "@/lib/database" // Assuming getOrders function is defined here
import { LoadingSpinner } from "@/components/loading-spinner"

export function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const data = await getOrders()
        if (data) {
          setOrders(data)
        } else {
          setError("Failed to fetch orders.")
        }
      } catch (err) {
        setError("An unexpected error occurred while fetching orders.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Pendiente":
        return "secondary"
      case "Procesando":
        return "default"
      case "Enviado":
        return "outline"
      case "Entregado":
        return "success" // Assuming a 'success' variant exists or can be styled
      case "Cancelado":
        return "destructive"
      default:
        return "secondary"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mis Pedidos</CardTitle>
          <CardDescription>Revisa el estado y el historial de tus pedidos.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mis Pedidos</CardTitle>
          <CardDescription>Revisa el estado y el historial de tus pedidos.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Pedidos</CardTitle>
        <CardDescription>Revisa el estado y el historial de tus pedidos.</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-gray-500">No tienes pedidos realizados aún.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido #</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                        <DropdownMenuItem>Rastrear Envío</DropdownMenuItem>
                        {order.status === "Pendiente" && <DropdownMenuItem>Cancelar Pedido</DropdownMenuItem>}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
