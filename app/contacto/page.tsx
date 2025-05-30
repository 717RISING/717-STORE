"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { User, Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactarnos. Te responderemos pronto.",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

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

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">CONTACTO</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para ti. Contáctanos y te responderemos lo antes
            posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Envíanos un mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Nombre completo
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-white"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Correo electrónico
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-white"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Asunto
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-white"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-white resize-none"
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-3 text-lg"
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar mensaje
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Información de contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-white mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Correo electrónico</h3>
                    <p className="text-gray-300">info@717store.com</p>
                    <p className="text-gray-300">soporte@717store.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-white mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Teléfono</h3>
                    <p className="text-gray-300">+1 (555) 717-0717</p>
                    <p className="text-gray-300">WhatsApp: +1 (555) 717-0717</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-white mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Dirección</h3>
                    <p className="text-gray-300">717 Streetwear Avenue</p>
                    <p className="text-gray-300">Urban District, NY 10001</p>
                    <p className="text-gray-300">Estados Unidos</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-white mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Horarios de atención</h3>
                    <p className="text-gray-300">Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-300">Sábados: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-300">Domingos: Cerrado</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Preguntas frecuentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">¿Cuánto tiempo tarda el envío?</h4>
                  <p className="text-gray-300 text-sm">
                    Los envíos nacionales tardan de 3-5 días hábiles. Los envíos internacionales pueden tardar de 7-14
                    días hábiles.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">¿Puedo devolver un producto?</h4>
                  <p className="text-gray-300 text-sm">
                    Sí, aceptamos devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar en
                    condiciones originales.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">¿Ofrecen descuentos por volumen?</h4>
                  <p className="text-gray-300 text-sm">
                    Sí, ofrecemos descuentos especiales para compras al por mayor. Contáctanos para más información.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">¿Cómo puedo rastrear mi pedido?</h4>
                  <p className="text-gray-300 text-sm">
                    Una vez que tu pedido sea enviado, recibirás un número de seguimiento por correo electrónico.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Síguenos en redes sociales</h2>
          <div className="flex justify-center space-x-8">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                <span className="font-bold">IG</span>
              </div>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                <span className="font-bold">FB</span>
              </div>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                <span className="font-bold">TW</span>
              </div>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                <span className="font-bold">TK</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800 mt-16">
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
                  <Link href="/envios" className="hover:text-white transition-colors">
                    Envíos
                  </Link>
                </li>
                <li>
                  <Link href="/devoluciones" className="hover:text-white transition-colors">
                    Devoluciones
                  </Link>
                </li>
                <li>
                  <Link href="/tallas" className="hover:text-white transition-colors">
                    Guía de tallas
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
