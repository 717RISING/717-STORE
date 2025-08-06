'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { submitContactForm } from '@/app/actions' // Ensure this is correctly imported
import { ServerActionResponse } from '@/lib/types'
import { AdaptiveLoader } from '@/components/loaders/adaptive-loader' // Changed to named import

export const metadata = {
  title: 'Contacto - 717 Store',
  description: 'Ponte en contacto con 717 Store para cualquier consulta o soporte.',
}

export default function ContactPage() {
  const [formState, setFormState] = useState<ServerActionResponse | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFormState(null)

    const formData = new FormData(event.currentTarget)
    const response = await submitContactForm(formData)
    setFormState(response)
    setIsSubmitting(false)

    if (response.success) {
      event.currentTarget.reset() // Clear form on success
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contáctanos</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            ¿Tienes alguna pregunta, comentario o necesitas ayuda? No dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Mail className="h-6 w-6 text-[#4A1518] dark:text-[#FFD700]" />
              <a href="mailto:info@717store.com" className="hover:underline">info@717store.com</a>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Phone className="h-6 w-6 text-[#4A1518] dark:text-[#FFD700]" />
              <a href="tel:+5712345678" className="hover:underline">+57 1 234 5678</a>
            </div>
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <MapPin className="h-6 w-6 text-[#4A1518] dark:text-[#FFD700]" />
              <span>Calle 123 #45-67, Bogotá, Colombia</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Envíanos un Mensaje</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nombre Completo</Label>
              <Input id="name" name="name" type="text" placeholder="Tu nombre" required className="mt-1" />
              {formState?.errors?.name && (
                <p className="text-red-500 text-sm mt-1">{formState.errors.name[0]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Correo Electrónico</Label>
              <Input id="email" name="email" type="email" placeholder="tu@ejemplo.com" required className="mt-1" />
              {formState?.errors?.email && (
                <p className="text-red-500 text-sm mt-1">{formState.errors.email[0]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300">Asunto</Label>
              <Input id="subject" name="subject" type="text" placeholder="Asunto de tu mensaje" required className="mt-1" />
              {formState?.errors?.subject && (
                <p className="text-red-500 text-sm mt-1">{formState.errors.subject[0]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">Mensaje</Label>
              <Textarea id="message" name="message" placeholder="Escribe tu mensaje aquí..." rows={5} required className="mt-1" />
              {formState?.errors?.message && (
                <p className="text-red-500 text-sm mt-1">{formState.errors.message[0]}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white py-3 text-lg flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <AdaptiveLoader isVisible={isSubmitting} size="sm" className="text-white" />
              {!isSubmitting && <Send className="h-5 w-5" />}
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </Button>
            {formState && formState.message && (
              <p className={`mt-4 text-center text-lg ${formState.success ? 'text-green-600' : 'text-red-500'}`}>
                {formState.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  )
}
