"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, User, Truck, Package, Clock, Shield, RefreshCw, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"

export default function EnviosDevolucionesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="px-4 py-6 bg-transparent border-b border-gray-800">
        <nav className="max-w-7xl mx-auto">
          {/* Top Row - Icons Only */}
          <div className="flex justify-end items-center mb-4">
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-white hover:text-gray-300 transition-colors">
                <User className="w-6 h-6" />
              </Link>
              <CartSidebar />
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center">
              <div className="w-16 h-16 relative">
                <Image
                  src="/logo.png"
                  alt="717 Logo"
                  width={64}
                  height={64}
                  className="object-contain filter invert"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Bottom Row - Navigation Links */}
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

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </nav>
      </header>

      {/* Breadcrumb */}
      <div className="px-4 py-4">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Truck className="w-8 h-8 text-[#5D1A1D] mr-3" />
            <h1 className="text-4xl font-bold">ENVÍOS Y DEVOLUCIONES</h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Toda la información sobre nuestras políticas de envío y devoluciones
          </p>
        </div>

        {/* Envíos Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
            <Package className="w-8 h-8 text-[#5D1A1D] mr-3" />
            INFORMACIÓN DE ENVÍOS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Métodos de Envío */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Truck className="w-6 h-6 text-[#5D1A1D] mr-3" />
                  Métodos de Envío
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-white">Envío Estándar</h4>
                    <p className="text-gray-400 text-sm">5-7 días hábiles</p>
                  </div>
                  <Badge className="bg-green-600">$5.99</Badge>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-white">Envío Express</h4>
                    <p className="text-gray-400 text-sm">2-3 días hábiles</p>
                  </div>
                  <Badge className="bg-blue-600">$12.99</Badge>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-white">Envío Gratis</h4>
                    <p className="text-gray-400 text-sm">En pedidos +$50</p>
                  </div>
                  <Badge className="bg-[#5D1A1D]">GRATIS</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Tiempos de Procesamiento */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Clock className="w-6 h-6 text-[#5D1A1D] mr-3" />
                  Tiempos de Procesamiento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Procesamiento del Pedido</h4>
                  <p>• 1-2 días hábiles para preparar tu pedido</p>
                  <p>• Verificación de stock y calidad</p>
                  <p>• Empaque seguro y cuidadoso</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Horarios de Envío</h4>
                  <p>• Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                  <p>• Sábados: 9:00 AM - 2:00 PM</p>
                  <p>• Domingos y festivos: No hay envíos</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Seguimiento */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Shield className="w-6 h-6 text-[#5D1A1D] mr-3" />
                Seguimiento de Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#5D1A1D] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Confirmación</h4>
                  <p className="text-sm">Recibirás un email de confirmación con los detalles de tu pedido</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#5D1A1D] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">En Camino</h4>
                  <p className="text-sm">Te enviaremos el número de seguimiento cuando tu pedido sea despachado</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#5D1A1D] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Entregado</h4>
                  <p className="text-sm">Confirmación de entrega y seguimiento post-venta</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Devoluciones Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-[#5D1A1D] mr-3" />
            POLÍTICA DE DEVOLUCIONES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Condiciones */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Condiciones para Devoluciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">✅ Aceptamos devoluciones si:</h4>
                  <ul className="space-y-1">
                    <li>• El producto está en condiciones originales</li>
                    <li>• Conserva todas las etiquetas</li>
                    <li>• No ha sido usado o lavado</li>
                    <li>• Se solicita dentro de 30 días</li>
                    <li>• Incluye el recibo de compra</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">❌ No aceptamos devoluciones de:</h4>
                  <ul className="space-y-1">
                    <li>• Productos personalizados</li>
                    <li>• Ropa interior por higiene</li>
                    <li>• Productos en oferta final</li>
                    <li>• Artículos dañados por mal uso</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Proceso */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Proceso de Devolución</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#5D1A1D] rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Contacta con nosotros</h4>
                      <p className="text-sm">Envía un email a devoluciones@717store.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#5D1A1D] rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Autorización</h4>
                      <p className="text-sm">Te enviaremos una etiqueta de devolución</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#5D1A1D] rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Envío</h4>
                      <p className="text-sm">Empaca el producto y envíalo de vuelta</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-[#5D1A1D] rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Reembolso</h4>
                      <p className="text-sm">Procesamos tu reembolso en 5-7 días</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cambios */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Cambios de Talla</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Cambios Gratuitos</h4>
                  <p className="mb-3">
                    Ofrecemos cambios de talla gratuitos dentro de los primeros 15 días de tu compra.
                  </p>
                  <ul className="space-y-1">
                    <li>• Mismo producto, diferente talla</li>
                    <li>• Producto en condiciones originales</li>
                    <li>• Stock disponible de la nueva talla</li>
                    <li>• Proceso rápido de 3-5 días</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">¿Dudas con tu talla?</h4>
                  <p className="mb-3">Consulta nuestra guía de tallas o usa nuestra calculadora interactiva.</p>
                  <Link href="/tallas">
                    <Button className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">Ver Guía de Tallas</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-center">¿Necesitas Ayuda?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Mail className="w-8 h-8 text-[#5D1A1D] mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2">Email</h4>
                <p className="text-gray-400 text-sm mb-3">Para consultas sobre envíos y devoluciones</p>
                <p className="text-white">soporte@717store.com</p>
              </div>

              <div>
                <Phone className="w-8 h-8 text-[#5D1A1D] mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2">Teléfono</h4>
                <p className="text-gray-400 text-sm mb-3">Lunes a Viernes 9:00 - 18:00</p>
                <p className="text-white">+1 (555) 717-STORE</p>
              </div>

              <div>
                <Clock className="w-8 h-8 text-[#5D1A1D] mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2">Horarios</h4>
                <p className="text-gray-400 text-sm mb-3">Tiempo de respuesta promedio</p>
                <p className="text-white">24-48 horas</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/contacto">
                <Button className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22] mr-4">Contactar Soporte</Button>
              </Link>
              <Link href="/productos">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Seguir Comprando
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
