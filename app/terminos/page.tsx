import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-950 text-white p-4 md:p-8 flex justify-center">
      <Card className="w-full max-w-4xl bg-gray-900 border-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#5D1A1D] text-center">Términos y Condiciones</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none text-gray-300">
          <p>
            Bienvenido a 717 Store. Al acceder y utilizar nuestro sitio web, aceptas cumplir y estar sujeto a los
            siguientes términos y condiciones de uso. Por favor, léelos detenidamente.
          </p>

          <h2>1. Aceptación de los Términos</h2>
          <p>
            Al utilizar nuestro sitio web, confirmas que aceptas estos términos de uso y que te comprometes a
            cumplirlos. Si no estás de acuerdo con estos términos, no debes utilizar nuestro sitio.
          </p>

          <h2>2. Cambios en los Términos</h2>
          <p>
            Nos reservamos el derecho de revisar y modificar estos términos de uso en cualquier momento. Es tu
            responsabilidad revisar periódicamente estos términos para estar al tanto de cualquier cambio. El uso
            continuado del sitio después de la publicación de cambios significa que aceptas y estás de acuerdo con los
            cambios.
          </p>

          <h2>3. Acceso al Sitio</h2>
          <p>
            Nuestro sitio se pone a tu disposición de forma gratuita. No garantizamos que nuestro sitio, o cualquier
            contenido en él, esté siempre disponible o sea ininterrumpido. Podemos suspender o retirar la disponibilidad
            de todo o parte de nuestro sitio por razones comerciales y operativas.
          </p>

          <h2>4. Tu Cuenta</h2>
          <p>
            Si creas una cuenta en nuestro sitio, eres responsable de mantener la confidencialidad de tu información de
            inicio de sesión y de todas las actividades que ocurran bajo tu cuenta. Nos reservamos el derecho de
            suspender o cancelar cuentas a nuestra discreción.
          </p>

          <h2>5. Propiedad Intelectual</h2>
          <p>
            Todo el contenido de este sitio, incluyendo textos, gráficos, logotipos, iconos, imágenes, clips de audio,
            descargas digitales y software, es propiedad de 717 Store o de sus proveedores de contenido y está protegido
            por las leyes de derechos de autor internacionales.
          </p>

          <h2>6. Uso Prohibido</h2>
          <p>
            No puedes utilizar nuestro sitio para fines ilegales o no autorizados. No debes, en el uso del Servicio,
            violar ninguna ley en tu jurisdicción (incluyendo, entre otras, las leyes de derechos de autor).
          </p>

          <h2>7. Limitación de Responsabilidad</h2>
          <p>
            En la medida máxima permitida por la ley, no seremos responsables ante ningún usuario por ninguna pérdida o
            daño, ya sea contractual, extracontractual (incluida la negligencia), incumplimiento de un deber legal o de
            otro tipo, incluso si es previsible, que surja de o en conexión con:
          </p>
          <ul>
            <li>El uso o la imposibilidad de usar nuestro sitio.</li>
            <li>El uso o la dependencia de cualquier contenido mostrado en nuestro sitio.</li>
          </ul>

          <h2>8. Enlaces a Terceros</h2>
          <p>
            Nuestro sitio puede contener enlaces a sitios web de terceros que no son operados por nosotros. No tenemos
            control sobre el contenido, las políticas de privacidad o las prácticas de ningún sitio o servicio de
            terceros.
          </p>

          <h2>9. Ley Aplicable</h2>
          <p>
            Estos términos de uso, su objeto y su formación, se rigen por las leyes de [País/Jurisdicción]. Tú y
            nosotros acordamos que los tribunales de [País/Jurisdicción] tendrán jurisdicción exclusiva.
          </p>

          <h2>10. Contacto</h2>
          <p>
            Si tienes alguna pregunta sobre estos Términos y Condiciones, puedes contactarnos a través de nuestra página
            de contacto.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
