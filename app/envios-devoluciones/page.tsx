"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Package, Clock, Shield, RefreshCw, CreditCard, MapPin, User, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
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

      {/* Shipping and Returns Information */}
      <section className="py-16 px-4">
        <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shipping Information */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center space-x-4">
                <Truck className="h-8 w-8 text-[#4A1518]" />
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Información de Envíos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  En 717 Store, nos esforzamos por asegurar que tus pedidos lleguen de manera rápida y segura. A continuación,
                  detallamos nuestra política de envíos:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Tiempos de Procesamiento:</strong> Todos los pedidos se procesan dentro de 1-2 días hábiles
                    después de la confirmación del pago.
                  </li>
                  <li>
                    <strong>Tiempos de Envío:</strong>
                    <ul className="list-circle list-inside ml-4">
                      <li>Envíos Nacionales (Colombia): 3-7 días hábiles.</li>
                      <li>Envíos Internacionales: 7-20 días hábiles (dependiendo del destino).</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Costos de Envío:</strong> Los costos de envío se calculan al finalizar la compra y varían según
                    el peso, el tamaño del paquete y el destino. Ofrecemos envío gratuito en pedidos superiores a $200.000 COP.
                  </li>
                  <li>
                    <strong>Seguimiento de Pedidos:</strong> Una vez que tu pedido sea enviado, recibirás un correo
                    electrónico con un número de seguimiento para que puedas monitorear su progreso.
                  </li>
                </ul>
                <p>
                  Ten en cuenta que los tiempos de envío pueden verse afectados por días festivos, condiciones climáticas
                  adversas o demoras aduaneras en envíos internacionales.
                </p>
              </CardContent>
            </Card>

            {/* Returns and Exchanges */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center space-x-4">
                <RefreshCw className="h-8 w-8 text-[#4A1518]" />
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Devoluciones y Cambios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Queremos que estés completamente satisfecho con tu compra en 717 Store. Si por alguna razón no lo estás,
                  aquí te explicamos cómo proceder con devoluciones y cambios:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Plazo de Devolución:</strong> Tienes 30 días calendario a partir de la fecha de entrega para
                    solicitar una devolución o cambio.
                  </li>
                  <li>
                    <strong>Condiciones del Artículo:</strong> Los artículos deben estar sin usar, sin lavar, con todas las
                    etiquetas originales y en su empaque original.
                  </li>
                  <li>
                    <strong>Proceso de Devolución:</strong>
                    <ol className="list-decimal list-inside ml-4">
                      <li>Contacta a nuestro equipo de soporte en info@717store.com con tu número de pedido.</li>
                      <li>Te proporcionaremos instrucciones detalladas y una guía de envío.</li>
                      <li>Una vez recibido y verificado el artículo, procesaremos tu reembolso o cambio.</li>
                    </ol>
                  </li>
                  <li>
                    <strong>Reembolsos:</strong> Los reembolsos se emitirán al método de pago original dentro de 5-10 días
                    hábiles después de la aprobación de la devolución. Los costos de envío originales no son reembolsables.
                  </li>
                  <li>
                    <strong>Cambios:</strong> Si deseas un cambio por talla o color, por favor, indícalo en tu solicitud.
                    Los cambios están sujetos a disponibilidad de stock.
                  </li>
                </ul>
                <p>
                  Para cualquier pregunta adicional sobre envíos o devoluciones, no dudes en contactarnos.
                </p>
              </CardContent>
            </Card>
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
