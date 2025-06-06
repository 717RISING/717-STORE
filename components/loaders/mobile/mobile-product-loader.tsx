"use client"

import { useState, useEffect } from "react"
import { Shirt, Sparkles } from "lucide-react"

interface MobileProductLoaderProps {
  size?: "sm" | "md" | "lg"
  message?: string
  pullToRefresh?: boolean
}

export default function MobileProductLoader({
  size = "md",
  message = "Cargando productos...",
  pullToRefresh = false,
}: MobileProductLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [pullProgress, setPullProgress] = useState(0)

  const steps = ["Explorando...", "Seleccionando...", "Preparando...", "¡Listo!"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 1200)
    return () => clearInterval(interval)
  }, [steps.length])

  useEffect(() => {
    if (pullToRefresh) {
      const pullInterval = setInterval(() => {
        setPullProgress((prev) => (prev >= 100 ? 0 : prev + 5))
      }, 50)
      return () => clearInterval(pullInterval)
    }
  }, [pullToRefresh])

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 touch-manipulation">
      {/* Pull to Refresh Indicator */}
      {pullToRefresh && (
        <div className="w-full max-w-xs">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-[#4A1518] to-[#6B1E22] rounded-full transition-all duration-100"
              style={{ width: `${pullProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Simplified Mobile Hanger */}
      <div className="relative">
        <div className={`${sizeClasses[size]} relative`}>
          {/* Main Container */}
          <div className="w-full h-full bg-gradient-to-br from-[#4A1518] to-[#6B1E22] rounded-2xl flex items-center justify-center shadow-lg">
            <Shirt className="w-8 h-8 text-white animate-pulse" />
          </div>

          {/* Floating Sparkles - Reduced for mobile */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute w-3 h-3 text-white opacity-60 animate-bounce"
                style={{
                  left: `${15 + i * 35}%`,
                  top: `${20 + (i % 2) * 60}%`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>

          {/* Mobile-optimized pulse ring */}
          <div className="absolute inset-0 border-2 border-[#4A1518] rounded-2xl animate-ping opacity-30" />
        </div>
      </div>

      {/* Mobile-friendly Text */}
      <div className="text-center max-w-xs">
        <p className="text-white font-medium text-lg mb-2">{steps[currentStep]}</p>
        <p className="text-gray-400 text-sm">{message}</p>

        {/* Large touch-friendly dots */}
        <div className="flex space-x-3 mt-4 justify-center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-[#4A1518] rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>

      {/* Mobile gesture hint */}
      <div className="text-center mt-4">
        <p className="text-gray-500 text-xs">Desliza hacia abajo para actualizar</p>
      </div>
    </div>
  )
}
