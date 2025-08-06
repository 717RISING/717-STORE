import { Suspense } from "react"
import { ProfileLoader } from "@/components/loaders/profile-loader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Package, MapPin, CreditCard, Settings } from 'lucide-react'

export default function CuentaPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mi Cuenta</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Gestiona tu información personal y preferencias</p>
          </div>

          <Suspense fallback={<ProfileLoader />}>
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Pedidos
                </TabsTrigger>
                <TabsTrigger value="addresses" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Direcciones
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Pagos
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configuración
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input id="firstName" placeholder="Tu nombre" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input id="lastName" placeholder="Tu apellido" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="tu@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" placeholder="+57 300 123 4567" />
                      </div>
                    </div>
                    <Button>Guardar Cambios</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Mis Pedidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">No tienes pedidos aún</p>
                      <Button className="mt-4">Explorar Productos</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <CardTitle>Direcciones de Envío</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">No tienes direcciones guardadas</p>
                      <Button className="mt-4">Agregar Dirección</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Métodos de Pago</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">No tienes métodos de pago guardados</p>
                      <Button className="mt-4">Agregar Tarjeta</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de Cuenta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notificaciones por Email</h3>
                        <p className="text-sm text-gray-500">Recibe actualizaciones sobre tus pedidos</p>
                      </div>
                      <Button variant="outline">Configurar</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Cambiar Contraseña</h3>
                        <p className="text-sm text-gray-500">Actualiza tu contraseña de acceso</p>
                      </div>
                      <Button variant="outline">Cambiar</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-red-600">Eliminar Cuenta</h3>
                        <p className="text-sm text-gray-500">Eliminar permanentemente tu cuenta</p>
                      </div>
                      <Button variant="destructive">Eliminar</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
