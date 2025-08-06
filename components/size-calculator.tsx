'use client'

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { calculateSize } from "@/lib/size-calculator"

export function SizeCalculator() {
  const [unit, setUnit] = useState<"cm" | "in">("cm")
  const [chest, setChest] = useState("")
  const [waist, setWaist] = useState("")
  const [hip, setHip] = useState("")
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const size = calculateSize(
      parseFloat(chest),
      parseFloat(waist),
      parseFloat(hip),
      unit
    )
    setRecommendedSize(size)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="unit">Unidad de Medida</Label>
        <Select value={unit} onValueChange={(value: "cm" | "in") => setUnit(value)}>
          <SelectTrigger id="unit">
            <SelectValue placeholder="Selecciona unidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cm">Centímetros (cm)</SelectItem>
            <SelectItem value="in">Pulgadas (in)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="chest">Contorno de Pecho ({unit})</Label>
        <Input
          id="chest"
          type="number"
          value={chest}
          onChange={(e) => setChest(e.target.value)}
          placeholder="Ej: 95"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="waist">Contorno de Cintura ({unit})</Label>
        <Input
          id="waist"
          type="number"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
          placeholder="Ej: 78"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="hip">Contorno de Cadera ({unit})</Label>
        <Input
          id="hip"
          type="number"
          value={hip}
          onChange={(e) => setHip(e.target.value)}
          placeholder="Ej: 100"
          required
        />
      </div>
      <Button type="submit" className="w-full">Calcular Talla</Button>
      {recommendedSize && (
        <div className="mt-4 text-center text-lg font-semibold">
          Tu talla recomendada es: <span className="text-primary">{recommendedSize}</span>
        </div>
      )}
    </form>
  )
}
