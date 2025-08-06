"use client"

import { useState, useEffect } from "react"
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function FormLoader() {
  const [progress, setProgress] = useState(0)
  const [pulseIntensity, setPulseIntensity] = useState(1)

  const configs = {
    sending: { icon: Send, color: "from-[#4A1518] to-[#6B1E22]", message: "Enviando datos..." },
    validating: { icon: Loader2, color: "from-yellow-500 to-orange-500", message: "Validando datos..." },
    success: { icon: CheckCircle, color: "from-green-500 to-green-600", message: "¡Enviado correctamente!" },
    error: { icon: AlertCircle, color: "from-red-500 to-red-600", message: "Error al enviar" },
  }

  const type = "sending"
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

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-gray-950 p-4">
      <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700 p-6">
        <CardHeader className="pb-4">
          <Skeleton className="h-8 w-1/2 bg-gray-200 dark:bg-gray-700" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700 mt-6" />
        </CardContent>
      </Card>
    </div>
  )
}

export default FormLoader
