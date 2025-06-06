"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, User, Ruler, Calculator, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"
import SizeCalculator from "@/components/size-calculator"

export default function TallasPage() {
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

        {/* Size Calculator */}
        <div className="mb-16">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Calculator className="w-6 h-6 text-[#5D1A1D] mr-3" />
                Calculadora de Tallas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SizeCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Measurement Instructions */}
        <div className="mb-16">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Info className="w-6 h-6 text-[#5D1A1D] mr-3" />
                Cómo Medir Correctamente
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Herramientas Necesarias</h3>
                  <ul className="space-y-2">
                    <li>• Cinta métrica flexible</li>
                    <li>• Espejo de cuerpo completo</li>
                    <li>• Ropa ajustada o ropa interior</li>
                    <li>• Ayuda de otra persona (recomendado)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Consejos Importantes</h3>
                  <ul className="space-y-2">
                    <li>• Mide sobre ropa interior o ropa muy ajustada</li>
                    <li>• Mantén la cinta métrica paralela al suelo</li>
                    <li>• No aprietes demasiado la cinta</li>
                    <li>• Toma las medidas en posición relajada</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Size Charts */}
        <div className="space-y-12">
          {/* Camisetas */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">👕 Camisetas y T-Shirts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-white">Talla</th>
                      <th className="text-left py-3 px-4 text-white">Pecho (cm)</th>
                      <th className="text-left py-3 px-4 text-white">Largo (cm)</th>
                      <th className="text-left py-3 px-4 text-white">Ancho Hombros (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">XS</td>
                      <td className="py-3 px-4">86-91</td>
                      <td className="py-3 px-4">66</td>
                      <td className="py-3 px-4">42</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">S</td>
                      <td className="py-3 px-4">91-96</td>
                      <td className="py-3 px-4">69</td>
                      <td className="py-3 px-4">44</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">M</td>
                      <td className="py-3 px-4">96-101</td>
                      <td className="py-3 px-4">72</td>
                      <td className="py-3 px-4">46</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">L</td>
                      <td className="py-3 px-4">101-106</td>
                      <td className="py-3 px-4">75</td>
                      <td className="py-3 px-4">48</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">XL</td>
                      <td className="py-3 px-4">106-111</td>
                      <td className="py-3 px-4">78</td>
                      <td className="py-3 px-4">50</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">XXL</td>
                      <td className="py-3 px-4">111-116</td>
                      <td className="py-3 px-4">81</td>
                      <td className="py-3 px-4">52</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Hoodies */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">🧥 Hoodies y Sudaderas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-white">Talla</th>
                      <th className="text-left py-3 px-4 text-white">Pecho (cm)</th>
                      <th className="text-left py-3 px-4 text-white">Largo (cm)</th>
                      <th className="text-left py-3 px-4 text-white">Manga (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">XS</td>
                      <td className="py-3 px-4">88-93</td>
                      <td className="py-3 px-4">68</td>
                      <td className="py-3 px-4">60</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">S</td>
                      <td className="py-3 px-4">93-98</td>
                      <td className="py-3 px-4">71</td>
                      <td className="py-3 px-4">62</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">M</td>
                      <td className="py-3 px-4">98-103</td>
                      <td className="py-3 px-4">74</td>
                      <td className="py-3 px-4">64</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">L</td>
                      <td className="py-3 px-4">103-108</td>
                      <td className="py-3 px-4">77</td>
                      <td className="py-3 px-4">66</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">XL</td>
                      <td className="py-3 px-4">108-113</td>
                      <td className="py-3 px-4">80</td>
                      <td className="py-3 px-4">68</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">XXL</td>
                      <td className="py-3 px-4">113-118</td>
                      <td className="py-3 px-4">83</td>
                      <td className="py-3 px-4">70</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pantalones */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">👖 Pantalones y Jeans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-white">Talla</th>
                      <th className="text-left py-3 px-4 text-white">Cintura (cm)</th>
                      <th className="text-left py-3 px-4 text-white">Cadera (cm)</th>
                      <th className="text-left py-3 px-4 text-white">Largo (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">28</td>
                      <td className="py-3 px-4">71-74</td>
                      <td className="py-3 px-4">86-89</td>
                      <td className="py-3 px-4">102</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">30</td>
                      <td className="py-3 px-4">76-79</td>
                      <td className="py-3 px-4">91-94</td>
                      <td className="py-3 px-4">104</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">32</td>
                      <td className="py-3 px-4">81-84</td>
                      <td className="py-3 px-4">96-99</td>
                      <td className="py-3 px-4">106</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">34</td>
                      <td className="py-3 px-4">86-89</td>
                      <td className="py-3 px-4">101-104</td>
                      <td className="py-3 px-4">108</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">36</td>
                      <td className="py-3 px-4">91-94</td>
                      <td className="py-3 px-4">106-109</td>
                      <td className="py-3 px-4">110</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">38</td>
                      <td className="py-3 px-4">96-99</td>
                      <td className="py-3 px-4">111-114</td>
                      <td className="py-3 px-4">112</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Gorras */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">🧢 Gorras y Accesorios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-white">Talla</th>
                      <th className="text-left py-3 px-4 text-white">Circunferencia (cm)</th>
                      <th className="text-left py-3 px-4 text-white">Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">S/M</td>
                      <td className="py-3 px-4">54-57</td>
                      <td className="py-3 px-4">Talla pequeña a mediana</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 font-medium">L/XL</td>
                      <td className="py-3 px-4">58-61</td>
                      <td className="py-3 px-4">Talla grande a extra grande</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Ajustable</td>
                      <td className="py-3 px-4">54-62</td>
                      <td className="py-3 px-4">Con cierre ajustable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">¿Necesitas Ayuda?</h3>
              <p className="text-gray-400 mb-6">
                Si tienes dudas sobre tu talla o necesitas asesoramiento personalizado, no dudes en contactarnos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contacto">
                  <Button className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">Contactar Soporte</Button>
                </Link>
                <Link href="/productos">
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    Ver Productos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
