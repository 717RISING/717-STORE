import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Contáctanos
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Estamos aquí para ayudarte. Ponte en contacto con nosotros.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Envíanos un Mensaje</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" placeholder="Tu apellido" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto</Label>
                  <Input id="subject" placeholder="¿En qué podemos ayudarte?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                  />
                </div>
                <Button className="w-full">Enviar Mensaje</Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Dirección</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Calle 123 #45-67<br />
                        Bogotá, Colombia
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Teléfono</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        +57 300 123 4567
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        info@717store.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Horarios de Atención</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                        Sábados: 10:00 AM - 4:00 PM<br />
                        Domingos: Cerrado
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preguntas Frecuentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">¿Cuánto tarda el envío?</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Los envíos nacionales tardan entre 3-7 días hábiles.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">¿Puedo devolver un producto?</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Sí, aceptamos devoluciones dentro de 30 días.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">¿Tienen tienda física?</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Por ahora solo vendemos en línea, pero pronto abriremos nuestra tienda física.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
