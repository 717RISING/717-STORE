"use client"

import { Truck, Package, RefreshCw, Shield, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Envíos y Devoluciones</h1>
            <p className="text-xl text-gray-400">
              Información completa sobre nuestros servicios de envío y política de devoluciones
            </p>
          </div>

          {/* Shipping Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Truck className="w-8 h-8 text-[#5D1A1D]" />
              Información de Envíos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#5D1A1D]" />
                    Envíos Nacionales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Medellín y Área Metropolitana:</span>
                      <Badge variant="outline" className="border-green-600 text-green-400">
                        2-3 días
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bogotá, Cali, Barranquilla:</span>
                      <Badge variant="outline" className="border-blue-600 text-blue-400">
                        3-5 días
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Resto del país:</span>
                      <Badge variant="outline" className="border-yellow-600 text-yellow-400">
                        5-7 días
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#5D1A1D]" />
                    Costos de Envío
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pedidos sobre $300.000:</span>
                      <Badge variant="outline" className="border-green-600 text-green-400">
                        GRATIS
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Medellín:</span>
                      <span className="text-white">$15.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ciudades principales:</span>
                      <span className="text-white">$20.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Resto del país:</span>
                      <span className="text-white">$25.000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#5D1A1D]" />
                  Horarios de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Días de Entrega</h4>
                    <ul className="space-y-1 text-gray-400">
                      <li>• Lunes a Viernes: 8:00 AM - 6:00 PM</li>
                      <li>• Sábados: 9:00 AM - 2:00 PM</li>
                      <li>• Domingos y festivos: No hay entregas</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Empresas de Envío</h4>
                    <ul className="space-y-1 text-gray-400">
                      <li>• Servientrega</li>
                      <li>• Coordinadora</li>
                      <li>• Envía</li>
                      <li>• TCC (The Courier Company)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Returns Information */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <RefreshCw className="w-8 h-8 text-[#5D1A1D]" />
              Política de Devoluciones
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#5D1A1D]" />
                    Condiciones Generales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-[#5D1A1D] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-400">Tienes 30 días calendario para realizar devoluciones</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-[#5D1A1D] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-400">Los productos deben estar en perfecto estado</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-[#5D1A1D] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-400">Con etiquetas originales y empaques</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-[#5D1A1D] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-400">Sin uso, lavado o alteraciones</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Proceso de Devolución</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#5D1A1D] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <p className="text-gray-400">Contacta nuestro servicio al cliente</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-[#5D1A1D] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <p className="text-gray-400">Recibe la autorización de devolución</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-[#5D1A1D] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <p className="text-gray-400">Empaca el producto correctamente</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-[#5D1A1D] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      4
                    </div>
                    <p className="text-gray-400">Envía el producto a nuestra dirección</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Información Importante</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-[#5D1A1D]">Reembolsos</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Procesamos reembolsos en 5-10 días hábiles</li>
                      <li>• Se reembolsa al método de pago original</li>
                      <li>• Los costos de envío no son reembolsables</li>
                      <li>• El cliente asume el costo del envío de devolución</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-[#5D1A1D]">Cambios</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Cambios de talla sin costo adicional</li>
                      <li>• Sujeto a disponibilidad de inventario</li>
                      <li>• Mismo proceso que las devoluciones</li>
                      <li>• Tiempo de procesamiento: 3-5 días hábiles</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-center">¿Necesitas Ayuda?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-400 mb-6">
                Si tienes alguna pregunta sobre envíos o devoluciones, no dudes en contactarnos
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="text-center">
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-400">ventas@717store.com</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-gray-400">+57 300 123 4567</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">Teléfono</p>
                  <p className="text-gray-400">+57 (4) 123-4567</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
