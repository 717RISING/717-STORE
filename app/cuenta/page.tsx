'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileTab } from '@/components/dashboard/profile-tab'
import { OrdersTab } from '@/components/dashboard/orders-tab'
import { AddressesTab } from '@/components/dashboard/addresses-tab'
import { PaymentTab } from '@/components/dashboard/payment-tab'
import { WishlistTab } from '@/components/dashboard/wishlist-tab'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/cuenta')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Cargando cuenta...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Mi Cuenta</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="addresses">Direcciones</TabsTrigger>
          <TabsTrigger value="payment">Pago</TabsTrigger>
          <TabsTrigger value="wishlist">Lista de Deseos</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <ProfileTab />
        </TabsContent>
        <TabsContent value="orders" className="mt-6">
          <OrdersTab />
        </TabsContent>
        <TabsContent value="addresses" className="mt-6">
          <AddressesTab />
        </TabsContent>
        <TabsContent value="payment" className="mt-6">
          <PaymentTab />
        </TabsContent>
        <TabsContent value="wishlist" className="mt-6">
          <WishlistTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
