import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Términos y Condiciones</h1>

      <Card>
        <CardHeader>
          <CardTitle>Bienvenido a 717 Store</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de 717 Store,
            ubicado en [TuDominio.com].
          </p>
          <p>
            Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando
            717 Store si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.
          </p>

          <h3 className="font-semibold text-lg">Cookies</h3>
          <p>
            Empleamos el uso de cookies. Al acceder a 717 Store, aceptaste usar cookies de acuerdo con la
            Política de Privacidad de 717 Store.
          </p>
          <p>
            La mayoría de los sitios web interactivos utilizan cookies para permitirnos recuperar los detalles
            del usuario para cada visita. Las cookies son utilizadas por nuestro sitio web para habilitar la
            funcionalidad de ciertas áreas para facilitar la visita a nuestro sitio web. Algunos de nuestros
            socios afiliados/publicitarios también pueden usar cookies.
          </p>

          <h3 className="font-semibold text-lg">Licencia</h3>
          <p>
            A menos que se indique lo contrario, 717 Store y/o sus licenciantes poseen los derechos de propiedad
            intelectual de todo el material en 717 Store. Todos los derechos de propiedad intelectual están
            reservados. Puedes acceder a esto desde 717 Store para tu uso personal sujeto a las restricciones
            establecidas en estos términos y condiciones.
          </p>
          <p>No debes:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Republicar material de 717 Store.</li>
            <li>Vender, alquilar o sublicenciar material de 717 Store.</li>
            <li>Reproducir, duplicar o copiar material de 717 Store.</li>
            <li>Redistribuir contenido de 717 Store.</li>
          </ul>

          <h3 className="font-semibold text-lg">Contenido del Usuario</h3>
          <p>
            Partes de este sitio web ofrecen una oportunidad para que los usuarios publiquen e intercambien
            opiniones e información en ciertas áreas del sitio web. 717 Store no filtra, edita, publica o
            revisa los comentarios antes de su presencia en el sitio web. Los comentarios no reflejan los
            puntos de vista y opiniones de 717 Store, sus agentes y/o afiliados. Los comentarios reflejan
            los puntos de vista y opiniones de la persona que publica sus puntos de vista y opiniones.
            En la medida permitida por las leyes aplicables, 717 Store no será responsable de los comentarios
            ni de ninguna responsabilidad, daños o gastos causados ​​o sufridos como resultado de cualquier
            uso y/o publicación y/o aparición de los comentarios en este sitio web.
          </p>
          <p>
            717 Store se reserva el derecho de monitorear todos los comentarios y eliminar cualquier comentario
            que pueda considerarse inapropiado, ofensivo o que cause el incumplimiento de estos Términos y Condiciones.
          </p>

          <h3 className="font-semibold text-lg">Tu Privacidad</h3>
          <p>Por favor, lee nuestra Política de Privacidad.</p>

          <h3 className="font-semibold text-lg">Reserva de Derechos</h3>
          <p>
            Nos reservamos el derecho de solicitar que elimines todos los enlaces o cualquier enlace particular
            a nuestro sitio web. Apruebas eliminar inmediatamente todos los enlaces a nuestro sitio web si así
            se solicita. También nos reservamos el derecho de modificar estos términos y condiciones y su
            política de enlaces en cualquier momento. Al enlazar continuamente a nuestro sitio web, aceptas
            estar vinculado y seguir estos términos y condiciones de enlace.
          </p>

          <h3 className="font-semibold text-lg">Descargo de Responsabilidad</h3>
          <p>
            En la medida máxima permitida por la ley aplicable, excluimos todas las representaciones, garantías
            y condiciones relacionadas con nuestro sitio web y el uso de este sitio web. Nada en este descargo
            de responsabilidad:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Limitará o excluirá nuestra o tu responsabilidad por muerte o lesiones personales.</li>
            <li>Limitará o excluirá nuestra o tu responsabilidad por fraude o tergiversación fraudulenta.</li>
            <li>Limitará cualquiera de nuestras o tus responsabilidades de cualquier manera que no esté permitida
              por la ley aplicable.</li>
            <li>Excluirá cualquiera de nuestras o tus responsabilidades que no puedan ser excluidas bajo la
              ley aplicable.</li>
          </ul>
          <p>
            Las limitaciones y prohibiciones de responsabilidad establecidas en esta Sección y en otras partes
            de este descargo de responsabilidad: (a) están sujetas al párrafo anterior; y (b) rigen todas las
            responsabilidades que surjan bajo el descargo de responsabilidad, incluidas las responsabilidades
            que surjan en contrato, en agravio y por incumplimiento del deber legal.
          </p>
          <p>
            Mientras el sitio web y la información y los servicios en el sitio web se proporcionen de forma
            gratuita, no seremos responsables de ninguna pérdida o daño de ninguna naturaleza.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
