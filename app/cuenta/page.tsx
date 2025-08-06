import { Suspense } from 'react'
import { ProfileTab } from '@/components/dashboard/profile-tab'
import { OrdersTab } from '@/components/dashboard/orders-tab'
import { AddressesTab } from '@/components/dashboard/addresses-tab'
import { PaymentTab } from '@/components/dashboard/payment-tab'
import { WishlistTab } from '@/components/dashboard/wishlist-tab'
import { SettingsTab } from '@/components/dashboard/settings-tab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileLoader } from '@/components/loaders/profile-loader'
import { OrdersLoader } from '@/components/loaders/orders-loader'
import { AddressesLoader } from '@/components/loaders/addresses-loader'
import { PaymentLoader } from '@/components/loaders/payment-loader'
import { WishlistLoader } from '@/components/loaders/wishlist-loader'
import { SettingsLoader } from '@/components/loaders/settings-loader'
import { MobileProfileLoader } from '@/components/loaders/mobile/mobile-profile-loader'
import { MobileOrdersLoader } from '@/components/loaders/mobile/mobile-orders-loader'
import { MobileAddressesLoader } from '@/components/loaders/mobile/mobile-addresses-loader'
import { MobilePaymentLoader } from '@/components/loaders/mobile/mobile-payment-loader'
import { MobileWishlistLoader } from '@/components/loaders/mobile/mobile-wishlist-loader'
import { MobileSettingsLoader } from '@/components/loaders/mobile/mobile-settings-loader'
import { useMobileDetection } from '@/hooks/use-mobile-detection'

export default function AccountPage() {
  const { isMobile } = useMobileDetection()

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Mi Cuenta</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="addresses">Direcciones</TabsTrigger>
          <TabsTrigger value="payment">Pago</TabsTrigger>
          <TabsTrigger value="wishlist">Lista de Deseos</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Suspense fallback={isMobile ? <MobileProfileLoader /> : <ProfileLoader />}>
            <ProfileTab />
          </Suspense>
        </TabsContent>
        <TabsContent value="orders">
          <Suspense fallback={isMobile ? <MobileOrdersLoader /> : <OrdersLoader />}>
            <OrdersTab />
          </Suspense>
        </TabsContent>
        <TabsContent value="addresses">
          <Suspense fallback={isMobile ? <MobileAddressesLoader /> : <AddressesLoader />}>
            <AddressesTab />
          </Suspense>
        </TabsContent>
        <TabsContent value="payment">
          <Suspense fallback={isMobile ? <MobilePaymentLoader /> : <PaymentLoader />}>
            <PaymentTab />
          </Suspense>
        </TabsContent>
        <TabsContent value="wishlist">
          <Suspense fallback={isMobile ? <MobileWishlistLoader /> : <WishlistLoader />}>
            <WishlistTab />
          </Suspense>
        </TabsContent>
        <TabsContent value="settings">
          <Suspense fallback={isMobile ? <MobileSettingsLoader /> : <SettingsLoader />}>
            <SettingsTab />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
