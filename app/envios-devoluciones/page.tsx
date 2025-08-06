import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ShippingReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Envíos y Devoluciones</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Política de Envíos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              En 717 Store, nos esforzamos por procesar y enviar tus pedidos lo más rápido posible.
              Todos los pedidos se procesan dentro de 1-2 días hábiles (excluyendo fines de semana y festivos)
              después de recibir la confirmación de tu pedido. Recibirás otra notificación cuando tu pedido haya sido enviado.
            </p>
            <h3 className="font-semibold text-lg">Tarifas y Estimaciones de Envío Nacional</h3>
            <p>
              Las tarifas de envío para tu pedido se calcularán y mostrarán en el momento de la compra.
              Ofrecemos envío estándar y express.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Envío Estándar: 3-7 días hábiles.</li>
              <li>Envío Express: 1-3 días hábiles.</li>
            </ul>
            <p>
              Los tiempos de entrega estimados son solo una guía y pueden variar debido a factores externos
              fuera del control de 717 Store (por ejemplo, retrasos del servicio de mensajería, aduanas).
            </p>
            <h3 className="font-semibold text-lg">Envío Internacional</h3>
            <p>
              Actualmente, 717 Store solo realiza envíos dentro de Colombia. Estamos trabajando para
              expandir nuestros servicios de envío internacional en el futuro.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Política de Devoluciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Aceptamos devoluciones de productos sin usar y en su estado original dentro de los 30 días
              posteriores a la compra, acompañados del recibo original.
            </p>
            <h3 className="font-semibold text-lg">Proceso de Devolución</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                Para iniciar una devolución, por favor contáctanos a través de nuestro correo electrónico
                <a href="mailto:info@717store.com" className="text-primary hover:underline"> info@717store.com</a>
                con tu número de pedido y el motivo de la devolución.
              </li>
              <li>
                Una vez aprobada tu solicitud, te proporcionaremos instrucciones sobre cómo y dónde enviar
                tu paquete. Los artículos que nos sean devueltos sin solicitar primero una devolución no serán aceptados.
              </li>
              <li>
                Los costos de envío de la devolución son responsabilidad del cliente, a menos que el artículo
                sea defectuoso o se haya enviado incorrectamente.
              </li>
            </ol>
            <h3 className="font-semibold text-lg">Reembolsos</h3>
            <p>
              Te notificaremos una vez que hayamos recibido e inspeccionado tu devolución, y te informaremos
              si el reembolso fue aprobado o no. Si es aprobado, se te reembolsará automáticamente en tu
              método de pago original. Ten en cuenta que puede tomar algún tiempo para que tu banco o
              compañía de tarjeta de crédito procese y publique el reembolso.
            </p>
            <h3 className="font-semibold text-lg">Artículos No Retornables</h3>
            <p>
              Ciertos tipos de artículos no pueden ser devueltos, como productos perecederos, productos
              personalizados, y artículos de cuidado personal. Por favor, ponte en contacto si tienes
              preguntas o inquietudes sobre tu artículo específico.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
