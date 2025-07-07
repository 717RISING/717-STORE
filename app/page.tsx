"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { User, ArrowRight, Truck, Shield, Headphones, Star, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import HeroSlider from "@/components/hero-slider"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"
import { products } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  const [userName, setUserName] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const userAuth = localStorage.getItem("userAuth")
    const userInfo = localStorage.getItem("userInfo")

    if (userAuth === "authenticated" && userInfo) {
      setIsAuthenticated(true)
      const user = JSON.parse(userInfo)
      setUserName(user.name)
    }
  }, [])

  // Productos destacados (solo camisetas con imágenes reales)
  const featuredProducts = products
    .filter((product) => product.category === "camisetas" && !product.images[0].includes("placeholder"))
    .slice(0, 4)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "¡Suscripción exitosa!",
      description: "Te has suscrito correctamente al newsletter de 717 Store.",
    })

    setEmail("")
    setIsSubmitting(false)
  }

  const features = [
    {
      icon: Truck,
      title: "Envío Gratis",
      description: "En pedidos superiores a $50",
      delay: 0,
    },
    {
      icon: Shield,
      title: "Compra Segura",
      description: "Protección total en tus pagos",
      delay: 200,
    },
    {
      icon: Headphones,
      title: "Soporte 24/7",
      description: "Atención al cliente siempre disponible",
      delay: 400,
    },
    {
      icon: Star,
      title: "Calidad Premium",
      description: "Productos de la más alta calidad",
      delay: 600,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="px-4 py-6 bg-transparent border-b border-gray-800">
        <nav className="max-w-7xl mx-auto">
          {/* Top Row - Icons Only */}
          <div className="flex justify-end items-center mb-4">
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link href="/cuenta" className="text-white hover:text-gray-300 transition-colors">
                  <div className="flex items-center space-x-2">
                    <User className="w-6 h-6" />
                    {userName && <span className="hidden md:inline text-sm">{userName}</span>}
                  </div>
                </Link>
              ) : (
                <Link href="/login" className="text-white hover:text-gray-300 transition-colors">
                  <User className="w-6 h-6" />
                </Link>
              )}
              <CartSidebar />
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center">
              <div className="w-16 h-16 relative">
                <Image src="/logo.png" alt="717 Logo" fill className="object-contain filter invert" priority />
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

      {/* Hero Section con Slider */}
      <section className="relative h-[70vh] overflow-hidden">
        <HeroSlider />

        {/* Overlay con contenido */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
          <div className="text-center space-y-6 px-4 max-w-4xl mx-auto">
            <Badge className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 animate-pulse-glow rounded-modern text-white border-0">
              NUEVA COLECCIÓN DISPONIBLE
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in text-glow">
              717 STORE
              <span className="block text-2xl md:text-3xl lg:text-4xl text-gray-300 mt-2">THE BEGINNING</span>
            </h1>

            <p
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              Descubre la nueva era del streetwear con diseños exclusivos que reflejan tu personalidad urbana.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              <Link href="/productos">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 rounded-modern-lg hover-lift-modern px-8 py-3"
                >
                  Explorar Colección
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 rounded-modern-lg hover-lift-modern px-8 py-3 bg-transparent"
              >
                Ver Lookbook
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center space-y-4 animate-fade-in card-modern p-6 rounded-modern-lg hover-lift-modern"
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-red-600 to-red-700 rounded-modern-xl flex items-center justify-center hover-glow-modern">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-glow">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-red-600/20 text-red-400 border-red-600/30 rounded-modern mb-4">
              PRODUCTOS DESTACADOS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">Nuevos Diseños Exclusivos</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Descubre nuestra colección de camisetas con diseños únicos que combinan arte urbano, espiritualidad y
              expresión personal. Cada pieza cuenta una historia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="bg-gray-900 border-gray-800 overflow-hidden group card-modern rounded-modern-lg hover-lift-modern animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-square rounded-t-modern-lg overflow-hidden">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-modern-lg"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 animate-pulse-glow rounded-modern text-white border-0">
                      NUEVO
                    </Badge>
                  )}

                  {/* Overlay con efecto glassmorphism */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-modern-lg backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-modern-lg" />
                  </div>
                </div>

                <CardContent className="p-6 space-y-3">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-[#5D1A1D] transition-colors duration-300 text-glow">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                    {product.description.substring(0, 60)}...
                  </p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xl font-bold group-hover:scale-110 transition-transform duration-300 text-white">
                      ${product.price}
                    </span>
                    <Link href={`/productos/${product.id}`}>
                      <Button className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22] rounded-modern-lg hover-glow-modern transition-all duration-300">
                        Ver Detalles
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/productos">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 rounded-modern-lg hover-lift-modern px-8 py-3"
              >
                Ver Todos los Productos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-modern p-12 rounded-modern-xl">
            <Mail className="w-16 h-16 mx-auto mb-6 text-red-500" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">Mantente al Día</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Suscríbete a nuestro newsletter y sé el primero en conocer nuestros nuevos lanzamientos, ofertas
              exclusivas y contenido especial de la comunidad 717.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-modern rounded-modern-lg flex-1"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 rounded-modern-lg hover-lift-modern px-6"
              >
                {isSubmitting ? "Suscribiendo..." : "Suscribirse"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">717 STORE</h3>
              <p className="text-gray-400">Streetwear auténtico para la nueva generación.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">NAVEGACIÓN</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/productos" className="hover:text-white transition-colors">
                    Productos
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">AYUDA</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/envios-devoluciones" className="hover:text-white transition-colors">
                    Envíos y Devoluciones
                  </Link>
                </li>
                <li>
                  <Link href="/tallas" className="hover:text-white transition-colors">
                    Guía de tallas
                  </Link>
                </li>
                <li>
                  <Link href="/terminos" className="hover:text-white transition-colors">
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad" className="hover:text-white transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">SÍGUENOS</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 717 Store. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
