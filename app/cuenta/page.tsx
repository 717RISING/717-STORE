import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileTab } from '@/components/dashboard/profile-tab'
import { OrdersTab } from '@/components/dashboard/orders-tab'
import { AddressesTab } from '@/components/dashboard/addresses-tab'
import { PaymentTab } from '@/components/dashboard/payment-tab'
import { WishlistTab } from '@/components/dashboard/wishlist-tab'
import { SettingsTab } from '@/components/dashboard/settings-tab'
import { Suspense } from 'react'
import { ProfileLoader } from '@/components/loaders/profile-loader' // Changed to named import
import { MobileProfileLoader } from '@/components/loaders/mobile/mobile-profile-loader' // Changed to named import
import { useMobileDetection } from '@/hooks/use-mobile-detection'
import { redirect } from 'next/navigation'
import { validateUserSession } from '@/app/actions' // Assuming this action exists for server-side session validation

export const metadata = {
  title: 'Mi Cuenta - 717 Store',
  description: 'Gestiona tu perfil, pedidos, direcciones, métodos de pago y lista de deseos en 717 Store.',
}

export default async function AccountPage() {
  const { isMobile } = useMobileDetection()
  const { success, user } = await validateUserSession()

  if (!success || !user) {
    redirect('/login') // Redirect to login if not authenticated
  }

  return (
    <main className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Mi Cuenta</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 lg:grid-cols-6">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="addresses">Direcciones</TabsTrigger>
          <TabsTrigger value="payment">Pago</TabsTrigger>
          <TabsTrigger value="wishlist">Lista de Deseos</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <Suspense fallback={isMobile ? <MobileProfileLoader /> : <ProfileLoader />}>
            <ProfileTab />
          </Suspense>
        </TabsContent>
        <TabsContent value="orders" className="mt-6">
          <Suspense fallback={isMobile ? <MobileProfileLoader /> : <ProfileLoader />}>
            <OrdersTab />
          </Suspense>
        </TabsContent>
        <TabsContent value="addresses" className="mt-6">
          <Suspense fallback={isMobile ? <MobileProfileLoader /> : <ProfileLoader />}>
            <AddressesTab />
          </Suspense>
        </TabsContent>
        <TabsContent value="payment" className="mt-6">
          <Suspense fallback={isMobile ? <MobileProfileLoader /> : <ProfileLoader />}>
            <PaymentTab />
          </Suspense>
        </TabsContent>
        <TabsContent value="wishlist" className="mt-6">
          <Suspense fallback={isMobile ? <MobileProfileLoader /> : <ProfileLoader />}>
            <WishlistTab />
          </Suspense>
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <Suspense fallback={isMobile ? <MobileProfileLoader /> : <ProfileLoader />}>
            <SettingsTab />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  )
}
