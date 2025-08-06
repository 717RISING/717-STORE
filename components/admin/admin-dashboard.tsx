"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewTab } from "@/components/admin/tabs/overview-tab"
import { ProductsTab } from "@/components/admin/tabs/products-tab"
import { OrdersTab } from "@/components/admin/tabs/orders-tab"
import { CustomersTab } from "@/components/admin/tabs/customers-tab"
import { SettingsTab } from "@/components/admin/tabs/settings-tab"
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import { handleLogout } from "@/app/actions" // Import the server action

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Panel de Administración</h1>
        <form action={handleLogout}>
          <Button variant="destructive" type="submit">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </form>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 mb-6 bg-gray-800 border border-gray-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
            Resumen
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
            Productos
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
            Pedidos
          </TabsTrigger>
          <TabsTrigger value="customers" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
            Clientes
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>
        <TabsContent value="orders">
          <OrdersTab />
        </TabsContent>
        <TabsContent value="customers">
          <CustomersTab />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
