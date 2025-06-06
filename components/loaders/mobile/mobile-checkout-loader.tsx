"use client"

import { useState, useEffect } from "react"
import { CreditCard, Shield, CheckCircle, Smartphone } from "lucide-react"

interface MobileCheckoutLoaderProps {
  size?: "sm" | "md" | "lg"
  step?: "processing" | "validating" | "confirming"
  touchFeedback?: boolean
}

export default function MobileCheckoutLoader({
  size = "md",
  step = "processing",
  touchFeedback = true,
}: MobileCheckoutLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [currentIcon, setCurrentIcon] = useState(0)
  const [touchPulse, setTouchPulse] = useState(false)

  const icons = [CreditCard, Shield, CheckCircle]
  const messages = {
    processing: "Procesando pago...",
    validating: "Validando datos...",
    confirming: "Confirmando...",
  }

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 3))
    }, 80)

    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length)
    }, 1000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(iconInterval)
    }
  }, [icons.length])

  useEffect(() => {
    if (touchFeedback) {
      const pulseInterval = setInterval(() => {
        setTouchPulse(true)
        setTimeout(() => setTouchPulse(false), 200)
      }, 2000)
      return () => clearInterval(pulseInterval)
    }
  }, [touchFeedback])

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24",
  }

  const IconComponent = icons[currentIcon]

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 touch-manipulation">
      {/* Mobile Payment Interface */}
      <div className="relative">
        {/* Phone Frame */}
        <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl">
          <div className={`${sizeClasses[size]} relative`}>
            {/* Screen */}
            <div
              className={`w-full h-full bg-gradient-to-br from-[#4A1518] to-[#6B1E22] rounded-2xl flex items-center justify-center transition-transform duration-200 ${
                touchPulse ? "scale-95" : "scale-100"
              }`}
            >
              <IconComponent className="w-10 h-10 text-white" />
            </div>

            {/* Mobile Progress Ring - Thicker for visibility */}
            <svg className={`absolute inset-0 ${sizeClasses[size]} transform -rotate-90`}>
              <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="4" />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 45} ${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-300 ease-out"
              />
            </svg>
          </div>

          {/* Mobile Home Indicator */}
          <div className="w-20 h-1 bg-gray-600 rounded-full mx-auto mt-3" />
        </div>

        {/* Floating Security Badge */}
        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2 animate-bounce">
          <Shield className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Mobile Status */}
      <div className="text-center max-w-sm">
        <h3 className="text-white font-semibold text-xl mb-2">{messages[step]}</h3>

        {/* Large Progress Bar for Mobile */}
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#4A1518] to-[#6B1E22] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-gray-400 text-lg font-medium">{progress}%</p>

        {/* Touch Feedback Hint */}
        <div className="flex items-center justify-center space-x-2 mt-4">
          <Smartphone className="w-4 h-4 text-[#4A1518]" />
          <p className="text-gray-500 text-sm">Procesamiento seguro</p>
        </div>
      </div>
    </div>
  )
}
