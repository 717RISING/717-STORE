import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-center">Contáctanos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-semibold">Envíanos un Mensaje</CardTitle>
            <CardDescription>
              ¿Tienes alguna pregunta o comentario? Rellena el formulario y nos pondremos en contacto contigo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Tu nombre" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Tu email" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Asunto</Label>
              <Input id="subject" placeholder="Asunto del mensaje" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea id="message" placeholder="Escribe tu mensaje aquí..." className="min-h-[120px]" />
            </div>
            <Button type="submit" className="w-full">Enviar Mensaje</Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold">Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <p>info@717store.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <p>+34 123 456 789</p>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <p>Calle Ficticia, 123, Ciudad, País</p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold">Horario de Atención</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
              <p>Sábado: 10:00 AM - 2:00 PM</p>
              <p>Domingo: Cerrado</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
