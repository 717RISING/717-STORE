'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { calculateSize } from '@/lib/size-calculator'
import { Card, CardContent } from '@/components/ui/card'

export default function SizeCalculator() {
  const [chest, setChest] = useState<number | ''>('')
  const [waist, setWaist] = useState<number | ''>('')
  const [hip, setHip] = useState<number | ''>('')
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (chest && waist && hip) {
      const size = calculateSize(chest as number, waist as number, hip as number)
      setRecommendedSize(size)
    } else {
      setRecommendedSize('Por favor, introduce todas tus medidas.')
    }
  }

  return (
    <Card className="p-6 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="chest" className="text-gray-700 dark:text-gray-300">Pecho (cm)</Label>
            <Input
              id="chest"
              type="number"
              value={chest}
              onChange={(e) => setChest(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Ej: 90"
              className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="waist" className="text-gray-700 dark:text-gray-300">Cintura (cm)</Label>
            <Input
              id="waist"
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Ej: 75"
              className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="hip" className="text-gray-700 dark:text-gray-300">Cadera (cm)</Label>
            <Input
              id="hip"
              type="number"
              value={hip}
              onChange={(e) => setHip(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Ej: 95"
              className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
          <div className="md:col-span-3 flex justify-center">
            <Button type="submit" className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
              Calcular Talla
            </Button>
          </div>
        </form>
        {recommendedSize && (
          <div className="mt-4 text-center text-lg font-semibold text-gray-900 dark:text-white">
            Tu talla recomendada es: <span className="text-[#4A1518] dark:text-[#FFD700]">{recommendedSize}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
