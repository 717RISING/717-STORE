import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Contáctanos</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-700 dark:text-gray-300">
          <div className="space-y-6">
            <p className="text-lg">
              ¿Tienes alguna pregunta, comentario o necesitas ayuda? No dudes en contactarnos.
              Estamos aquí para asistirte.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-[#4A1518] dark:text-[#FFD700]" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                  <p>soporte@717store.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-[#4A1518] dark:text-[#FFD700]" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Teléfono</h3>
                  <p>+57 310 123 4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-[#4A1518] dark:text-[#FFD700]" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white
