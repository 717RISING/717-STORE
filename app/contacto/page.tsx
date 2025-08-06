"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { submitContactForm } from '@/app/actions' // Assuming this is a Server Action

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await submitContactForm(formData)
      if (result.success) {
        toast({
          title: "Mensaje Enviado",
          description: "Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto pronto.",
          variant: "default",
        })
        setFormData({ name: '', email: '', subject: '', message: '' }) // Clear form
      } else {
        toast({
          title: "Error al Enviar",
          description: result.error || "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting contact form:", error)
      toast({
        title: "Error Inesperado",
        description: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))]">
      <h1 className="text-4xl font-bold text-center mb-8">Contáctanos</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        ¿Tienes alguna pregunta, comentario o necesitas ayuda? No dudes en contactarnos. Estamos aquí para ayudarte.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Envíanos un Mensaje</CardTitle>
            <CardDescription>Completa el formulario y te responderemos a la brevedad.</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" type="text" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="subject">Asunto</Label>
                <Input id="subject" type="text" value={formData.subject} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" value={formData.message} onChange={handleChange} required rows={5} />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Mensaje'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Nuestra Información de Contacto</CardTitle>
            <CardDescription>Puedes encontrarnos o contactarnos a través de los siguientes medios:</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0 space-y-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-muted-foreground">info@717store.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-medium">Teléfono</h4>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-medium">Dirección</h4>
                <p className="text-muted-foreground">Calle Falsa 123, Ciudad Ficticia, País</p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-3">Horario de Atención</h3>
              <p className="text-muted-foreground">Lunes - Viernes: 9:00 AM - 6:00 PM</p>
              <p className="text-muted-foreground">Sábado: 10:00 AM - 2:00 PM</p>
              <p className="text-muted-foreground">Domingo: Cerrado</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
