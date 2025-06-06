"use client"

import { useState, useEffect } from "react"

interface ProductLoaderProps {
  size?: "sm" | "md" | "lg"
  message?: string
}

export default function ProductLoader({ size = "md", message = "Cargando productos..." }: ProductLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = ["Explorando tendencias...", "Seleccionando estilos...", "Preparando colección...", message]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [steps.length])

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      {/* Animated Hanger */}
      <div className="relative">
        <div className={`${sizeClasses[size]} relative`}>
          {/* Hanger Hook */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-[#4A1518] rounded-t-full animate-swing" />

          {/* Hanger Bar */}
          <div
            className="absolute top-3 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-[#4A1518] rounded-full animate-swing"
            style={{ animationDelay: "0.2s" }}
          />

          {/* Clothing Items */}
          <div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 space-x-1 flex animate-swing"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="w-3 h-6 bg-gradient-to-b from-[#4A1518] to-[#6B1E22] rounded-modern animate-pulse" />
            <div
              className="w-3 h-6 bg-gradient-to-b from-gray-600 to-gray-800 rounded-modern animate-pulse"
              style={{ animationDelay: "0.3s" }}
            />
            <div
              className="w-3 h-6 bg-gradient-to-b from-[#4A1518] to-[#6B1E22] rounded-modern animate-pulse"
              style={{ animationDelay: "0.6s" }}
            />
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#4A1518] rounded-full animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <p className="text-white font-medium animate-fade-in-out">{steps[currentStep]}</p>
        <div className="flex space-x-1 mt-2 justify-center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#4A1518] rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
