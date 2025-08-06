import { SizeCalculator } from "@/components/size-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SizeGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Guía de Tallas</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cómo Medirte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Para asegurarte de elegir la talla correcta, te recomendamos que te midas y compares tus medidas
              con nuestra tabla de tallas.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Pecho:</strong> Mide alrededor de la parte más ancha de tu pecho, justo debajo de las axilas.
              </li>
              <li>
                <strong>Cintura:</strong> Mide alrededor de la parte más estrecha de tu cintura, generalmente
                justo por encima del ombligo.
              </li>
              <li>
                <strong>Cadera:</strong> Mide alrededor de la parte más ancha de tus caderas, manteniendo la cinta
                horizontal.
              </li>
              <li>
                <strong>Largo de Manga:</strong> Mide desde el centro de la parte posterior de tu cuello,
                a lo largo del hombro y hasta la muñeca.
              </li>
              <li>
                <strong>Entrepierna:</strong> Mide desde la parte superior de tu muslo interior hasta el tobillo.
              </li>
            </ul>
            <p>
              Si tus medidas están entre dos tallas, te recomendamos elegir la talla más grande para un ajuste
              más cómodo, o la más pequeña para un ajuste más ceñido.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calculadora de Tallas</CardTitle>
          </CardHeader>
          <CardContent>
            <SizeCalculator />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tabla de Tallas General</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="py-2 px-4 border-b">Talla</th>
                  <th className="py-2 px-4 border-b">Pecho (cm)</th>
                  <th className="py-2 px-4 border-b">Cintura (cm)</th>
                  <th className="py-2 px-4 border-b">Cadera (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4">XS</td>
                  <td className="py-2 px-4">80-85</td>
                  <td className="py-2 px-4">65-70</td>
                  <td className="py-2 px-4">85-90</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">S</td>
                  <td className="py-2 px-4">86-91</td>
                  <td className="py-2 px-4">71-76</td>
                  <td className="py-2 px-4">91-96</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">M</td>
                  <td className="py-2 px-4">92-97</td>
                  <td className="py-2 px-4">77-82</td>
                  <td className="py-2 px-4">97-102</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">L</td>
                  <td className="py-2 px-4">98-103</td>
                  <td className="py-2 px-4">83-88</td>
                  <td className="py-2 px-4">103-108</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">XL</td>
                  <td className="py-2 px-4">104-109</td>
                  <td className="py-2 px-4">89-94</td>
                  <td className="py-2 px-4">109-114</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
