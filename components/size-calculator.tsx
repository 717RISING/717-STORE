"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { calculateSize } from '@/lib/size-calculator' // Assuming this utility exists
import { Ruler } from 'lucide-react'

export function SizeCalculator() {
  const [gender, setGender] = useState<'male' | 'female' | ''>('')
  const [itemType, setItemType] = useState<'tshirt' | 'pants' | 'jacket' | ''>('')
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    inseam: '',
  })
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null)

  const handleMeasurementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setMeasurements(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { chest, waist, hips, inseam } = measurements
    const size = calculateSize(
      gender as 'male' | 'female',
      itemType as 'tshirt' | 'pants' | 'jacket',
      {
        chest: parseFloat(chest),
        waist: parseFloat(waist),
        hips: parseFloat(hips),
        inseam: parseFloat(inseam),
      }
    )
    setRecommendedSize(size)
  }

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Calculadora de Tallas</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Género</Label>
              <Select value={gender} onValueChange={(value: 'male' | 'female') => setGender(value)} required>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Selecciona tu género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Femenino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="itemType">Tipo de Prenda</Label>
              <Select value={itemType} onValueChange={(value: 'tshirt' | 'pants' | 'jacket') => setItemType(value)} required>
                <SelectTrigger id="itemType">
                  <SelectValue placeholder="Selecciona tipo de prenda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tshirt">Camiseta</SelectItem>
                  <SelectItem value="pants">Pantalón</SelectItem>
                  <SelectItem value="jacket">Chaqueta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chest">Contorno de Pecho (cm)</Label>
              <Input id="chest" type="number" value={measurements.chest} onChange={handleMeasurementChange} placeholder="Ej: 95" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waist">Contorno de Cintura (cm)</Label>
              <Input id="waist" type="number" value={measurements.waist} onChange={handleMeasurementChange} placeholder="Ej: 80" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hips">Contorno de Cadera (cm)</Label>
              <Input id="hips" type="number" value={measurements.hips} onChange={handleMeasurementChange} placeholder="Ej: 100" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inseam">Largo de Entrepierna (cm)</Label>
              <Input id="inseam" type="number" value={measurements.inseam} onChange={handleMeasurementChange} placeholder="Ej: 75" required />
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Ruler className="mr-2 h-4 w-4" /> Calcular Talla
          </Button>
        </form>

        {recommendedSize && (
          <div className="mt-8 text-center p-4 bg-muted rounded-md">
            <h3 className="text-xl font-semibold">Tu Talla Recomendada es:</h3>
            <p className="text-4xl font-bold text-primary mt-2">{recommendedSize}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Esta es una recomendación basada en tus medidas. Consulta siempre la tabla de tallas específica del producto para mayor precisión.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
