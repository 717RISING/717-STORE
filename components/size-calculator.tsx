"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { calculateRecommendedSize } from "@/lib/size-calculator"

interface UserMeasurements {
  height: number
  weight: number
  chest: number
  waist: number
  hips: number
  productType: string
  fitPreference: string
}

export default function SizeCalculator() {
  const [measurements, setMeasurements] = useState<UserMeasurements>({
    height: 0,
    weight: 0,
    chest: 0,
    waist: 0,
    hips: 0,
    productType: "camiseta",
    fitPreference: "regular",
  })

  const [result, setResult] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: keyof UserMeasurements, value: string | number) => {
    setMeasurements((prev) => ({
      ...prev,
      [field]: typeof value === "string" ? value : Number(value),
    }))
  }

  const handleCalculate = () => {
    setIsCalculating(true)

    // Simular cálculo
    setTimeout(() => {
      const recommendation = calculateRecommendedSize(measurements)
      setResult(recommendation)
      setIsCalculating(false)
    }, 1000)
  }

  const isFormValid =
    measurements.height > 0 && measurements.weight > 0 && measurements.chest > 0 && measurements.waist > 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Datos Básicos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Datos Básicos</h3>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Altura (cm)</label>
            <input
              type="number"
              placeholder="170"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#5D1A1D]"
              onChange={(e) => handleInputChange("height", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Peso (kg)</label>
            <input
              type="number"
              placeholder="70"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#5D1A1D]"
              onChange={(e) => handleInputChange("weight", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Producto</label>
            <select
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#5D1A1D]"
              onChange={(e) => handleInputChange("productType", e.target.value)}
            >
              <option value="camiseta">Camiseta / T-Shirt</option>
              <option value="hoodie">Hoodie / Sudadera</option>
              <option value="pantalon">Pantalón / Jeans</option>
              <option value="gorra">Gorra</option>
            </select>
          </div>
        </div>

        {/* Medidas Específicas */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Medidas Específicas</h3>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Pecho/Busto (cm)</label>
            <input
              type="number"
              placeholder="96"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#5D1A1D]"
              onChange={(e) => handleInputChange("chest", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Cintura (cm)</label>
            <input
              type="number"
              placeholder="81"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#5D1A1D]"
              onChange={(e) => handleInputChange("waist", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Cadera (cm) - Opcional</label>
            <input
              type="number"
              placeholder="96"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#5D1A1D]"
              onChange={(e) => handleInputChange("hips", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Preferencia de Ajuste</label>
            <select
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#5D1A1D]"
              onChange={(e) => handleInputChange("fitPreference", e.target.value)}
            >
              <option value="ajustado">Ajustado</option>
              <option value="regular">Regular</option>
              <option value="holgado">Holgado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Botón de Cálculo */}
      <div className="text-center">
        <Button
          onClick={handleCalculate}
          disabled={!isFormValid || isCalculating}
          className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22] px-8 py-3"
        >
          {isCalculating ? "Calculando..." : "Calcular Mi Talla"}
        </Button>
      </div>

      {/* Resultado */}
      {result && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">Tu Talla Recomendada</h3>
              <Badge className="bg-[#5D1A1D] text-white text-2xl px-6 py-2">{result.recommendedSize}</Badge>
            </div>

            <div className="space-y-4 text-gray-300">
              <div>
                <h4 className="font-semibold text-white mb-2">¿Por qué esta talla?</h4>
                <p>{result.explanation}</p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Consejos adicionales:</h4>
                <ul className="space-y-1">
                  {result.tips.map((tip: string, index: number) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>

              {result.alternativeSize && (
                <div>
                  <h4 className="font-semibold text-white mb-2">Talla alternativa:</h4>
                  <p>
                    También podrías considerar la talla <strong>{result.alternativeSize}</strong>{" "}
                    {result.alternativeReason}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
