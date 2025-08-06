import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Package, RotateCcw, Shield, Clock, MapPin } from 'lucide-react'

export default function EnviosDevolucionesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Envíos y Devoluciones
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Toda la información sobre nuestros servicios de envío y política de devoluciones
            </p>
          </div>

          <div className="space-y-8">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-6 w-6 text-primary" />
                  Información de Envíos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Tiempos de Entrega</h3>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Bogotá: 1-2 días hábiles</li>
                          <li>• Ciudades principales: 3-5 días hábiles</li>
                          <li>• Resto del país: 5-7 días hábiles</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Package className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Empaque</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Todos nuestros productos se envían en empaques ecológicos y seguros.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Cobertura</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Realizamos envíos a todo Colombia. Consulta disponibilidad en tu ciudad.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Seguimiento</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Recibirás un código de seguimiento para rastrear tu pedido en tiempo real.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Costs */}
            <Card>
              <CardHeader>
                <CardTitle>Costos de Envío</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-green-800 dark:text-green-400">
                        Envío Gratis
                      </h3>
                      <p className="text-sm text-green-600 dark:text-green-500">
                        En compras superiores a $200.000 COP
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      $0
                    </Badge>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Bogotá</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">1-2 días hábiles</p>
                      </div>
                      <Badge variant="outline">$8.000</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Ciudades Principales</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">3-5 días hábiles</p>
                      </div>
                      <Badge variant="outline">$12.000</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Resto del País</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">5-7 días hábiles</p>
                      </div>
                      <Badge variant="outline">$15.000</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Express</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">24-48 horas</p>
                      </div>
                      <Badge variant="outline">$25.000</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Returns Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="h-6 w-6 text-primary" />
                  Política de Devoluciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">
                    30 Días para Devoluciones
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-500">
                    Tienes 30 días calendario desde la fecha de entrega para solicitar una devolución.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Condiciones para Devoluciones:</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>El producto debe estar sin usar y con etiquetas originales</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Debe incluir el empaque original</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>No debe tener olores, manchas o daños</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Debe incluir la factura de compra</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Proceso de Devolución:</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2">
                        1
                      </div>
                      <h4 className="font-semibold text-sm">Solicita</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Contacta nuestro servicio al cliente
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2">
                        2
                      </div>
                      <h4 className="font-semibold text-sm">Envía</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Empaca y envía el producto
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2">
                        3
                      </div>
                      <h4 className="font-semibold text-sm">Recibe</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Reembolso en 5-10 días hábiles
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
                    Productos No Retornables
                  </h3>
                  <ul className="text-sm text-yellow-600 dark:text-yellow-500 space-y-1">
                    <li>• Productos personalizados o hechos a medida</li>
                    <li>• Ropa interior y productos de higiene personal</li>
                    <li>• Productos en oferta o liquidación (salvo defecto de fábrica)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
