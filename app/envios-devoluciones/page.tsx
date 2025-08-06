import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function ShippingReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-center mb-8 md:mb-12">Envíos y Devoluciones</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Política de Envíos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              En 717 Store, nos esforzamos por procesar y enviar tus pedidos lo más rápido posible.
              Todos los pedidos se procesan dentro de <strong>1-2 días hábiles</strong> (excluyendo fines de semana y festivos)
              después de recibir la confirmación de tu pedido. Recibirás otra notificación cuando tu pedido haya sido enviado.
            </p>
            <Separator />
            <h3 className="font-semibold text-foreground">Tiempos de Envío Estimados:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Nacional (Colombia):</strong> 3-7 días hábiles</li>
              <li><strong>Internacional:</strong> 10-20 días hábiles (puede variar según el destino y aduanas)</li>
            </ul>
            <Separator />
            <h3 className="font-semibold text-foreground">Costos de Envío:</h3>
            <p>
              Los costos de envío se calculan en la pantalla de pago y varían según el peso del paquete y la dirección de destino.
              Ofrecemos <strong>envío gratuito en pedidos superiores a $200.000 COP</strong> dentro de Colombia.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Política de Devoluciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Queremos que estés completamente satisfecho con tu compra en 717 Store. Si por alguna razón
              no estás contento con tu pedido, puedes devolverlo para un cambio o reembolso dentro de los
              <strong>30 días</strong> posteriores a la recepción.
            </p>
            <Separator />
            <h3 className="font-semibold text-foreground">Condiciones para Devoluciones:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Los artículos deben estar sin usar, sin lavar y en su estado original.</li>
              <li>Deben incluir todas las etiquetas y el embalaje original.</li>
              <li>Se requiere el recibo o comprobante de compra.</li>
            </ul>
            <Separator />
            <h3 className="font-semibold text-foreground">Proceso de Devolución:</h3>
            <p>
              Para iniciar una devolución, por favor contáctanos a través de nuestro formulario de contacto
              o envía un correo electrónico a <a href="mailto:info@717store.com" className="text-primary hover:underline">info@717store.com</a>
              con tu número de pedido y el motivo de la devolución. Te proporcionaremos instrucciones detalladas.
            </p>
            <p>
              Los costos de envío de la devolución son responsabilidad del cliente, a menos que la devolución
              sea por un defecto de fabricación o un error nuestro.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Artículos No Retornables</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Los siguientes artículos no pueden ser devueltos:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Tarjetas de regalo</li>
              <li>Artículos en oferta final o con descuento significativo</li>
              <li>Ropa interior y calcetines (por razones de higiene)</li>
              <li>Artículos personalizados</li>
            </ul>
            <Separator />
            <h3 className="font-semibold text-foreground">Cambios:</h3>
            <p>
              Si deseas cambiar un artículo por una talla o color diferente, te recomendamos
              realizar una nueva compra y devolver el artículo original para un reembolso.
              Esto asegura que recibas el artículo deseado lo más rápido posible.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg text-foreground">
          Si tienes alguna pregunta adicional, no dudes en <a href="/contacto" className="text-primary hover:underline">contactarnos</a>.
        </p>
      </div>
    </div>
  )
}
