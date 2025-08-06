import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Términos y Condiciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">1. Aceptación de los Términos</h2>
            <p>Al acceder y utilizar el sitio web de 717 Store, usted acepta estar sujeto a estos Términos y Condiciones, a todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales aplicables. Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio. Los materiales contenidos en este sitio web están protegidos por las leyes de derechos de autor y marcas comerciales aplicables.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">2. Licencia de Uso</h2>
            <p>Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de 717 Store para visualización transitoria personal y no comercial únicamente. Esta es la concesión de una licencia, no una transferencia de título, y bajo esta licencia no podrá:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Modificar o copiar los materiales;</li>
              <li>Utilizar los materiales para cualquier propósito comercial o para cualquier exhibición pública (comercial o no comercial);</li>
              <li>Intentar descompilar o aplicar ingeniería inversa a cualquier software contenido en el sitio web de 717 Store;</li>
              <li>Eliminar cualquier derecho de autor u otras anotaciones de propiedad de los materiales; o</li>
              <li>Transferir los materiales a otra persona o "reflejar" los materiales en cualquier otro servidor.</li>
            </ul>
            <p>Esta licencia terminará automáticamente si usted viola cualquiera de estas restricciones y podrá ser terminada por 717 Store en cualquier momento. Al finalizar la visualización de estos materiales o al finalizar esta licencia, debe destruir cualquier material descargado en su posesión, ya sea en formato electrónico o impreso.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">3. Descargo de Responsabilidad</h2>
            <p>Los materiales en el sitio web de 717 Store se proporcionan "tal cual". 717 Store no ofrece garantías, expresas o implícitas, y por la presente renuncia y niega todas las demás garantías, incluidas, entre otras, las garantías implícitas o condiciones de comerciabilidad, idoneidad para un propósito particular o no infracción de la propiedad intelectual u otra violación de derechos.</p>
            <p>Además, 717 Store no garantiza ni hace ninguna representación con respecto a la precisión, los resultados probables o la confiabilidad del uso de los materiales en su sitio web o de otro modo relacionados con dichos materiales o en cualquier sitio vinculado a este sitio.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">4. Limitaciones</h2>
            <p>En ningún caso 717 Store o sus proveedores serán responsables de ningún daño (incluidos, entre otros, daños por pérdida de datos o ganancias, o debido a la interrupción del negocio) que surjan del uso o la imposibilidad de usar los materiales en el sitio web de 717 Store, incluso si 717 Store o un representante autorizado de 717 Store ha sido notificado oralmente o por escrito de la posibilidad de dicho daño. Debido a que algunas jurisdicciones no permiten limitaciones en garantías implícitas o limitaciones de responsabilidad por daños consecuentes o incidentales, estas limitaciones pueden no aplicarse a usted.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">5. Revisiones y Erratas</h2>
            <p>Los materiales que aparecen en el sitio web de 717 Store podrían incluir errores técnicos, tipográficos o fotográficos. 717 Store no garantiza que ninguno de los materiales en su sitio web sea preciso, completo o actual. 717 Store puede realizar cambios en los materiales contenidos en su sitio web en cualquier momento sin previo aviso. Sin embargo, 717 Store no se compromete a actualizar los materiales.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">6. Enlaces</h2>
            <p>717 Store no ha revisado todos los sitios vinculados a su sitio web y no es responsable del contenido de ningún sitio vinculado. La inclusión de cualquier enlace no implica la aprobación por parte de 717 Store del sitio. El uso de cualquier sitio web vinculado es bajo el propio riesgo del usuario.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">7. Modificaciones de los Términos de Uso del Sitio</h2>
            <p>717 Store puede revisar estos términos de uso de su sitio web en cualquier momento sin previo aviso. Al usar este sitio web, usted acepta estar sujeto a la versión actual de estos Términos y Condiciones de Uso.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">8. Ley Aplicable</h2>
            <p>Cualquier reclamo relacionado con el sitio web de 717 Store se regirá por las leyes del país de 717 Store sin tener en cuenta sus disposiciones sobre conflicto de leyes.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
