"use client"

import { useState, useEffect } from "react"
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FormLoaderProps {
  message?: string
}

export default function FormLoader({ message = "Enviando datos..." }: FormLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [pulseIntensity, setPulseIntensity] = useState(1)

  const configs = {
    sending: { icon: Send, color: "from-[#4A1518] to-[#6B1E22]", message: message },
    validating: { icon: Loader2, color: "from-yellow-500 to-orange-500", message: "Validando datos..." },
    success: { icon: CheckCircle, color: "from-green-500 to-green-600", message: "¡Enviado correctamente!" },
    error: { icon: AlertCircle, color: "from-red-500 to-red-600", message: "Error al enviar" },
  }

  const type = "sending" // Default type for now, can be updated based on requirements
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

  const inputHeight = "h-10" // Default size for now, can be updated based on requirements
  const buttonHeight = "h-11" // Default size for now, can be updated based on requirements

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-gray-950 p-4">
      <Card className="w-full max-w-md shadow-lg bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          {type === "sending" || type === "validating" ? (
            <IconComponent className="mx-auto h-12 w-12 text-[#5D1A1D] animate-spin" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br rounded-full flex items-center justify-center transition-transform duration-300">
              <IconComponent className="w-6 h-6 text-white animate-bounce" />
            </div>
          )}
          <CardTitle className="text-2xl font-bold text-white">{message}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {type === "sending" || type === "validating" ? (
              <>
                <Skeleton className="h-10 w-full bg-gray-700" />
                <Skeleton className="h-10 w-full bg-gray-700" />
                <Skeleton className="h-24 w-full bg-gray-700" />
              </>
            ) : (
              <div className="relative">
                <div className="w-full h-full bg-gradient-to-br rounded-full flex items-center justify-center transition-transform duration-300">
                  <IconComponent className="w-6 h-6 text-white animate-bounce" />
                </div>
              </div>
            )}
          </div>
          {type === "sending" || type === "validating" ? (
            <Skeleton className={`${buttonHeight} w-full bg-gray-700`} />
          ) : (
            <div className="w-40 h-1 bg-gray-800 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full bg-gradient-to-r ${config.color} rounded-full transition-all duration-300 ease-out`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          <div className="flex justify-between">
            {type === "sending" || type === "validating" ? (
              <>
                <Skeleton className="h-4 w-1/3 bg-gray-700" />
                <Skeleton className="h-4 w-1/4 bg-gray-700" />
              </>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Operación exitosa</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
