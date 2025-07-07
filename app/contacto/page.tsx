"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import Navigation from "@/components/navigation"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactarnos. Te responderemos pronto.",
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contáctanos</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#5D1A1D] p-3 rounded-lg">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Dirección</h3>
                      <p className="text-gray-400">
                        Carrera 70 #45-32
                        <br />
                        Medellín, Antioquia
                        <br />
                        Colombia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#5D1A1D] p-3 rounded-lg">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Teléfono</h3>
                      <p className="text-gray-400">+57 (4) 123-4567</p>
                      <p className="text-gray-400">+57 300 123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#5D1A1D] p-3 rounded-lg">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-gray-400">info@717store.com</p>
                      <p className="text-gray-400">ventas@717store.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#5D1A1D] p-3 rounded-lg">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Horarios de Atención</h3>
                      <p className="text-gray-400">
                        Lunes - Viernes: 9:00 AM - 6:00 PM
                        <br />
                        Sábados: 10:00 AM - 4:00 PM
                        <br />
                        Domingos: Cerrado
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-0">
                  <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-600" />
                      <p className="text-gray-400">Mapa de ubicación</p>
                      <p className="text-sm text-gray-500">Medellín, Antioquia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Envíanos un Mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white">
                        Nombre Completo *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-white">
                        Teléfono
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+57 300 123 4567"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-white">
                        Asunto *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">
                      Mensaje *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="bg-gray-800 border-gray-700 text-white resize-none"
                      placeholder="Escribe tu mensaje aquí..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#5D1A1D] text-white hover:bg-[#6B1E22] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">¿Necesitas Ayuda Inmediata?</h2>
            <p className="text-gray-400 mb-6">
              También puedes contactarnos a través de nuestras redes sociales o chat en vivo
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                WhatsApp: +57 300 123 4567
              </Button>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                Chat en Vivo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
