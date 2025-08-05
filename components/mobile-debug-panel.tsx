"use client"

import { useState } from "react"
import { X, Bug, Info, Wifi, BatteryCharging, Cpu, MemoryStick } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useMobileDetection } from "@/hooks/use-mobile-detection"

export default function MobileDebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobileDetection()

  if (!isMobile) {
    return null // Only show on mobile devices
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-[1000] rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bug className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md bg-gray-900 text-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">
                <Bug className="mr-2 inline-block h-5 w-5" />
                Panel de Depuración Móvil
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5 text-gray-400 hover:text-white" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4 text-blue-400" />
                <p>
                  **Dispositivo:**{" "}
                  <span className="font-semibold">{navigator.userAgentData?.platform || navigator.platform}</span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Wifi className="h-4 w-4 text-green-400" />
                <p>
                  **Conexión:** <span className="font-semibold">{navigator.onLine ? "Online" : "Offline"}</span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <BatteryCharging className="h-4 w-4 text-yellow-400" />
                <p>
                  **Batería:**{" "}
                  <span className="font-semibold">
                    {/* @ts-ignore */}
                    {window.navigator.getBattery ? "Cargando..." : "No disponible"}
                  </span>
                </p>
              </div>
              <Separator className="bg-gray-700" />
              <div className="flex items-center space-x-2">
                <Cpu className="h-4 w-4 text-purple-400" />
                <p>
                  **CPU Cores:**{" "}
                  <span className="font-semibold">{navigator.hardwareConcurrency || "No disponible"}</span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <MemoryStick className="h-4 w-4 text-orange-400" />
                <p>
                  **Memoria:**{" "}
                  <span className="font-semibold">
                    {/* @ts-ignore */}
                    {navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "No disponible"}
                  </span>
                </p>
              </div>
              <Separator className="bg-gray-700" />
              <p className="text-gray-400">
                **Dimensiones de la Ventana:** {window.innerWidth}px x {window.innerHeight}px
              </p>
              <p className="text-gray-400">**Pixel Ratio:** {window.devicePixelRatio}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
