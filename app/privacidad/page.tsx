import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))]">
      <h1 className="text-4xl font-bold text-center mb-8">Política de Privacidad</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        En 717 Store, nos comprometemos a proteger tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.
      </p>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>1. Información que Recopilamos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Recopilamos información para proporcionar mejores servicios a todos nuestros usuarios. El tipo de información que recopilamos incluye:</p>
            <ul className="list-disc list-inside text-muted-foreground">
              <li><strong>Información que nos proporcionas directamente:</strong> Cuando creas una cuenta, realizas una compra o te suscribes a nuestro boletín, podemos recopilar información como tu nombre, dirección de correo electrónico, dirección de envío, número de teléfono e información de pago.</li>
              <li><strong>Información que obtenemos de tu uso de nuestros servicios:</strong> Recopilamos información sobre los servicios que utilizas y cómo los utilizas, como cuando visitas una página en nuestro sitio web o interactúas con nuestro contenido. Esta información incluye:
                <ul className="list-circle list-inside ml-4">
                  <li>Información del dispositivo</li>
                  <li>Información de registro (dirección IP, actividad del sistema, etc.)</li>
                  <li>Información de ubicación</li>
                  <li>Cookies y tecnologías similares</li>
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Cómo Usamos la Información que Recopilamos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Utilizamos la información que recopilamos para:</p>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Proporcionar, mantener, proteger y mejorar nuestros servicios.</li>
              <li>Desarrollar nuevos servicios.</li>
              <li>Ofrecerte contenido personalizado, como resultados de búsqueda y anuncios relevantes.</li>
              <li>Comunicarnos contigo, por ejemplo, para enviarte notificaciones sobre tus pedidos o actualizaciones de nuestros servicios.</li>
              <li>Realizar análisis e investigaciones para mejorar la experiencia del usuario.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Compartir Información</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>No compartimos información personal con empresas, organizaciones e individuos ajenos a 717 Store, a menos que se aplique una de las siguientes circunstancias:</p>
            <ul className="list-disc list-inside text-muted-foreground">
              <li><strong>Con tu consentimiento:</strong> Compartiremos información personal con empresas, organizaciones o individuos ajenos a 717 Store cuando tengamos tu consentimiento para hacerlo.</li>
              <li><strong>Para procesamiento externo:</strong> Proporcionamos información personal a nuestras afiliadas u otras empresas o personas de confianza para que la procesen por nosotros, según nuestras instrucciones y de conformidad con nuestra Política de Privacidad y cualquier otra medida de confidencialidad y seguridad apropiada.</li>
              <li><strong>Por motivos legales:</strong> Compartiremos información personal con empresas, organizaciones o individuos ajenos a 717 Store si creemos de buena fe que el acceso, uso, conservación o divulgación de la información es razonablemente necesario para:
                <ul className="list-circle list-inside ml-4">
                  <li>Cumplir con cualquier ley, regulación, proceso legal o solicitud gubernamental aplicable.</li>
                  <li>Hacer cumplir los Términos de Servicio aplicables, incluida la investigación de posibles violaciones.</li>
                  <li>Detectar, prevenir o abordar de otro modo el fraude, la seguridad o los problemas técnicos.</li>
                  <li>Proteger contra daños a los derechos, la propiedad o la seguridad de 717 Store, nuestros usuarios o el público según lo exija o permita la ley.</li>
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Seguridad de la Información</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Trabajamos arduamente para proteger a 717 Store y a nuestros usuarios del acceso no autorizado o la alteración, divulgación o destrucción no autorizadas de la información que tenemos. En particular:
            </p>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Ciframos muchos de nuestros servicios utilizando SSL.</li>
              <li>Ofrecemos verificación en dos pasos cuando accedes a tu cuenta de 717 Store.</li>
              <li>Revisamos nuestras prácticas de recopilación, almacenamiento y procesamiento de información, incluidas las medidas de seguridad físicas, para protegernos contra el acceso no autorizado a los sistemas.</li>
              <li>Restringimos el acceso a la información personal a los empleados, contratistas y agentes de 717 Store que necesitan conocer esa información para procesarla por nosotros, y que están sujetos a estrictas obligaciones contractuales de confidencialidad y pueden ser disciplinados o despedidos si no cumplen con estas obligaciones.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Acceso y Actualización de tu Información Personal</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Siempre que utilices nuestros servicios, nuestro objetivo es proporcionarte acceso a tu información personal. Si esa información es incorrecta, nos esforzamos por darte formas de actualizarla rápidamente o eliminarla, a menos que tengamos que conservar esa información para fines comerciales legítimos o legales. Al actualizar tu información personal, podemos pedirte que verifiques tu identidad antes de que podamos actuar sobre tu solicitud.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Cambios en la Política de Privacidad</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Nuestra Política de Privacidad puede cambiar de vez en cuando. Publicaremos cualquier cambio en la política de privacidad en esta página y, si los cambios son significativos, proporcionaremos un aviso más destacado (incluida, para ciertos servicios, una notificación por correo electrónico de los cambios en la política de privacidad).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Si tienes alguna pregunta sobre esta Política de Privacidad, contáctanos en <a href="mailto:privacidad@717store.com" className="text-primary hover:underline">privacidad@717store.com</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
