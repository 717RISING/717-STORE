"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, User, Ruler } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"
import SizeCalculator from "@/components/size-calculator"

export default function SizeGuidePage() {
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
            <Ruler className="w-8 h-8 text-[#5D1A1D] mr-3" />
            <h1 className="text-4xl font-bold">GUÍA DE TALLAS</h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Encuentra tu talla perfecta con nuestra guía completa y calculadora interactiva
          </p>
        </div>

        {/* Size Guide */}
        <Card className="w-full max-w-4xl bg-gray-900 border-gray-800 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-[#5D1A1D] text-center">Guía de Tallas</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none text-gray-300">
            <p>
              En 717 Store, queremos asegurarnos de que encuentres el ajuste perfecto para tu ropa urbana. Utiliza
              nuestra guía de tallas a continuación para ayudarte a elegir la talla correcta. Recuerda que las medidas
              son aproximadas y pueden variar ligeramente entre estilos.
            </p>

            <h2>Cómo Medirte:</h2>
            <ul className="list-disc list-inside">
              <li>**Pecho:** Mide alrededor de la parte más ancha de tu pecho, justo debajo de las axilas.</li>
              <li>
                **Cintura:** Mide alrededor de la parte más estrecha de tu cintura, generalmente por encima del ombligo.
              </li>
              <li>**Cadera:** Mide alrededor de la parte más ancha de tus caderas, manteniendo la cinta horizontal.</li>
              <li>
                **Largo de Manga:** Mide desde el centro de la parte posterior de tu cuello, a lo largo del hombro y
                hasta la muñeca.
              </li>
            </ul>

            <h2>Tabla de Tallas (Camisetas y Hoodies):</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-3 border border-gray-600">Talla</th>
                    <th className="p-3 border border-gray-600">Pecho (cm)</th>
                    <th className="p-3 border border-gray-600">Cintura (cm)</th>
                    <th className="p-3 border border-gray-600">Largo (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-800">
                    <td className="p-3 border border-gray-700">S</td>
                    <td className="p-3 border border-gray-700">90-95</td>
                    <td className="p-3 border border-gray-700">75-80</td>
                    <td className="p-3 border border-gray-700">68-70</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="p-3 border border-gray-700">M</td>
                    <td className="p-3 border border-gray-700">96-101</td>
                    <td className="p-3 border border-gray-700">81-86</td>
                    <td className="p-3 border border-gray-700">71-73</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="p-3 border border-gray-700">L</td>
                    <td className="p-3 border border-gray-700">102-107</td>
                    <td className="p-3 border border-gray-700">87-92</td>
                    <td className="p-3 border border-gray-700">74-76</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="p-3 border border-gray-700">XL</td>
                    <td className="p-3 border border-gray-700">108-113</td>
                    <td className="p-3 border border-gray-700">93-98</td>
                    <td className="p-3 border border-gray-700">77-79</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="p-3 border border-gray-700">XXL</td>
                    <td className="p-3 border border-gray-700">114-119</td>
                    <td className="p-3 border border-gray-700">99-104</td>
                    <td className="p-3 border border-gray-700">80-82</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-6">
              Si tienes dudas entre dos tallas, te recomendamos elegir la talla más grande para un ajuste más holgado,
              típico de la ropa urbana.
            </p>
          </CardContent>
        </Card>

        {/* Size Calculator */}
        <Card className="w-full max-w-4xl bg-gray-900 border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-[#5D1A1D] text-center">Calculadora de Tallas</CardTitle>
          </CardHeader>
          <CardContent>
            <SizeCalculator />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
