import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Política de Privacidad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">1. Información que Recopilamos</h2>
            <p>Recopilamos información personal que usted nos proporciona directamente, como su nombre, dirección de correo electrónico, dirección de envío, número de teléfono y detalles de pago cuando realiza una compra o se registra en nuestro sitio. También podemos recopilar información no personal, como datos demográficos y de uso del sitio, para mejorar su experiencia.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">2. Cómo Utilizamos su Información</h2>
            <p>Utilizamos la información recopilada para:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Procesar sus pedidos y gestionar su cuenta.</li>
              <li>Comunicarnos con usted sobre sus pedidos, productos y servicios.</li>
              <li>Personalizar su experiencia en nuestro sitio web.</li>
              <li>Mejorar nuestros productos, servicios y el funcionamiento del sitio web.</li>
              <li>Enviar correos electrónicos promocionales o boletines informativos (si ha optado por recibirlos).</li>
              <li>Cumplir con las obligaciones legales.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">3. Compartir su Información</h2>
            <p>No vendemos, comercializamos ni transferimos su información de identificación personal a terceros sin su consentimiento, excepto para los fines necesarios para operar nuestro negocio, como el procesamiento de pagos y el envío de pedidos. Esto incluye a socios de confianza que nos ayudan a operar nuestro sitio web o a brindarle servicios, siempre que dichas partes acepten mantener esta información confidencial.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">4. Seguridad de los Datos</h2>
            <p>Implementamos una variedad de medidas de seguridad para mantener la seguridad de su información personal cuando realiza un pedido o ingresa, envía o accede a su información personal. Ofrecemos el uso de un servidor seguro. Toda la información confidencial/crediticia suministrada se transmite a través de la tecnología Secure Socket Layer (SSL) y luego se encripta en nuestra base de datos de proveedores de pasarela de pago solo para ser accesible por aquellos autorizados con derechos de acceso especiales a dichos sistemas, y están obligados a mantener la información confidencial.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">5. Cookies</h2>
            <p>Utilizamos cookies para ayudar a recordar y procesar los artículos en su carrito de compras, comprender y guardar sus preferencias para futuras visitas y compilar datos agregados sobre el tráfico y la interacción del sitio para que podamos ofrecer mejores experiencias y herramientas en el futuro.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">6. Sus Derechos</h2>
            <p>Usted tiene derecho a acceder, corregir, actualizar o solicitar la eliminación de su información personal. Si desea ejercer alguno de estos derechos, contáctenos utilizando la información de contacto proporcionada en nuestro sitio web.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">7. Cambios en esta Política de Privacidad</h2>
            <p>Nos reservamos el derecho de actualizar o cambiar nuestra Política de Privacidad en cualquier momento. Cualquier cambio será publicado en esta página. Le recomendamos revisar esta Política de Privacidad periódicamente para cualquier cambio.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
