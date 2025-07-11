"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Truck,
  Package,
  Clock,
  Shield,
  RefreshCw,
  CreditCard,
  MapPin,
  User,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"
import { formatPrice } from "@/lib/products"

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="px-4 py-6 bg-transparent border-b border-gray-800">
        <nav className="max-w-7xl mx-auto">
          <div className="flex justify-end items-center mb-4">
            <div className="flex items-center space-x-4">
              <Link href="/cuenta" className="text-white hover:text-gray-300 transition-colors">
                <User className="w-6 h-6" />
              </Link>
              <CartSidebar />
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center">
              <div className="w-16 h-16 relative">
                <Image src="/logo.png" alt="717 Logo" fill className="object-contain filter invert" priority />
              </div>
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-gray-300 transition-colors font-medium">
                INICIO
              </Link>
              <Link href="/productos" className="text-white hover:text-gray-300 transition-colors font-medium">
                PRODUCTOS
              </Link>
              <Link href="/contacto" className="text-white hover:text-gray-300 transition-colors font-medium">
                CONTACTO
              </Link>
            </div>
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </nav>
      </header>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link href="/">
          <Button variant="ghost" className="text-white hover:bg-gray-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Envíos y Devoluciones</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Toda la información sobre nuestros servicios de envío y política de devoluciones.
          </p>
        </div>
      </section>

      {/* Shipping Information */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Shipping */}
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Truck className="w-8 h-8 text-[#5D1A1D]" />
                Información de Envíos
              </h2>

              <div className="space-y-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#5D1A1D]" />
                      Cobertura Nacional
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-white font-semibold">Medellín</p>
                        <p className="text-gray-400 text-sm">2-3 días hábiles</p>
                      </div>
                      <Badge className="bg-[#5D1A1D] text-white">{formatPrice(15000)}</Badge>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-white font-semibold">Ciudades Principales</p>
                        <p className="text-gray-400 text-sm">3-5 días hábiles</p>
                      </div>
                      <Badge className="bg-[#5D1A1D] text-white">{formatPrice(20000)}</Badge>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-white font-semibold">Resto del País</p>
                        <p className="text-gray-400 text-sm">5-7 días hábiles</p>
                      </div>
                      <Badge className="bg-[#5D1A1D] text-white">{formatPrice(25000)}</Badge>
                    </div>

                    <div className="bg-green-900/20 border border-green-700 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <p className="text-green-400 font-semibold">¡Envío Gratis!</p>
                      </div>
                      <p className="text-gray-300 text-sm">En pedidos superiores a {formatPrice(300000)}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Package className="w-5 h-5 text-[#5D1A1D]" />
                      Proceso de Envío
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#5D1A1D] rounded-full flex items-center justify-center text-white text-sm font-bold">
                          1
                        </div>
                        <div>
                          <p className="text-white font-semibold">Confirmación del Pedido</p>
                          <p className="text-gray-400 text-sm">Recibirás un email de confirmación inmediatamente</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#5D1A1D] rounded-full flex items-center justify-center text-white text-sm font-bold">
                          2
                        </div>
                        <div>
                          <p className="text-white font-semibold">Preparación</p>
                          <p className="text-gray-400 text-sm">Preparamos tu pedido en 24-48 horas</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#5D1A1D] rounded-full flex items-center justify-center text-white text-sm font-bold">
                          3
                        </div>
                        <div>
                          <p className="text-white font-semibold">Envío</p>
                          <p className="text-gray-400 text-sm">Te enviamos el código de seguimiento</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#5D1A1D] rounded-full flex items-center justify-center text-white text-sm font-bold">
                          4
                        </div>
                        <div>
                          <p className="text-white font-semibold">Entrega</p>
                          <p className="text-gray-400 text-sm">Recibe tu pedido en la dirección indicada</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Returns */}
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <RefreshCw className="w-8 h-8 text-[#5D1A1D]" />
                Política de Devoluciones
              </h2>

              <div className="space-y-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-[#5D1A1D]" />
                      Garantía de Satisfacción
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-900/20 border border-blue-700 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-blue-400" />
                        <p className="text-blue-400 font-semibold">30 Días para Devoluciones</p>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Tienes 30 días desde la recepción para devolver tu producto
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <p className="text-gray-300 text-sm">Producto en perfecto estado</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <p className="text-gray-300 text-sm">Con etiquetas originales</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <p className="text-gray-300 text-sm">Sin uso ni lavado</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <p className="text-gray-300 text-sm">Empaque original</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#5D1A1D]" />
                      Proceso de Reembolso
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#5D1A1D] rounded-full flex items-center justify-center text-white text-sm font-bold">
                          1
                        </div>
                        <div>
                          <p className="text-white font-semibold">Solicita la Devolución</p>
                          <p className="text-gray-400 text-sm">Contáctanos por email o WhatsApp</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#5D1A1D] rounded-full flex items-center justify-center text-white text-sm font-bold">
                          2
                        </div>
                        <div>
                          <p className="text-white font-semibold">Envía el Producto</p>
                          <p className="text-gray-400 text-sm">Te proporcionamos la guía de envío</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#5D1A1D] rounded-full flex items-center justify-center text-white text-sm font-bold">
                          3
                        </div>
                        <div>
                          <p className="text-white font-semibold">Inspección</p>
                          <p className="text-gray-400 text-sm">Verificamos el estado del producto</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#5D1A1D] rounded-full flex items-center justify-center text-white text-sm font-bold">
                          4
                        </div>
                        <div>
                          <p className="text-white font-semibold">Reembolso</p>
                          <p className="text-gray-400 text-sm">Procesamos el reembolso en 3-5 días hábiles</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Cambios de Talla</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-900/20 border border-green-700 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <p className="text-green-400 font-semibold">¡Sin Costo Adicional!</p>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Los cambios de talla no tienen costo adicional. Solo pagas el envío de vuelta.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                Información Importante
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Productos No Retornables</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Productos personalizados</li>
                    <li>• Ropa interior</li>
                    <li>• Productos en oferta especial</li>
                    <li>• Artículos dañados por mal uso</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Contacto para Devoluciones</h4>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>📧 devoluciones@717store.com</p>
                    <p>📱 +57 300 123 4567</p>
                    <p>🕒 Lunes a Sábado: 8AM - 8PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">&copy; 2024 717 Store. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
