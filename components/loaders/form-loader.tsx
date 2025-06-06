"use client"

import { useState, useEffect } from "react"
import { Send, CheckCircle, AlertCircle, Clock } from "lucide-react"

interface FormLoaderProps {
  size?: "sm" | "md" | "lg"
  type?: "sending" | "validating" | "success" | "error"
  message?: string
}

export default function FormLoader({
  size = "md",
  type = "sending",
  message = "Enviando formulario...",
}: FormLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [pulseIntensity, setPulseIntensity] = useState(1)

  const configs = {
    sending: { icon: Send, color: "from-[#4A1518] to-[#6B1E22]", message: message },
    validating: { icon: Clock, color: "from-yellow-500 to-orange-500", message: "Validando datos..." },
    success: { icon: CheckCircle, color: "from-green-500 to-green-600", message: "¡Enviado correctamente!" },
    error: { icon: AlertCircle, color: "from-red-500 to-red-600", message: "Error al enviar" },
  }

  const config = configs[type]
  const IconComponent = config.icon

  useEffect(() => {
    if (type === "sending" || type === "validating") {
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 2))
      }, 100)

      const pulseInterval = setInterval(() => {
        setPulseIntensity((prev) => (prev === 1 ? 1.2 : 1))
      }, 800)

      return () => {
        clearInterval(progressInterval)
        clearInterval(pulseInterval)
      }
    }
  }, [type])

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      {/* Main Icon Container */}
      <div className="relative">
        <div className={`${sizeClasses[size]} relative`}>
          {/* Background Circle */}
          <div
            className={`w-full h-full bg-gradient-to-br ${config.color} rounded-full flex items-center justify-center transition-transform duration-300`}
            style={{ transform: `scale(${pulseIntensity})` }}
          >
            <IconComponent className="w-6 h-6 text-white animate-bounce" />
          </div>

          {/* Progress Ring */}
          {(type === "sending" || type === "validating") && (
            <svg className={`absolute inset-0 ${sizeClasses[size]} transform -rotate-90`}>
              <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 45} ${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-300 ease-out"
              />
            </svg>
          )}

          {/* Success/Error Pulse */}
          {(type === "success" || type === "error") && (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${config.color} rounded-full animate-ping opacity-30`}
            />
          )}
        </div>

        {/* Floating Particles */}
        {type === "sending" && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-float"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Status Text */}
      <div className="text-center">
        <p className="text-white font-medium mb-2">{config.message}</p>

        {(type === "sending" || type === "validating") && (
          <>
            <div className="w-40 h-1 bg-gray-800 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full bg-gradient-to-r ${config.color} rounded-full transition-all duration-300 ease-out`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-gray-400 text-sm">{progress}% completado</p>
          </>
        )}

        {type === "success" && (
          <div className="flex items-center justify-center space-x-2 text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Operación exitosa</span>
          </div>
        )}

        {type === "error" && (
          <div className="flex items-center justify-center space-x-2 text-red-400">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Intenta nuevamente</span>
          </div>
        )}
      </div>
    </div>
  )
}
