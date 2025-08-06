"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { calculateRecommendedSize } from "@/lib/size-calculator"
import { Card, CardContent } from "@/components/ui/card"

export default function SizeCalculator() {
  const [gender, setGender] = useState<"male" | "female" | "unisex">("unisex")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [chest, setChest] = useState("")
  const [waist, setWaist] = useState("")
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setRecommendedSize(null)

    const heightNum = Number.parseFloat(height)
    const weightNum = Number.parseFloat(weight)
    const chestNum = Number.parseFloat(chest)
    const waistNum = Number.parseFloat(waist)

    if (
      isNaN(heightNum) ||
      isNaN(weightNum) ||
      isNaN(chestNum) ||
      isNaN(waistNum) ||
      heightNum <= 0 ||
      weightNum <= 0 ||
      chestNum <= 0 ||
      waistNum <= 0
    ) {
      setError("Por favor, introduce valores numéricos válidos y positivos para todas las medidas.")
      return
    }

    const size = calculateRecommendedSize({
      gender,
      height: heightNum,
      weight: weightNum,
      chest: chestNum,
      waist: waistNum,
    })
    setRecommendedSize(size)
  }

  return (
    <Card className="bg-gray-800 border-gray-700 text-white p-6">
      <CardContent className="grid gap-6">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="gender" className="text-gray-300">
              Género
            </Label>
            <Select value={gender} onValueChange={(value: "male" | "female" | "unisex") => setGender(value)}>
              <SelectTrigger id="gender" className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Selecciona tu género" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Femenino</SelectItem>
                <SelectItem value="unisex">Unisex</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="height" className="text-gray-300">
                Altura (cm)
              </Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Ej: 175"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="weight" className="text-gray-300">
                Peso (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ej: 70"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="chest" className="text-gray-300">
                Contorno de Pecho (cm)
              </Label>
              <Input
                id="chest"
                type="number"
                value={chest}
                onChange={(e) => setChest(e.target.value)}
                placeholder="Ej: 98"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="waist" className="text-gray-300">
                Contorno de Cintura (cm)
              </Label>
              <Input
                id="waist"
                type="number"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder="Ej: 82"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full bg-[#5D1A1D] hover:bg-[#4a1518] text-white">
            Calcular Talla Recomendada
          </Button>
        </form>

        {recommendedSize && (
          <div className="mt-6 p-4 bg-gray-700 rounded-md text-center">
            <p className="text-lg font-semibold text-white">Tu talla recomendada es:</p>
            <p className="text-5xl font-bold text-[#5D1A1D] mt-2">{recommendedSize}</p>
            <p className="text-sm text-gray-300 mt-2">
              Esta es una recomendación basada en tus medidas. Para un ajuste más holgado, considera una talla más
              grande.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
