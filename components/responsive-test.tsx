"use client"

import { useState, useEffect } from "react"
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gauge, Smartphone, Tablet, Monitor } from "lucide-react"

interface ResponsiveInfo {
  breakpoint: string
  width: number
  height: number
  orientation: "portrait" | "landscape"
  deviceType: "mobile" | "tablet" | "desktop"
  pixelRatio: number
}

export default function ResponsiveTest() {
  const isMobile = useMobileDetection()
  const [info, setInfo] = useState<ResponsiveInfo | null>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const updateInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      let breakpoint = "xs"
      let deviceType: "mobile" | "tablet" | "desktop" = "mobile"

      if (width >= 1440) {
        breakpoint = "xl"
        deviceType = "desktop"
      } else if (width >= 1024) {
        breakpoint = "lg"
        deviceType = "desktop"
      } else if (width >= 768) {
        breakpoint = "md"
        deviceType = "tablet"
      } else if (width >= 480) {
        breakpoint = "sm"
        deviceType = "mobile"
      }

      setInfo({
        breakpoint,
        width,
        height,
        orientation: height > width ? "portrait" : "landscape",
        deviceType,
        pixelRatio: window.devicePixelRatio,
      })
    }

    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    // Set initial dimensions
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", updateInfo)

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", updateInfo)
    }
  }, [])

  if (!info) return null

  const getDeviceIcon = () => {
    switch (info.deviceType) {
      case "mobile":
        return <Smartphone className="w-5 h-5 text-blue-400" />
      case "tablet":
        return <Tablet className="w-5 h-5 text-green-400" />
      case "desktop":
        return <Monitor className="w-5 h-5 text-purple-400" />
    }
  }

  const device = getDeviceIcon()

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="mx-auto max-w-md bg-gray-900 text-white shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            <Gauge className="mr-2 inline-block h-6 w-6 text-[#5D1A1D]" />
            Estado Responsivo - Current Breakpoint: {info.breakpoint.toUpperCase()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            {device}
            <p className="text-lg font-semibold">Tipo de Dispositivo: {info.deviceType}</p>
          </div>
          <p className="text-xl font-bold">
            Dimensiones: {width}px (ancho) x {height}px (alto)
          </p>
          <p className="text-gray-400">
            {isMobile ? "Estás en un dispositivo móvil." : "Estás en un dispositivo de escritorio/tableta."}
          </p>
          <p className="text-sm text-gray-500">Redimensiona la ventana de tu navegador para ver los cambios.</p>
        </CardContent>
      </Card>
    </div>
  )
}
