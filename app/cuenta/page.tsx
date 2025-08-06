"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileTab } from '@/components/dashboard/profile-tab'
import { OrdersTab } from '@/components/dashboard/orders-tab'
import { AddressesTab } from '@/components/dashboard/addresses-tab'
import { PaymentTab } from '@/components/dashboard/payment-tab'
import { WishlistTab } from '@/components/dashboard/wishlist-tab'
import { SettingsTab } from '@/components/dashboard/settings-tab'
import { useAuth } from '@/lib/auth-context' // Import useAuth
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ProfileLoader } from '@/components/loaders/profile-loader'
import { MobileProfileLoader } from '@/components/loaders/mobile/mobile-profile-loader'
import { useMobileDetection } from '@/hooks/use-mobile-detection'

export default function AccountPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const isMobile = useMobileDetection()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return isMobile ? <MobileProfileLoader /> : <ProfileLoader />
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))]">
      <h1 className="text-4xl font-bold text-center mb-8">Mi Cuenta</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="addresses">Direcciones</TabsTrigger>
          <TabsTrigger value="payment">Pago</TabsTrigger>
          <TabsTrigger value="wishlist">Lista de Deseos</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
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
        <TabsContent value="settings" className="mt-6">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
