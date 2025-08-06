"use client"
import HeroSlider from "@/components/hero-slider"
import ProductGrid from "@/components/product-grid" // Changed to default import
import { getAllProducts, getFeaturedProducts } from "@/lib/database"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { User, ArrowRight, Truck, Shield, Headphones, Star, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import CartSidebar from "@/components/cart-sidebar"
import { MobileMenu } from "@/components/mobile-menu" // Changed to named import
import { useToast } from "@/hooks/use-toast"
import { AdaptiveLoader } from "@/components/loaders/adaptive-loader" // Changed to named import
import { Suspense } from "react"
import { ProductLoader } from "@/components/loaders/product-loader" // Changed to named import
import { MobileProductLoader } from "@/components/loaders/mobile/mobile-product-loader" // Changed to named import
import { useMobileDetection } from '@/hooks/use-mobile-detection' // Client component hook
import { getProducts } from "@/lib/products"; // Fetch products on the server
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, ShieldCheck } from 'lucide-react'
import { Product } from '@/lib/types'
import { BrandLoader } from '@/components/loaders/brand-loader' // Changed to named import
import { AnimatedCard } from "@/components/animated-card"

export const metadata = {
  title: '717 Store - Streetwear y Moda Urbana',
  description: 'Descubre la última colección de streetwear, camisetas, sudaderas, pantalones y accesorios en 717 Store. Estilo auténtico y calidad premium.',
}

export default function HomePage() { // Changed to client component to use hooks
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const isMobile = useMobileDetection()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      const allProducts = await getProducts();
      setProducts(allProducts);
      setFeaturedProducts(allProducts.slice(0, 6));
      setLoading(false);
    };

    fetchProductsData();

    const userAuth = localStorage.getItem("userAuth")
    const userInfo = localStorage.getItem("userInfo")

    if (userAuth === "authenticated" && userInfo) {
      setIsAuthenticated(true)
      const user = JSON.parse(userInfo)
      setUserName(user.name)
    }
  }, [])

  const heroImages = [
    { src: "/slider-1.png", alt: "Colección de verano 717 Store" },
    { src: "/slider-2.png", alt: "Nueva llegada de streetwear" },
    { src: "/slider-3.png", alt: "Ofertas especiales 717 Store" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
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
              <MobileMenu isOpen={false} onClose={() => {}} /> {/* Pass dummy props as it's controlled by Navigation */}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section con Slider */}
      <section className="relative h-[70vh] overflow-hidden">
        <Suspense fallback={<BrandLoader className="h-[400px]" />}>
          <HeroSlider />
        </Suspense>

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

      {/* Featured Products */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Productos Destacados</h2>
          {loading ? (
            isMobile ? <MobileProductLoader /> : <ProductLoader />
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/productos">Ver Todos los Productos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Nuestra Filosofía Section */}
      <section className="container mx-auto px-4 py-12 bg-gray-900 rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Nuestra Filosofía</h2>
        <div className="text-lg text-gray-300 text-center max-w-3xl mx-auto space-y-4">
          <p>
            En 717 Store, creemos que la moda es una extensión de tu identidad. Cada prenda está diseñada para inspirar
            confianza y autenticidad, fusionando el estilo urbano con la comodidad y la calidad.
          </p>
          <p>
            Nos esforzamos por crear piezas que no solo se vean bien, sino que también cuenten una historia. Únete a
            nuestra comunidad y expresa tu individualidad con 717.
          </p>
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

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="tu@email.com"
                value=""
                onChange={() => {}}
                required
                className="input-modern rounded-modern-lg flex-1"
                disabled={false}
              />
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 rounded-modern-lg hover-lift-modern px-6">
                Suscribirse
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Separator */}
      <Separator className="my-12" />

      {/* Additional Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <AnimatedCard delay={0.1}>
              <CardHeader className="flex flex-row items-center space-x-4">
                <Truck className="h-8 w-8 text-primary" />
                <CardTitle>Envío Rápido</CardTitle>
              </CardHeader>
              <CardContent>
                Recibe tus pedidos en tiempo récord con nuestras opciones de envío express.
              </CardContent>
            </AnimatedCard>
            <AnimatedCard delay={0.2}>
              <CardHeader className="flex flex-row items-center space-x-4">
                <RefreshCw className="h-8 w-8 text-primary" />
                <CardTitle>Devoluciones Fáciles</CardTitle>
              </CardHeader>
              <CardContent>
                Proceso de devolución sin complicaciones en 30 días.
              </CardContent>
            </AnimatedCard>
            <AnimatedCard delay={0.3}>
              <CardHeader className="flex flex-row items-center space-x-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <CardTitle>Pago Seguro</CardTitle>
              </CardHeader>
              <CardContent>
                Tus transacciones están protegidas con la última tecnología de encriptación.
              </CardContent>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Featured Products from Updates */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            Nuestros Productos Destacados
          </h2>
          {loading ? (
            isMobile ? <MobileProductLoader /> : <ProductLoader />
          ) : (
            <ProductGrid products={products.slice(0, 8)} /> {/* Display a subset of products */}
          )}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Sobre 717 Store
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            En 717 Store, nos apasiona la moda urbana y el streetwear. Ofrecemos una selección curada de prendas exclusivas y de alta calidad que reflejan tu estilo único. Creemos en la autoexpresión a través de la ropa y nos esforzamos por traerte las últimas tendencias con un toque distintivo.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            Nuestra misión es empoderarte para que te vistas con confianza y autenticidad. ¡Únete a la comunidad 717!
          </p>
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
