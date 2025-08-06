import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-950 text-white p-4 md:p-8 flex justify-center">
      <Card className="w-full max-w-4xl bg-gray-900 border-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#5D1A1D] text-center">Política de Privacidad</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none text-gray-300">
          <p>
            En 717 Store, nos comprometemos a proteger tu privacidad. Esta Política de Privacidad describe cómo
            recopilamos, usamos y compartimos tu información personal cuando visitas o realizas una compra en nuestro
            sitio web.
          </p>

          <h2>1. Información Personal que Recopilamos</h2>
          <p>
            Cuando visitas el Sitio, recopilamos automáticamente cierta información sobre tu dispositivo, incluyendo
            información sobre tu navegador web, dirección IP, zona horaria y algunas de las cookies que están instaladas
            en tu dispositivo. Además, a medida que navegas por el Sitio, recopilamos información sobre las páginas web
            o productos individuales que ves, qué sitios web o términos de búsqueda te remitieron al Sitio, e
            información sobre cómo interactúas con el Sitio. Nos referimos a esta información recopilada automáticamente
            como "Información del Dispositivo".
          </p>
          <p>Recopilamos Información del Dispositivo utilizando las siguientes tecnologías:</p>
          <ul>
            <li>
              **Cookies:** Son archivos de datos que se colocan en tu dispositivo o computadora y a menudo incluyen un
              identificador único anónimo. Para obtener más información sobre las cookies y cómo deshabilitarlas, visita
              http://www.allaboutcookies.org.
            </li>
            <li>
              **Archivos de registro:** Rastrean las acciones que ocurren en el Sitio y recopilan datos, incluyendo tu
              dirección IP, tipo de navegador, proveedor de servicios de Internet, páginas de referencia/salida y sellos
              de fecha/hora.
            </li>
            <li>
              **Web beacons, tags y píxeles:** Son archivos electrónicos utilizados para registrar información sobre
              cómo navegas por el Sitio.
            </li>
          </ul>
          <p>
            Además, cuando realizas una compra o intentas realizar una compra a través del Sitio, recopilamos cierta
            información tuya, incluyendo tu nombre, dirección de facturación, dirección de envío, dirección de correo
            electrónico y número de teléfono. Nos referimos a esta información como "Información del Pedido".
          </p>
          <p>
            Cuando hablamos de "Información Personal" en esta Política de Privacidad, nos referimos tanto a la
            Información del Dispositivo como a la Información del Pedido.
          </p>

          <h2>2. ¿Cómo Utilizamos tu Información Personal?</h2>
          <p>
            Utilizamos la Información del Pedido que recopilamos generalmente para cumplir con cualquier pedido
            realizado a través del Sitio (incluyendo el procesamiento de tu información de pago, la organización del
            envío y el envío de facturas y/o confirmaciones de pedido). Además, utilizamos esta Información del Pedido
            para:
          </p>
          <ul>
            <li>Comunicarnos contigo.</li>
            <li>Examinar nuestros pedidos para detectar posibles riesgos o fraudes.</li>
            <li>
              Cuando esté en línea con las preferencias que has compartido con nosotros, proporcionarte información o
              publicidad relacionada con nuestros productos o servicios.
            </li>
          </ul>
          <p>
            Utilizamos la Información del Dispositivo que recopilamos para ayudarnos a detectar posibles riesgos y
            fraudes (en particular, tu dirección IP) y, de manera más general, para mejorar y optimizar nuestro Sitio
            (por ejemplo, generando análisis sobre cómo nuestros clientes navegan e interactúan con el Sitio, y para
            evaluar el éxito de nuestras campañas de marketing y publicidad).
          </p>

          <h2>3. Compartir tu Información Personal</h2>
          <p>
            Compartimos tu Información Personal con terceros para ayudarnos a utilizar tu Información Personal, como se
            describe anteriormente. Por ejemplo, utilizamos Google Analytics para ayudarnos a comprender cómo nuestros
            clientes utilizan el Sitio. También podemos compartir tu Información Personal para cumplir con las leyes y
            regulaciones aplicables, para responder a una citación, orden de registro u otra solicitud legal de
            información que recibamos, o para proteger nuestros derechos.
          </p>

          <h2>4. Tus Derechos</h2>
          <p>
            Si eres residente europeo, tienes derecho a acceder a la información personal que tenemos sobre ti y a
            solicitar que tu información personal sea corregida, actualizada o eliminada. Si deseas ejercer este
            derecho, contáctanos a través de la información de contacto a continuación.
          </p>
          <p>
            Además, si eres residente europeo, notamos que estamos procesando tu información para cumplir con los
            contratos que podamos tener contigo (por ejemplo, si realizas un pedido a través del Sitio) o para perseguir
            nuestros intereses comerciales legítimos enumerados anteriormente.
          </p>

          <h2>5. Retención de Datos</h2>
          <p>
            Cuando realizas un pedido a través del Sitio, mantendremos tu Información del Pedido para nuestros registros
            a menos y hasta que nos pidas que eliminemos esta información.
          </p>

          <h2>6. Cambios</h2>
          <p>
            Podemos actualizar esta política de privacidad de vez en cuando para reflejar, por ejemplo, cambios en
            nuestras prácticas o por otras razones operativas, legales o reglamentarias.
          </p>

          <h2>7. Contacto</h2>
          <p>
            Para obtener más información sobre nuestras prácticas de privacidad, si tienes preguntas o si deseas
            presentar una queja, contáctanos por correo electrónico a [tu correo electrónico de contacto] o por correo
            postal utilizando los detalles proporcionados en nuestra página de contacto.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
