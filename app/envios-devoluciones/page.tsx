import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Truck, RefreshCw, Mail } from 'lucide-react'

export default function ShippingReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))]">
      <h1 className="text-4xl font-bold text-center mb-8">Envíos y Devoluciones</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Aquí encontrarás toda la información sobre nuestras políticas de envío y cómo gestionar tus devoluciones.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4">
            <Truck className="h-8 w-8 text-primary" />
            <CardTitle className="text-xl">Política de Envíos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Nos esforzamos por procesar y enviar todos los pedidos lo más rápido posible. Los pedidos suelen ser procesados dentro de <strong>1-2 días hábiles</strong>.
            </p>
            <h3 className="font-semibold">Tiempos de Entrega Estimados:</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              <li><strong>Nacional:</strong> 3-7 días hábiles</li>
              <li><strong>Internacional:</strong> 7-20 días hábiles (puede variar según el destino)</li>
            </ul>
            <p>
              Recibirás un email de confirmación con un número de seguimiento una vez que tu pedido haya sido enviado.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-x-4">
            <RefreshCw className="h-8 w-8 text-primary" />
            <CardTitle className="text-xl">Política de Devoluciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Queremos que estés completamente satisfecho con tu compra. Si no es así, puedes devolver los artículos dentro de los <strong>30 días</strong> posteriores a la recepción.
            </p>
            <h3 className="font-semibold">Condiciones para Devolución:</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Los artículos deben estar sin usar, sin lavar y en su estado original.</li>
              <li>Deben incluir todas las etiquetas y el embalaje original.</li>
              <li>Se requiere el comprobante de compra.</li>
            </ul>
            <p>
              Los reembolsos se procesarán a la forma de pago original dentro de 5-10 días hábiles después de que recibamos y verifiquemos el artículo devuelto.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-x-4">
            <Mail className="h-8 w-8 text-primary" />
            <CardTitle className="text-xl">Cómo Iniciar una Devolución</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Para iniciar una devolución, por favor sigue estos pasos:
            </p>
            <ol className="list-decimal list-inside text-muted-foreground">
              <li>Envía un email a <a href="mailto:devoluciones@717store.com" className="text-primary hover:underline">devoluciones@717store.com</a> con tu número de pedido y el motivo de la devolución.</li>
              <li>Nuestro equipo de soporte te proporcionará instrucciones detalladas y una etiqueta de envío si aplica.</li>
              <li>Empaqueta los artículos de forma segura y envíalos de vuelta.</li>
            </ol>
            <p>
              Si tienes alguna pregunta adicional, no dudes en contactarnos.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
