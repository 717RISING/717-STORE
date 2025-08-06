"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OverviewTab } from './tabs/overview-tab'
import { ProductsTab } from './tabs/products-tab'
import { OrdersTab } from './tabs/orders-tab'
import { CustomersTab } from './tabs/customers-tab'
import { SettingsTab } from './tabs/settings-tab'
import { useAuth } from '@/lib/auth-context' // Import useAuth
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export function AdminDashboard() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
      router.push('/admin/login') // Redirect to admin login if not authenticated or not admin
    }
  }, [isAuthenticated, isLoading, user, router])

  if (isLoading || !isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="ml-3 text-lg">Cargando panel de administración...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))]">
      <h1 className="text-4xl font-bold text-center mb-8">Panel de Administración</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="customers">Clientes</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="products" className="mt-6">
          <ProductsTab />
        </TabsContent>
        <TabsContent value="orders" className="mt-6">
          <OrdersTab />
        </TabsContent>
        <TabsContent value="customers" className="mt-6">
          <CustomersTab />
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
