import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProfileTab from '@/components/dashboard/profile-tab'
import OrdersTab from '@/components/dashboard/orders-tab'
import AddressesTab from '@/components/dashboard/addresses-tab'
import PaymentTab from '@/components/dashboard/payment-tab'
import WishlistTab from '@/components/dashboard/wishlist-tab'
import SettingsTab from '@/components/dashboard/settings-tab'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { handleLogout } from '@/app/actions'
import DesktopProfileLoader from '@/components/loaders/profile-loader'
import MobileProfileLoader from '@/components/loaders/mobile/mobile-profile-loader'
import { useMobileDetection } from '@/hooks/use-mobile-detection' // Client component hook

export default function AccountPage() {
  const cookieStore = cookies()
  const userSession = cookieStore.get('user_session')

  let user = null
  if (userSession) {
    try {
      user = JSON.parse(userSession.value)
    } catch (e) {
      console.error('Failed to parse user session cookie:', e)
    }
  }

  if (!user) {
    redirect('/login')
  }

  // This is a Server Component, so useMobileDetection cannot be directly used here.
  // We'll simulate it or use a client wrapper if needed for conditional rendering.
  const isMobile = false; // Placeholder: In a real app, this would be determined client-side or via user-agent detection on server

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Mi Cuenta</h1>
        <form action={handleLogout}>
          <Button variant="destructive" type="submit">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </form>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
            Perfil
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
            Pedidos
          </TabsTrigger>
          <TabsTrigger value="addresses" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
            Direcciones
          </TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
            Pago
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
            Lista de Deseos
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-[#4A1518] data-[state=active]:text-white">
            Configuración
          </TabsTrigger>
        </TabsList>

        <Suspense fallback={isMobile ? <MobileProfileLoader /> : <DesktopProfileLoader />}>
          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>
          <TabsContent value="addresses">
            <AddressesTab />
          </TabsContent>
          <TabsContent value="payment">
            <PaymentTab />
          </TabsContent>
          <TabsContent value="wishlist">
            <WishlistTab />
          </TabsContent>
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Suspense>
      </Tabs>
    </div>
  )
}
