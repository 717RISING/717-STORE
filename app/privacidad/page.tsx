import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Política de Privacidad</h1>

      <Card>
        <CardHeader>
          <CardTitle>Tu Privacidad es Importante para Nosotros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            En 717 Store, respetamos tu privacidad y estamos comprometidos a proteger tu información personal.
            Esta Política de Privacidad describe cómo recopilamos, usamos y compartimos tu información cuando
            visitas o realizas una compra en [TuDominio.com] (el "Sitio").
          </p>

          <h3 className="font-semibold text-lg">Información que Recopilamos</h3>
          <p>
            Cuando visitas el Sitio, recopilamos automáticamente cierta información sobre tu dispositivo,
            incluida información sobre tu navegador web, dirección IP, zona horaria y algunas de las cookies
            que están instaladas en tu dispositivo. Además, a medida que navegas por el Sitio, recopilamos
            información sobre las páginas web o productos individuales que ves, qué sitios web o términos de
            búsqueda te remitieron al Sitio e información sobre cómo interactúas con el Sitio. Nos referimos
            a esta información recopilada automáticamente como "Información del Dispositivo".
          </p>
          <p>
            Recopilamos Información del Dispositivo utilizando las siguientes tecnologías:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Cookies:</strong> archivos de datos que se colocan en tu dispositivo o computadora y
              a menudo incluyen un identificador único anónimo. Para obtener más información sobre las cookies
              y cómo deshabilitarlas, visita <a href="http://www.allaboutcookies.org" className="text-primary hover:underline">http://www.allaboutcookies.org</a>.
            </li>
            <li>
              <strong>Archivos de registro:</strong> rastrean las acciones que ocurren en el Sitio y recopilan
              datos, incluida tu dirección IP, tipo de navegador, proveedor de servicios de Internet, páginas
              de referencia/salida y sellos de fecha/hora.
            </li>
            <li>
              <strong>Web beacons, tags y pixels:</strong> son archivos electrónicos utilizados para registrar
              información sobre cómo navegas por el Sitio.
            </li>
          </ul>
          <p>
            Además, cuando realizas una compra o intentas realizar una compra a través del Sitio, recopilamos
            cierta información tuya, incluido tu nombre, dirección de facturación, dirección de envío,
            información de pago (incluidos números de tarjeta de crédito), dirección de correo electrónico y
            número de teléfono. Nos referimos a esta información como "Información del Pedido".
          </p>
          <p>
            Cuando hablamos de "Información Personal" en esta Política de Privacidad, nos referimos tanto a
            la Información del Dispositivo como a la Información del Pedido.
          </p>

          <h3 className="font-semibold text-lg">¿Cómo Usamos tu Información Personal?</h3>
          <p>
            Utilizamos la Información del Pedido que recopilamos generalmente para cumplir con cualquier pedido
            realizado a través del Sitio (incluido el procesamiento de tu información de pago, la organización
            del envío y el envío de facturas y/o confirmaciones de pedidos). Además, utilizamos esta Información
            del Pedido para:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Comunicarnos contigo.</li>
            <li>Examinar nuestros pedidos para detectar posibles riesgos o fraudes.</li>
            <li>Cuando esté en línea con las preferencias que has compartido con nosotros, proporcionarte
              información o publicidad relacionada con nuestros productos o servicios.</li>
          </ul>
          <p>
            Utilizamos la Información del Dispositivo que recopilamos para ayudarnos a detectar posibles riesgos
            y fraudes (en particular, tu dirección IP) y, de manera más general, para mejorar y optimizar nuestro
            Sitio (por ejemplo, generando análisis sobre cómo nuestros clientes navegan e interactúan con el Sitio,
            y para evaluar el éxito de nuestras campañas de marketing y publicidad).
          </p>

          <h3 className="font-semibold text-lg">Compartiendo tu Información Personal</h3>
          <p>
            Compartimos tu Información Personal con terceros para ayudarnos a usar tu Información Personal,
            como se describe anteriormente. Por ejemplo, utilizamos Shopify para potenciar nuestra tienda en línea.
            También utilizamos Google Analytics para ayudarnos a comprender cómo nuestros clientes usan el Sitio.
          </p>
          <p>
            Finalmente, también podemos compartir tu Información Personal para cumplir con las leyes y regulaciones
            aplicables, para responder a una citación, orden de registro u otra solicitud legal de información que
            recibamos, o para proteger nuestros derechos.
          </p>

          <h3 className="font-semibold text-lg">Tus Derechos</h3>
          <p>
            Si eres residente europeo, tienes derecho a acceder a la información personal que tenemos sobre ti
            y a solicitar que tu información personal sea corregida, actualizada o eliminada. Si deseas ejercer
            este derecho, contáctanos a través de la información de contacto a continuación.
          </p>

          <h3 className="font-semibold text-lg">Retención de Datos</h3>
          <p>
            Cuando realizas un pedido a través del Sitio, mantendremos tu Información del Pedido para nuestros
            registros a menos y hasta que nos pidas que eliminemos esta información.
          </p>

          <h3 className="font-semibold text-lg">Cambios</h3>
          <p>
            Podemos actualizar esta política de privacidad de vez en cuando para reflejar, por ejemplo, cambios
            en nuestras prácticas o por otras razones operativas, legales o reglamentarias.
          </p>

          <h3 className="font-semibold text-lg">Contáctanos</h3>
          <p>
            Para obtener más información sobre nuestras prácticas de privacidad, si tienes preguntas o si deseas
            presentar una queja, contáctanos por correo electrónico a
            <a href="mailto:info@717store.com" className="text-primary hover:underline"> info@717store.com</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
