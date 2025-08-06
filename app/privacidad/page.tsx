import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-center mb-8 md:mb-12">Política de Privacidad</h1>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>1. Información que Recopilamos</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              En 717 Store, recopilamos información para proporcionar y mejorar nuestros servicios.
              La información que recopilamos se divide en las siguientes categorías:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Información Personal:</strong> Nombre, dirección de correo electrónico, dirección de envío, número de teléfono, información de pago.</li>
              <li><strong>Información de Uso:</strong> Datos sobre cómo interactúa con nuestro sitio web, como páginas visitadas, productos vistos, tiempo de sesión.</li>
              <li><strong>Datos del Dispositivo:</strong> Tipo de dispositivo, sistema operativo, navegador, dirección IP.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Cómo Usamos Su Información</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>Utilizamos la información recopilada para:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Procesar sus pedidos y gestionar su cuenta.</li>
              <li>Mejorar y personalizar su experiencia de compra.</li>
              <li>Comunicarnos con usted sobre su pedido, productos y promociones.</li>
              <li>Realizar análisis y estudios de mercado para mejorar nuestros servicios.</li>
              <li>Prevenir fraudes y garantizar la seguridad de nuestro sitio.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Compartir Su Información</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              No vendemos, comercializamos ni alquilamos su información personal a terceros.
              Podemos compartir su información con:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Proveedores de Servicios:</strong> Empresas que nos ayudan con operaciones como procesamiento de pagos, envío, marketing y análisis de datos.</li>
              <li><strong>Cumplimiento Legal:</strong> Cuando sea requerido por ley o para proteger nuestros derechos, propiedad o seguridad.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Seguridad de Datos</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              Implementamos una variedad de medidas de seguridad para mantener la seguridad de su
              información personal cuando realiza un pedido o ingresa, envía o accede a su información personal.
              Utilizamos cifrado SSL para proteger la información sensible transmitida en línea.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Sus Derechos</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>Usted tiene derecho a:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Acceder a la información personal que tenemos sobre usted.</li>
              <li>Solicitar la corrección de cualquier dato inexacto.</li>
              <li>Solicitar la eliminación de su información personal.</li>
              <li>Oponerse al procesamiento de sus datos personales.</li>
            </ul>
            <p>
              Para ejercer cualquiera de estos derechos, por favor contáctenos a través de
              <a href="mailto:info@717store.com" className="text-primary hover:underline"> info@717store.com</a>.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Cambios a Esta Política de Privacidad</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos
              cualquier cambio publicando la nueva Política de Privacidad en esta página. Se le
              aconseja revisar esta Política de Privacidad periódicamente para cualquier cambio.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>Última actualización: 26 de octubre de 2023</p>
      </div>
    </div>
  )
}
