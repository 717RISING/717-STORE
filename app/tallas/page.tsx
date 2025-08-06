import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SizeCalculator from "@/components/size-calculator"

export default function SizeGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Guía de Tallas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Medidas Generales (cm)</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Talla</TableHead>
                  <TableHead>Pecho</TableHead>
                  <TableHead>Cintura</TableHead>
                  <TableHead>Cadera</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">XS</TableCell>
                  <TableCell>80-85</TableCell>
                  <TableCell>65-70</TableCell>
                  <TableCell>85-90</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">S</TableCell>
                  <TableCell>86-91</TableCell>
                  <TableCell>71-76</TableCell>
                  <TableCell>91-96</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">M</TableCell>
                  <TableCell>92-97</TableCell>
                  <TableCell>77-82</TableCell>
                  <TableCell>97-102</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">L</TableCell>
                  <TableCell>98-103</TableCell>
                  <TableCell>83-88</TableCell>
                  <TableCell>103-108</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">XL</TableCell>
                  <TableCell>104-109</TableCell>
                  <TableCell>89-94</TableCell>
                  <TableCell>109-114</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Cómo Medirte</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>**Pecho:** Mide alrededor de la parte más ancha de tu pecho, justo debajo de las axilas.</li>
              <li>**Cintura:** Mide alrededor de la parte más estrecha de tu cintura natural.</li>
              <li>**Cadera:** Mide alrededor de la parte más ancha de tus caderas, manteniendo la cinta horizontal.</li>
            </ul>
            <p className="mt-4">Si tus medidas están entre dos tallas, te recomendamos elegir la talla más grande para un ajuste más holgado o la más pequeña para un ajuste más ceñido.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Calculadora de Tallas</h2>
            <p className="mb-4">Introduce tus medidas para encontrar tu talla recomendada:</p>
            <SizeCalculator />
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
