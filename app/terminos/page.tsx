import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TerminosPage() {
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
          <h1 className="text-4xl font-bold">Términos y Condiciones</h1>
          <p className="text-gray-400 mt-2">Última actualización: Diciembre 2024</p>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Aceptación de los Términos</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Al acceder y utilizar el sitio web de 717 Store, usted acepta estar sujeto a estos términos y condiciones
              de uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Uso del Sitio Web</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Usted puede utilizar nuestro sitio web para fines legales únicamente. Está prohibido:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Usar el sitio de manera que pueda dañar, deshabilitar o sobrecargar el sitio</li>
              <li>Intentar obtener acceso no autorizado a cualquier parte del sitio</li>
              <li>Usar el sitio para transmitir material ofensivo o ilegal</li>
              <li>Violar cualquier ley local, nacional o internacional aplicable</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Productos y Precios</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Todos los productos están sujetos a disponibilidad. Los precios pueden cambiar sin previo aviso. Nos
              reservamos el derecho de modificar o discontinuar productos en cualquier momento.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Los precios mostrados incluyen impuestos aplicables. Los costos de envío se calculan al momento del
              checkout.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Pedidos y Pagos</h2>
            <p className="text-gray-300 leading-relaxed mb-4">Al realizar un pedido, usted garantiza que:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Tiene la autoridad legal para realizar la compra</li>
              <li>La información proporcionada es verdadera y precisa</li>
              <li>El método de pago utilizado es válido y le pertenece</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              Nos reservamos el derecho de rechazar o cancelar pedidos por cualquier motivo.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Envíos y Entregas</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Los tiempos de entrega son estimados y pueden variar. No somos responsables por retrasos causados por
              terceros o circunstancias fuera de nuestro control.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              El riesgo de pérdida o daño pasa al comprador una vez que el producto es entregado al transportista.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Devoluciones y Reembolsos</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que los productos estén en
              su estado original y con las etiquetas intactas.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Los costos de envío para devoluciones corren por cuenta del cliente, excepto en casos de productos
              defectuosos.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Propiedad Intelectual</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Todo el contenido del sitio web, incluyendo textos, gráficos, logos, imágenes y software, es propiedad de
              717 Store y está protegido por las leyes de derechos de autor y marcas registradas.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">8. Limitación de Responsabilidad</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              717 Store no será responsable por daños indirectos, incidentales, especiales o consecuentes que resulten
              del uso o la imposibilidad de usar nuestros productos o servicios.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">9. Modificaciones</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor
              inmediatamente después de su publicación en el sitio web.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-white">10. Contacto</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Si tiene preguntas sobre estos términos y condiciones, puede contactarnos a través de:
            </p>
            <div className="bg-gray-900 p-6 rounded-lg">
              <p className="text-white mb-2">
                <strong>Email:</strong> legal@717store.com
              </p>
              <p className="text-white mb-2">
                <strong>Teléfono:</strong> +1 (555) 717-0717
              </p>
              <p className="text-white">
                <strong>Dirección:</strong> 717 Streetwear Ave, Fashion District, NY 10001
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
