"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye, CheckCircle, XCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllOrders, updateOrderStatus } from "@/lib/database" // Assuming these functions exist
import { Order } from "@/lib/orders" // Assuming Order interface is defined
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { es } from "date-fns/locale" // Import Spanish locale

export function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editStatus, setEditStatus] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      const fetchedOrders = await getAllOrders()
      setOrders(fetchedOrders)
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los pedidos.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterStatus = (value: string) => {
    setFilterStatus(value)
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.shippingAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completado":
        return "default"
      case "Pendiente":
        return "secondary"
      case "Enviado":
        return "outline"
      case "Cancelado":
        return "destructive"
      case "Procesando":
        return "default"
      default:
        return "secondary"
    }
  }

  const handleEditStatus = (order: Order) => {
    setSelectedOrder(order)
    setEditStatus(order.status)
    setIsEditDialogOpen(true)
  }

  const handleSaveStatus = async () => {
    if (selectedOrder && editStatus) {
      try {
        await updateOrderStatus(selectedOrder.id, editStatus)
        setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: editStatus } : o))
        toast({
          title: "Estado de pedido actualizado",
          description: `El pedido #${selectedOrder.id} ahora está en estado: ${editStatus}.`,
        })
        setIsEditDialogOpen(false)
        setSelectedOrder(null)
      } catch (error) {
        console.error("Error updating order status:", error)
        toast({
          title: "Error",
          description: "No se pudo actualizar el estado del pedido.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Pedidos</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar pedido..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8 w-[200px]"
            />
          </div>
          <Select value={filterStatus} onValueChange={handleFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
              <SelectItem value="Procesando">Procesando</SelectItem>
              <SelectItem value="Enviado">Enviado</SelectItem>
              <SelectItem value="Completado">Completado</SelectItem>
              <SelectItem value="Cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-5/6"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-4/5"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-11/12"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pedido</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{format(new Date(order.date), "dd/MM/yyyy", { locale: es })}</TableCell>
                  <TableCell>{order.userId}</TableCell> {/* In a real app, fetch user name */}
                  <TableCell>${order.total.toLocaleString("es-CO")} COP</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Detalles del Pedido #{selectedOrder?.id}</DialogTitle>
                            <DialogDescription>Información completa del pedido.</DialogDescription>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-1">
                                <span className="font-semibold">Fecha:</span>
                                <span>{format(new Date(selectedOrder.date), "dd/MM/yyyy HH:mm", { locale: es })}</span>
                                <span className="font-semibold">Estado:</span>
                                <Badge variant={getStatusVariant(selectedOrder.status)} className="w-fit">
                                  {selectedOrder.status}
                                </Badge>
                                <span className="font-semibold">Total:</span>
                                <span>${selectedOrder.total.toLocaleString("es-CO")} COP</span>
                                <span className="font-semibold">Método de Pago:</span>
                                <span>{selectedOrder.paymentMethod}</span>
                                <span className="font-semibold">Dirección de Envío:</span>
                                <span>{selectedOrder.shippingAddress}</span>
                              </div>
                              <Separator className="my-4" />
                              <h3 className="text-lg font-semibold">Productos:</h3>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Producto</TableHead>
                                    <TableHead>Talla</TableHead>
                                    <TableHead>Color</TableHead>
                                    <TableHead>Cantidad</TableHead>
                                    <TableHead className="text-right">Precio Unitario</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {selectedOrder.items.map((item, itemIndex) => (
                                    <TableRow key={itemIndex}>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>{item.size || "N/A"}</TableCell>
                                      <TableCell>{item.color || "N/A"}</TableCell>
                                      <TableCell>{item.quantity}</TableCell>
                                      <TableCell className="text-right">${item.price.toLocaleString("es-CO")} COP</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="icon" onClick={() => handleEditStatus(order)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar Estado</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Edit Status Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Actualizar Estado del Pedido</DialogTitle>
              <DialogDescription>Cambia el estado del pedido #{selectedOrder?.id}.</DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="Procesando">Procesando</SelectItem>
                      <SelectItem value="Enviado">Enviado</SelectItem>
                      <SelectItem value="Completado">Completado</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleSaveStatus}>Guardar Cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
