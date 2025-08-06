import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-center mb-8 md:mb-12">Términos y Condiciones</h1>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>1. Aceptación de los Términos</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              Al acceder y utilizar el sitio web de 717 Store (en adelante, "el Sitio"), usted acepta estar
              sujeto a estos Términos y Condiciones, a nuestra Política de Privacidad y a todas las leyes
              y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, le está
              prohibido usar o acceder a este sitio.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Uso del Sitio</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              El contenido de las páginas de este sitio web es para su información general y uso exclusivo.
              Está sujeto a cambios sin previo aviso. Ni nosotros ni terceros ofrecemos garantía alguna
              sobre la exactitud, puntualidad, rendimiento, integridad o idoneidad de la información y
              los materiales encontrados u ofrecidos en este sitio para un propósito particular. Usted
              reconoce que dicha información y materiales pueden contener inexactitudes o errores y
              excluimos expresamente la responsabilidad por tales inexactitudes o errores en la máxima
              medida permitida por la ley.
            </p>
            <p>
              Su uso de cualquier información o material en este sitio web es bajo su propio riesgo,
              para lo cual no seremos responsables. Será su propia responsabilidad asegurarse de que
              cualquier producto, servicio o información disponible a través de este sitio web cumpla
              con sus requisitos específicos.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Propiedad Intelectual</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              Este sitio web contiene material que es de nuestra propiedad o está licenciado para nosotros.
              Este material incluye, entre otros, el diseño, el diseño, el aspecto, la apariencia y los gráficos.
              La reproducción está prohibida salvo de conformidad con el aviso de derechos de autor, que forma
              parte de estos términos y condiciones.
            </p>
            <p>
              Todas las marcas comerciales reproducidas en este sitio web, que no son propiedad ni están
              licenciadas al operador, son reconocidas en el sitio web.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Enlaces a Otros Sitios Web</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              De vez en cuando, este sitio web también puede incluir enlaces a otros sitios web. Estos enlaces
              se proporcionan para su conveniencia para proporcionar más información. No significan que
              respaldamos los sitios web. No tenemos ninguna responsabilidad por el contenido de los sitios
              web vinculados.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Limitación de Responsabilidad</Card-Title>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              En la máxima medida permitida por la ley aplicable, 717 Store no será responsable de ningún
              daño directo, indirecto, incidental, especial, consecuente o ejemplar, incluidos, entre otros,
              daños por pérdida de beneficios, buena voluntad, uso, datos u otras pérdidas intangibles
              (incluso si 717 Store ha sido advertido de la posibilidad de tales daños), resultantes de:
              (i) el uso o la imposibilidad de usar el servicio; (ii) el costo de adquisición de bienes y
              servicios sustitutos resultantes de cualquier bien, dato, información o servicio comprado u
              obtenido o mensajes recibidos o transacciones realizadas a través o desde el servicio;
              (iii) acceso no autorizado o alteración de sus transmisiones o datos; (iv) declaraciones
              o conducta de cualquier tercero en el servicio; o (v) cualquier otro asunto relacionado
              con el servicio.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Modificaciones de los Términos</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              717 Store se reserva el derecho de revisar estos términos de servicio para su sitio web en
              cualquier momento sin previo aviso. Al usar este sitio web, usted acepta estar sujeto a la
              versión actual de estos términos de servicio.
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
