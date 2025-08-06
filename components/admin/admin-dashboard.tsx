'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from "./tabs/overview-tab"
import { ProductsTab } from "./tabs/products-tab"
import { OrdersTab } from "./tabs/orders-tab"
import { CustomersTab } from "./tabs/customers-tab"
import { SettingsTab } from "./tabs/settings-tab"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <div className="ml-auto">
          <Button variant="outline" onClick={() => signOut()}>Cerrar Sesión</Button>
        </div>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
              <TabsTrigger value="customers">Clientes</TabsTrigger>
              <TabsTrigger value="settings">Ajustes</TabsTrigger>
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
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Información Rápida</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pedidos Pendientes:</span>
                <span className="text-sm font-bold">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Nuevos Clientes (últimos 7 días):</span>
                <span className="text-sm font-bold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Productos Agotados:</span>
                <span className="text-sm font-bold">3</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
