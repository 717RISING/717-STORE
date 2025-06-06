"use client"

import { useState, useEffect } from "react"
import { CreditCard, Shield, CheckCircle } from "lucide-react"

interface CheckoutLoaderProps {
  size?: "sm" | "md" | "lg"
  step?: "processing" | "validating" | "confirming"
}

export default function CheckoutLoader({ size = "md", step = "processing" }: CheckoutLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [currentIcon, setCurrentIcon] = useState(0)

  const icons = [CreditCard, Shield, CheckCircle]
  const messages = {
    processing: "Procesando pago...",
    validating: "Validando información...",
    confirming: "Confirmando pedido...",
  }

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2))
    }, 100)

    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length)
    }, 1000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(iconInterval)
    }
  }, [icons.length])

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const IconComponent = icons[currentIcon]

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      {/* Animated Payment Flow */}
      <div className="relative">
        {/* Main Circle */}
        <div
          className={`${sizeClasses[size]} relative bg-gradient-to-br from-[#4A1518] to-[#6B1E22] rounded-full flex items-center justify-center animate-pulse-glow`}
        >
          <IconComponent className="w-6 h-6 text-white animate-bounce" />
        </div>

        {/* Progress Ring */}
        <svg className={`absolute inset-0 ${sizeClasses[size]} transform -rotate-90`}>
          <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(74, 21, 24, 0.3)" strokeWidth="2" />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="#4A1518"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 45} ${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="transition-all duration-300 ease-out"
          />
        </svg>

        {/* Floating Security Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[Shield, CreditCard, CheckCircle].map((Icon, i) => (
            <div
              key={i}
              className="absolute animate-orbit"
              style={{
                animationDelay: `${i * 0.8}s`,
                animationDuration: "3s",
              }}
            >
              <Icon className="w-4 h-4 text-[#4A1518] opacity-60" />
            </div>
          ))}
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center">
        <p className="text-white font-medium mb-2">{messages[step]}</p>
        <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#4A1518] to-[#6B1E22] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-gray-400 text-sm mt-2">{progress}% completado</p>
      </div>
    </div>
  )
}
