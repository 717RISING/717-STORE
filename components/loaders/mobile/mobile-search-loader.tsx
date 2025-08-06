"use client"

import { useState, useEffect } from "react"
import { Search, Package, Shirt, Sparkles } from 'lucide-react'

interface MobileSearchLoaderProps {
  message?: string
}

export default function MobileSearchLoader({ message = "Buscando resultados..." }: MobileSearchLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = ["Analizando consulta...", "Filtrando productos...", "Organizando resultados...", "¡Listo!"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [steps.length])

  const getIcon = (step: number) => {
    switch (step) {
      case 0:
        return <Search className="w-8 h-8 text-white animate-pulse" />
      case 1:
        return <Package className="w-8 h-8 text-white animate-pulse" />
      case 2:
        return <Shirt className="w-8 h-8 text-white animate-pulse" />
      case 3:
        return <Sparkles className="w-8 h-8 text-white animate-bounce" />
      default:
        return <Search className="w-8 h-8 text-white animate-pulse" />
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-[#4A1518] to-[#6B1E22] rounded-full flex items-center justify-center shadow-lg">
          {getIcon(currentStep)}
        </div>
        <div className="absolute inset-0 border-4 border-[#4A1518] rounded-full animate-ping opacity-40" />
      </div>

      <div className="text-center max-w-xs">
        <p className="text-xl font-semibold mb-2">{steps[currentStep]}</p>
        <p className="text-gray-400 text-sm">{message}</p>
      </div>

      <div className="flex space-x-2 mt-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === currentStep ? "bg-[#6B1E22]" : "bg-gray-700"
            } transition-colors duration-300`}
          />
        ))}
      </div>
    </div>
  )
}
