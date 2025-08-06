"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, CreditCard, Truck, CheckCircle } from 'lucide-react'

interface CheckoutLoaderProps {
  message?: string
}

export function CheckoutLoader({ message = "Preparando tu pedido..." }: CheckoutLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = ["Verificando carrito...", "Procesando envío...", "Confirmando pago...", "¡Pedido completado!"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [steps.length])

  const getIcon = (step: number) => {
    switch (step) {
      case 0:
        return <ShoppingCart className="w-12 h-12 text-white animate-pulse" />
      case 1:
        return <Truck className="w-12 h-12 text-white animate-pulse" />
      case 2:
        return <CreditCard className="w-12 h-12 text-white animate-pulse" />
      case 3:
        return <CheckCircle className="w-12 h-12 text-white animate-bounce" />
      default:
        return <ShoppingCart className="w-12 h-12 text-white animate-pulse" />
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-[#4A1518] to-[#6B1E22] rounded-full flex items-center justify-center shadow-lg">
          {getIcon(currentStep)}
        </div>
        <div className="absolute inset-0 border-4 border-[#4A1518] rounded-full animate-ping opacity-40" />
      </div>

      <div className="text-center max-w-md">
        <p className="text-2xl font-semibold mb-2">{steps[currentStep]}</p>
        <p className="text-gray-400 text-base">{message}</p>
      </div>

      <div className="flex space-x-3 mt-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full ${
              i === currentStep ? "bg-[#6B1E22]" : "bg-gray-700"
            } transition-colors duration-300`}
          />
        ))}
      </div>
    </div>
  )
}
