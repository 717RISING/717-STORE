"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Truck, Shield, Headphones, Star, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import InteractiveProductCard from "@/components/interactive-product-card"
import HeroSlider from "@/components/hero-slider"
import { products } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

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
      {/* Hero Section con Slider */}
      <section className="relative">
        <HeroSlider />

        {/* Overlay con contenido */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
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
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 rounded-modern-lg hover-lift-modern px-8 py-3"
              >
                Explorar Colección
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

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
              <InteractiveProductCard key={product.id} product={product} delay={index * 100} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 rounded-modern-lg hover-lift-modern px-8 py-3"
            >
              Ver Todos los Productos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
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
    </div>
  )
}
