import Link from "next/link"
import { ArrowLeft, Shield, Eye, Lock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="px-4 py-6 border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-gray-300 hover:bg-gray-900 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">Política de Privacidad</h1>
          <p className="text-gray-400 mt-2">Última actualización: Diciembre 2024</p>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Intro */}
          <section className="mb-12">
            <div className="bg-gray-900 p-6 rounded-lg mb-8">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-[#5D1A1D] mr-3" />
                <h2 className="text-2xl font-semibold text-white">Tu Privacidad es Nuestra Prioridad</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                En 717 Store, respetamos y protegemos tu privacidad. Esta política explica cómo recopilamos, utilizamos
                y protegemos tu información personal cuando utilizas nuestro sitio web y servicios.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Eye className="w-6 h-6 text-[#5D1A1D] mr-3" />
              <h2 className="text-2xl font-semibold text-white">1. Información que Recopilamos</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Información Personal</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Recopilamos información que nos proporcionas directamente, incluyendo:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Nombre completo y información de contacto</li>
                  <li>Dirección de envío y facturación</li>
                  <li>Información de pago (procesada de forma segura)</li>
                  <li>Historial de pedidos y preferencias</li>
                  <li>Comunicaciones contigo</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Información Automática</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  También recopilamos información automáticamente cuando utilizas nuestro sitio:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Dirección IP y ubicación geográfica</li>
                  <li>Tipo de navegador y dispositivo</li>
                  <li>Páginas visitadas y tiempo de navegación</li>
                  <li>Cookies y tecnologías similares</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-[#5D1A1D] mr-3" />
              <h2 className="text-2xl font-semibold text-white">2. Cómo Utilizamos tu Información</h2>
            </div>

            <p className="text-gray-300 leading-relaxed mb-4">Utilizamos tu información para:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Procesar y cumplir tus pedidos</li>
              <li>Comunicarnos contigo sobre tu cuenta y pedidos</li>
              <li>Proporcionar atención al cliente</li>
              <li>Personalizar tu experiencia de compra</li>
              <li>Enviar promociones y ofertas (con tu consentimiento)</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Compartir Información</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en las siguientes
              circunstancias:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>
                <strong>Proveedores de servicios:</strong> Para procesar pagos, envíos y otros servicios
              </li>
              <li>
                <strong>Cumplimiento legal:</strong> Cuando sea requerido por ley o autoridades
              </li>
              <li>
                <strong>Protección de derechos:</strong> Para proteger nuestros derechos y seguridad
              </li>
              <li>
                <strong>Consentimiento:</strong> Cuando hayas dado tu consentimiento explícito
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Lock className="w-6 h-6 text-[#5D1A1D] mr-3" />
              <h2 className="text-2xl font-semibold text-white">4. Seguridad de Datos</h2>
            </div>

            <p className="text-gray-300 leading-relaxed mb-4">
              Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tu información:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Encriptación</h4>
                <p className="text-gray-300 text-sm">Toda la información sensible se encripta usando SSL/TLS</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Acceso Limitado</h4>
                <p className="text-gray-300 text-sm">Solo personal autorizado tiene acceso a datos personales</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Monitoreo</h4>
                <p className="text-gray-300 text-sm">Supervisamos continuamente nuestros sistemas</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Actualizaciones</h4>
                <p className="text-gray-300 text-sm">Mantenemos nuestros sistemas actualizados</p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Tus Derechos</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Tienes los siguientes derechos respecto a tu información personal:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-[#5D1A1D] pl-4">
                <h4 className="font-semibold text-white">Acceso</h4>
                <p className="text-gray-300 text-sm">Solicitar una copia de la información que tenemos sobre ti</p>
              </div>
              <div className="border-l-4 border-[#5D1A1D] pl-4">
                <h4 className="font-semibold text-white">Rectificación</h4>
                <p className="text-gray-300 text-sm">Corregir información inexacta o incompleta</p>
              </div>
              <div className="border-l-4 border-[#5D1A1D] pl-4">
                <h4 className="font-semibold text-white">Eliminación</h4>
                <p className="text-gray-300 text-sm">Solicitar la eliminación de tu información personal</p>
              </div>
              <div className="border-l-4 border-[#5D1A1D] pl-4">
                <h4 className="font-semibold text-white">Portabilidad</h4>
                <p className="text-gray-300 text-sm">Recibir tus datos en un formato estructurado</p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Cookies y Tecnologías Similares</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Utilizamos cookies para mejorar tu experiencia. Puedes controlar las cookies a través de la configuración
              de tu navegador.
            </p>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300 text-sm">
                <strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio
                <br />
                <strong>Cookies de rendimiento:</strong> Nos ayudan a entender cómo usas el sitio
                <br />
                <strong>Cookies de marketing:</strong> Para personalizar anuncios (con tu consentimiento)
              </p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Cambios a esta Política</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Podemos actualizar esta política ocasionalmente. Te notificaremos sobre cambios significativos por email o
              mediante un aviso prominente en nuestro sitio web.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">8. Contacto</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Si tienes preguntas sobre esta política de privacidad o quieres ejercer tus derechos, contáctanos:
            </p>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-white mb-2">
                <strong>Email de Privacidad:</strong> privacy@717store.com
              </p>
              <p className="text-white mb-2">
                <strong>Teléfono:</strong> +1 (555) 717-0717
              </p>
              <p className="text-white mb-2">
                <strong>Dirección:</strong> 717 Streetwear Ave, Fashion District, NY 10001
              </p>
              <p className="text-white">
                <strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM EST
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
