"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import { cn } from "@/lib/utils"

export default function DeviceTestingSuite() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)
  const [height, setHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 0)
  const { isMobile, isTablet, isDesktop } = useMobileDetection()

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleWidthChange = (value: number[]) => {
    if (typeof window !== "undefined") {
      // This will only work if the window is a popup or if the browser allows it
      try {
        window.resizeTo(value[0], window.innerHeight)
      } catch (e) {
        console.warn("Window.resizeTo is blocked by browser security policies.", e)
      }
      setWidth(value[0]) // Update state immediately for UI feedback
    }
  }

  const handleHeightChange = (value: number[]) => {
    if (typeof window !== "undefined") {
      try {
        window.resizeTo(window.innerWidth, value[0])
      } catch (e) {
        console.warn("Window.resizeTo is blocked by browser security policies.", e)
      }
      setHeight(value[0]) // Update state immediately for UI feedback
    }
  }

  const setPreset = (w: number, h: number) => {
    if (typeof window !== "undefined") {
      try {
        window.resizeTo(w, h)
      } catch (e) {
        console.warn("Window.resizeTo is blocked by browser security policies.", e)
      }
      setWidth(w)
      setHeight(h)
    }
  }

  const getDeviceType = () => {
    if (isMobile) return "Móvil"
    if (isTablet) return "Tableta"
    if (isDesktop) return "Escritorio"
    return "Desconocido"
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-2xl shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Suite de Pruebas de Dispositivos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-lg font-medium">
            <p>
              Ancho Actual: <span className="font-bold">{width}px</span>
            </p>
            <p>
              Alto Actual: <span className="font-bold">{height}px</span>
            </p>
            <p>
              Tipo de Dispositivo Detectado: <span className="font-bold">{getDeviceType()}</span>
            </p>
          </div>

          <div className="space-y-4">
            <Label htmlFor="width-slider" className="text-gray-700 dark:text-gray-300">Ajustar Ancho</Label>
            <Slider
              id="width-slider"
              min={320}
              max={1920}
              step={10}
              value={[width]}
              onValueChange={handleWidthChange}
              className="w-full"
            />
            <Label htmlFor="height-slider" className="text-gray-700 dark:text-gray-300">Ajustar Alto</Label>
            <Slider
              id="height-slider"
              min={480}
              max={1080}
              step={10}
              value={[height]}
              onValueChange={handleHeightChange}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => setPreset(375, 667)} className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white">
              iPhone 8 (375x667)
            </Button>
            <Button onClick={() => setPreset(414, 896)} className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white">
              iPhone XR (414x896)
            </Button>
            <Button onClick={() => setPreset(768, 1024)} className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white">
              iPad (768x1024)
            </Button>
            <Button onClick={() => setPreset(1024, 768)} className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white">
              iPad Horizontal (1024x768)
            </Button>
            <Button onClick={() => setPreset(1280, 800)} className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white">
              Laptop (1280x800)
            </Button>
            <Button onClick={() => setPreset(1920, 1080)} className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white">
              Full HD (1920x1080)
            </Button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Nota: La funcionalidad de redimensionamiento de la ventana puede ser limitada o comportarse de manera
            diferente en algunos entornos de navegador o si no se ejecuta en una ventana de navegador independiente.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
