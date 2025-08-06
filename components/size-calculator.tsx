'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { calculateRecommendedSize } from '@/lib/size-calculator'

export function SizeCalculator() {
  const [chest, setChest] = useState('')
  const [waist, setWaist] = useState('')
  const [hips, setHips] = useState('')
  const [productType, setProductType] = useState('camiseta')
  const [recommendedSize, setRecommendedSize] = useState('')

  const handleCalculate = () => {
    const size = calculateRecommendedSize(
      parseFloat(chest),
      parseFloat(waist),
      parseFloat(hips),
      productType
    )
    setRecommendedSize(size || 'No se pudo determinar la talla. Por favor, revisa tus medidas.')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Encuentra tu Talla Ideal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="productType">Tipo de Producto</Label>
            <Select value={productType} onValueChange={setProductType}>
              <SelectTrigger id="productType">
                <SelectValue placeholder="Selecciona un tipo de producto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="camiseta">Camiseta</SelectItem>
                <SelectItem value="pantalon">Pantalón</SelectItem>
                <SelectItem value="sudadera">Sudadera</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="chest">Contorno de Pecho (cm)</Label>
            <Input
              id="chest"
              type="number"
              value={chest}
              onChange={(e) => setChest(e.target.value)}
              placeholder="Ej: 98"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="waist">Contorno de Cintura (cm)</Label>
            <Input
              id="waist"
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              placeholder="Ej: 82"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hips">Contorno de Caderas (cm)</Label>
            <Input
              id="hips"
              type="number"
              value={hips}
              onChange={(e) => setHips(e.target.value)}
              placeholder="Ej: 96"
            />
          </div>
        </div>
        <Button onClick={handleCalculate} className="w-full">
          Calcular Talla Recomendada
        </Button>
        {recommendedSize && (
          <div className="mt-4 p-4 bg-muted rounded-md text-center">
            <p className="text-lg font-semibold">Tu talla recomendada es: <span className="text-primary">{recommendedSize}</span></p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
