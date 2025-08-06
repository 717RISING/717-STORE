import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { SizeCalculator } from '@/components/size-calculator'

export default function SizeGuidePage() {
  const sizeGuides = [
    {
      productType: 'Camisetas',
      measurements: [
        { size: 'S', chest: '90-95 cm', waist: '75-80 cm', hips: '90-95 cm' },
        { size: 'M', chest: '96-101 cm', waist: '81-86 cm', hips: '96-101 cm' },
        { size: 'L', chest: '102-107 cm', waist: '87-92 cm', hips: '102-107 cm' },
        { size: 'XL', chest: '108-113 cm', waist: '93-98 cm', hips: '108-113 cm' },
      ],
    },
    {
      productType: 'Pantalones',
      measurements: [
        { size: '28', waist: '71 cm', hips: '89 cm', length: '100 cm' },
        { size: '30', waist: '76 cm', hips: '94 cm', length: '102 cm' },
        { size: '32', waist: '81 cm', hips: '99 cm', length: '104 cm' },
        { size: '34', waist: '86 cm', hips: '104 cm', length: '106 cm' },
      ],
    },
    {
      productType: 'Sudaderas',
      measurements: [
        { size: 'S', chest: '95-100 cm', length: '65 cm' },
        { size: 'M', chest: '101-106 cm', length: '68 cm' },
        { size: 'L', chest: '107-112 cm', length: '71 cm' },
        { size: 'XL', chest: '113-118 cm', length: '74 cm' },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-center mb-8 md:mb-12">Guía de Tallas</h1>

      <div className="space-y-12">
        {sizeGuides.map((guide, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Tallas de {guide.productType}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Talla</TableHead>
                    {guide.measurements[0].chest && <TableHead>Pecho</TableHead>}
                    {guide.measurements[0].waist && <TableHead>Cintura</TableHead>}
                    {guide.measurements[0].hips && <TableHead>Caderas</TableHead>}
                    {guide.measurements[0].length && <TableHead>Largo</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guide.measurements.map((measurement, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{measurement.size}</TableCell>
                      {measurement.chest && <TableCell>{measurement.chest}</TableCell>}
                      {measurement.waist && <TableCell>{measurement.waist}</TableCell>}
                      {measurement.hips && <TableCell>{measurement.hips}</TableCell>}
                      {measurement.length && <TableCell>{measurement.length}</TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <CardTitle>Calculadora de Tallas</CardTitle>
          </CardHeader>
          <CardContent>
            <SizeCalculator />
          </CardContent>
        </Card>

        <div className="text-center text-muted-foreground">
          <p>
            Si tienes dudas sobre tu talla, no dudes en contactarnos.
            ¡Estamos aquí para ayudarte a encontrar el ajuste perfecto!
          </p>
        </div>
      </div>
    </div>
  )
}
