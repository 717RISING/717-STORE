"use client"

import { useState } from "react"
import { Search, Filter, Plus, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CustomerAcquisitionChart from "@/components/admin/charts/customer-acquisition-chart"
import CustomerRetentionChart from "@/components/admin/charts/customer-retention-chart"

export default function CustomersTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setIsDialogOpen(true)
  }

  const handleAddCustomer = () => {
    setSelectedCustomer(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Gestión de Clientes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="inactive">Inactivos</SelectItem>
              <SelectItem value="new">Nuevos</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddCustomer} className="bg-white text-black hover:bg-gray-200">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedCustomer ? "Editar" : "Agregar"} Cliente</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-300">
                      Nombre
                    </Label>
                    <Input
                      id="firstName"
                      defaultValue={selectedCustomer?.firstName || ""}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-300">
                      Apellido
                    </Label>
                    <Input
                      id="lastName"
                      defaultValue={selectedCustomer?.lastName || ""}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-300">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={selectedCustomer?.email || ""}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-300">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    defaultValue={selectedCustomer?.phone || ""}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-gray-300">
                    Dirección
                  </Label>
                  <Input
                    id="address"
                    defaultValue={selectedCustomer?.address || ""}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gray-300">
                      Ciudad
                    </Label>
                    <Input
                      id="city"
                      defaultValue={selectedCustomer?.city || ""}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-gray-300">
                      Estado
                    </Label>
                    <Input
                      id="state"
                      defaultValue={selectedCustomer?.state || ""}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="text-gray-300">
                      Código Postal
                    </Label>
                    <Input
                      id="zipCode"
                      defaultValue={selectedCustomer?.zipCode || ""}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="status" className="text-gray-300">
                    Estado
                  </Label>
                  <Select defaultValue={selectedCustomer?.status || "active"}>
                    <SelectTrigger id="status" className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-gray-700">
                    Cancelar
                  </Button>
                  <Button className="bg-white text-black hover:bg-gray-200">
                    {selectedCustomer ? "Actualizar" : "Agregar"} Cliente
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Customer Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Clientes Totales</p>
              <h3 className="text-3xl font-bold">1,248</h3>
              <p className="text-green-400 text-sm mt-1">+12% desde el mes pasado</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Clientes Activos</p>
              <h3 className="text-3xl font-bold">876</h3>
              <p className="text-green-400 text-sm mt-1">+8% desde el mes pasado</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Nuevos Clientes</p>
              <h3 className="text-3xl font-bold">128</h3>
              <p className="text-green-400 text-sm mt-1">+5% desde el mes pasado</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Adquisición de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <CustomerAcquisitionChart />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Retención de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <CustomerRetentionChart />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Segments */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg">Segmentos de Clientes</CardTitle>
            <Tabs defaultValue="all">
              <TabsList className="bg-gray-800">
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Todos
                </TabsTrigger>
                <TabsTrigger value="new" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Nuevos
                </TabsTrigger>
                <TabsTrigger value="returning" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Recurrentes
                </TabsTrigger>
                <TabsTrigger value="vip" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  VIP
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Cliente</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Teléfono</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Ubicación</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Pedidos</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">\
